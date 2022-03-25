import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { queryClient } from "..";

export default function useFetchData(
  cache_key,
  fetchFunction,
  dependencies = []
) {
  const [page, setPage] = useState(1);

  const { isFetching, isLoading, data, refetch } = useQuery(
    [cache_key, page, ...dependencies],
    () => fetchFunction(page, ...dependencies),
    { keepPreviousData: true }
  );

  // Prefetch the next page!
  useEffect(() => {
    if (data?.data?.logs?.hasNextPage) {
      queryClient.prefetchQuery([cache_key, page + 1, ...dependencies], () =>
        fetchFunction(page + 1, ...dependencies)
      );
    }
  }, [data, page, dependencies, fetchFunction, cache_key]);

  return {
    // INTERNAL EXPORTS
    page,
    setPage,
    // REACT QUERY EXPORTS
    isFetching,
    isLoading,
    data,
    refetch,
  };
}
