import { SolidgateError } from './errors';

// As Stripe's autoPagingToArray: beyond this, iterate with for await instead of holding it all.
export const MAX_TO_ARRAY = 10_000;

export interface ListPage<Item> {
  items: Array<Item>;
  pagination?: { page_size?: number; next_page_token?: string };
}

export type ItemOf<Page> = Page extends { items: Array<infer Item> } ? Item : never;

export type PagePromise<Page, Item> = Promise<Page> &
  AsyncIterable<Item> & {
    pages(): AsyncIterableIterator<Page>;
    toArray(options: { limit: number }): Promise<Item[]>;
  };

export function isListMethod(name: string): boolean {
  return /^(list|search)[A-Z]/.test(name);
}

function isListPage(value: unknown): value is ListPage<unknown> {
  return value !== null && typeof value === 'object' && Array.isArray((value as ListPage<unknown>).items);
}

function nextParams(params: unknown, page: ListPage<unknown>): object | undefined {
  const token = page.pagination?.next_page_token;
  if (!token) return undefined;
  const body = (params ?? {}) as { pagination?: { page_size?: number } };
  return {
    ...body,
    // page_size is required with a token: the caller's, or the size the API used.
    pagination: { page_size: body.pagination?.page_size ?? page.pagination?.page_size, next_page_token: token },
  };
}

export function paginate<Page, Options>(
  call: (params: unknown, options?: Options) => Promise<Page>,
  params: unknown,
  options?: Options,
): PagePromise<Page, unknown> {
  const first = call(params, options);
  async function* pages(): AsyncIterableIterator<Page> {
    let request = params;
    let page = await first;
    // A token the API already returned would fetch the same pages again, forever.
    const seen = new Set<string>();
    for (;;) {
      yield page;
      const next = isListPage(page) ? nextParams(request, page) : undefined;
      if (next === undefined) return;
      const token = (next as { pagination: { next_page_token: string } }).pagination.next_page_token;
      if (seen.has(token)) {
        const requestId = (page as { responseDetails?: { requestId?: string } }).responseDetails?.requestId;
        throw new SolidgateError(`Solidgate: the API returned next_page_token ${token} again: stopped paginating.`, {
          requestId,
        });
      }
      seen.add(token);
      request = next;
      page = await call(next, options);
    }
  }
  async function* items(): AsyncIterableIterator<unknown> {
    for await (const page of pages()) if (isListPage(page)) yield* page.items;
  }
  async function toArray({ limit }: { limit: number }): Promise<unknown[]> {
    if (typeof limit !== 'number' || !Number.isInteger(limit) || limit < 1 || limit > MAX_TO_ARRAY) {
      throw new TypeError(
        `Solidgate: toArray() needs a limit from 1 to ${MAX_TO_ARRAY}: toArray({ limit: 500 }). For more, iterate with for await.`,
      );
    }
    const all: unknown[] = [];
    for await (const item of items()) {
      all.push(item);
      if (all.length >= limit) break;
    }
    return all;
  }
  return Object.assign(first, { pages, toArray, [Symbol.asyncIterator]: items });
}
