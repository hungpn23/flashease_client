import {
  createParser,
  createSearchParamsCache,
  parseAsStringLiteral,
} from "nuqs/server";

export const parseAsPageIndex = createParser({
  parse(page) {
    const result = parseInt(page, 10);
    if (isNaN(result) || result < 1) return null;
    return result;
  },

  serialize: (page) => page.toString(),
});

export const parseAsPageSize = createParser({
  parse(pageSize) {
    const result = parseInt(pageSize, 10);
    if (isNaN(result) || result < 10) return null;
    return result;
  },

  serialize: (page) => page.toString(),
});

export const searchParamsCache = createSearchParamsCache({
  page: parseAsPageIndex.withDefault(1),
  take: parseAsPageSize.withDefault(10),
  order: parseAsStringLiteral(["ASC", "DESC"]).withDefault("DESC"),
});
