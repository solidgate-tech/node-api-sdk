import {
  assertCount,
  assertTimeout,
  wrapResource,
  type IDEMPOTENCY_KEY,
  type IdempotentRequestOptions,
  type RedirectMethod,
  type RedirectResult,
  type RequestOptions,
  type WithResponseDetails,
} from './call';
import type { PARAMS, RESOURCES } from './generated/solidgate';
import type { ItemOf, PagePromise } from './pagination';
import { createTransport } from './transport';
import { SDK_VERSION } from './version';

export const SOLIDGATE_BASE_URL = 'https://api.solidgate.com/v2';

const NODE_VERSION = typeof process === 'undefined' ? undefined : process.version;

export const USER_AGENT = NODE_VERSION
  ? `solidgate-node-api-sdk/${SDK_VERSION} node/${NODE_VERSION}`
  : `solidgate-node-api-sdk/${SDK_VERSION}`;

export const SDK_HEADERS = { 'X-Solidgate-SDK-Lang': 'node', 'X-Solidgate-SDK-Version': SDK_VERSION } as const;

export interface AppInfo {
  name: string;
  version?: string;
  url?: string;
}

export interface SolidgateOptions {
  apiKey: string;
  baseUrl?: string;
  fetch?: typeof fetch;
  appInfo?: AppInfo;
  timeout?: number;
  maxRetries?: number;
  channelId?: string;
}

export const DEFAULT_TIMEOUT = 60_000;
export const DEFAULT_MAX_RETRIES = 2;

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- matches any generated method
type ApiMethod<Params = any, Result = unknown> = (params: Params, ...rest: any[]) => Promise<Result>;

type Resources = typeof RESOURCES;
type ResourceOf<Api> = {
  [Key in keyof Resources]: InstanceType<Resources[Key]> extends Api ? Key : never;
}[keyof Resources];

// From PARAMS, which names each parameter: a method takes idempotencyKey only where its operation
// declares the Idempotency-Key header (a parameter's type alone cannot tell one string header from
// another).
export type OptionsOf<Api, Name> = Name extends keyof (typeof PARAMS)[ResourceOf<Api>]
  ? (typeof PARAMS)[ResourceOf<Api>][Name] extends readonly (infer Entry)[]
    ? typeof IDEMPOTENCY_KEY extends Entry
      ? IdempotentRequestOptions
      : RequestOptions
    : RequestOptions
  : RequestOptions;

export type Resource<Api> = {
  [
    Name in keyof Api as Api[Name] extends ApiMethod
      ? Name extends `${string}Raw` | `${string}RequestOpts`
        ? never
        : Name
      : never
  ]: Api[Name] extends ApiMethod<infer Params, infer Result>
    ? Name extends RedirectMethod
      ? (params: Params, options?: OptionsOf<Api, Name>) => Promise<RedirectResult>
      : Name extends `list${string}` | `search${string}`
        ? (params: Params, options?: OptionsOf<Api, Name>) => PagePromise<WithResponseDetails<Result>, ItemOf<Result>>
        : (params: Params, options?: OptionsOf<Api, Name>) => Promise<WithResponseDetails<Result>>
    : never;
};

export interface Generated {
  Configuration: new (parameters: {
    basePath?: string;
    accessToken?: () => string;
    fetchApi?: typeof fetch;
    headers?: Record<string, string>;
  }) => unknown;
  resources: { readonly [name: string]: new (configuration: never) => object };
  params: { readonly [resource: string]: { readonly [method: string]: readonly string[] } };
}

export class SolidgateClient {
  readonly #options: SolidgateOptions;
  readonly #baseUrl: string;

  constructor(generated: Generated, options: SolidgateOptions) {
    assertValidOptions(options);
    this.#options = { ...options };
    this.#baseUrl = (options.baseUrl ?? SOLIDGATE_BASE_URL).replace(/\/+$/, '');

    // The key is passed as a function, not a string: every resource holds this configuration,
    // and a string would be printed by console.log(client) or JSON.stringify(client).
    const { apiKey } = options;
    const configuration = new generated.Configuration({
      basePath: this.#baseUrl,
      accessToken: () => apiKey,
      fetchApi: createTransport({
        fetch: options.fetch,
        timeout: options.timeout ?? DEFAULT_TIMEOUT,
        maxRetries: options.maxRetries ?? DEFAULT_MAX_RETRIES,
      }),
      headers: { 'User-Agent': userAgent(options.appInfo), ...SDK_HEADERS },
    });

    for (const [name, Api] of Object.entries(generated.resources)) {
      Object.defineProperty(this, name, {
        value: wrapResource(new Api(configuration as never), generated.params[name] ?? {}, {
          channelId: options.channelId,
        }),
        enumerable: true,
      });
    }
  }

  get baseUrl(): string {
    return this.#baseUrl;
  }

  withOptions(options: Omit<Partial<SolidgateOptions>, 'apiKey'>): this {
    if (options != null && 'apiKey' in options) {
      throw new TypeError('Solidgate: withOptions() cannot change apiKey: create a new Solidgate({ apiKey }).');
    }
    const Client = this.constructor as new (options: SolidgateOptions) => this;
    return new Client({ ...this.#options, ...options });
  }
}

function userAgent(appInfo: AppInfo | undefined): string {
  if (!appInfo) return USER_AGENT;
  const app = appInfo.version ? `${appInfo.name}/${appInfo.version}` : appInfo.name;
  return appInfo.url ? `${USER_AGENT} ${app} (${appInfo.url})` : `${USER_AGENT} ${app}`;
}

function assertValidOptions(options: SolidgateOptions): void {
  if (options == null || typeof options !== 'object') {
    throw new TypeError('Solidgate: options are required: new Solidgate({ apiKey }).');
  }
  // Presence only, never the format: a new key format must not need an SDK release.
  if (typeof options.apiKey !== 'string' || options.apiKey.trim() === '') {
    throw new TypeError('Solidgate: apiKey is required: pass the secret API key from the Solidgate Hub.');
  }
  assertTimeout(options.timeout);
  if (options.channelId !== undefined && (typeof options.channelId !== 'string' || options.channelId.trim() === '')) {
    throw new TypeError('Solidgate: channelId must be a non-empty string.');
  }
  assertCount('maxRetries', options.maxRetries);
  const { appInfo } = options;
  if (appInfo !== undefined && (typeof appInfo?.name !== 'string' || appInfo.name.trim() === '')) {
    throw new TypeError("Solidgate: appInfo.name is required: { name: 'my-plugin', version: '1.4.0' }.");
  }
  // Each part becomes one User-Agent token, which logs split on spaces and slashes.
  for (const part of ['name', 'version'] as const) {
    const value = appInfo?.[part];
    if (value !== undefined && !/^[A-Za-z0-9._-]+$/.test(value)) {
      throw new TypeError(`Solidgate: appInfo.${part} may contain only letters, digits, ".", "_" and "-".`);
    }
  }
  if (appInfo?.url !== undefined && !/^[\x21-\x7e]+$/.test(appInfo.url)) {
    throw new TypeError('Solidgate: appInfo.url must be a URL without spaces.');
  }
}
