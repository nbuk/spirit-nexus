import { queryOptions } from '@tanstack/react-query';
import { getSpiritList } from './get-spirit-list';
import { keepPreviousData } from '@tanstack/query-core';

export const spiritQueries = {
  baseKey: 'spirits',
  list: () =>
    queryOptions({
      queryKey: [spiritQueries.baseKey],
      queryFn: getSpiritList,
      placeholderData: keepPreviousData,
    }),
};
