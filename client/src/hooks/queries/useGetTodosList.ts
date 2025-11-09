import { useInfiniteQuery } from "@tanstack/react-query";

import { getToDoList } from "@/services";

import type { TodoRsType } from "@/types/todos.type";
import type { ApiResponse } from "@/types/generic.types";

export const useGetTodosList = (
  {
    status,
    title,
  }: {
    status?: string;
    title?: string;
  }
) => {
  return useInfiniteQuery({
    queryKey: ["getAllToDoList", status, title],
    queryFn: async ({ pageParam = 1 }: { pageParam: number }) =>
      getToDoList({ page: pageParam ,status, title}),
    initialPageParam: 1,
    getNextPageParam: (lastPage: ApiResponse<TodoRsType[]>) => {
      if (!lastPage.next) return undefined;
      const nextUrl = new URL(lastPage.next);
      const nextPage = nextUrl.searchParams.get("page");
      return nextPage ? parseInt(nextPage, 10) : undefined;
    },
    getPreviousPageParam: (firstPage: ApiResponse<TodoRsType[]>) => {
      if (!firstPage.previous) return undefined;
      const prevUrl = new URL(firstPage.previous);
      const prevPage = prevUrl.searchParams.get("page");
      return prevPage ? parseInt(prevPage, 10) : undefined;
    },
    refetchOnWindowFocus: false, // Prevent refetch when switching tabs/windows
    refetchOnMount: true, // Allow refetch on mount if data is stale
    refetchOnReconnect: false, // Prevent refetch on network reconnect
    staleTime: 60000, // Consider data fresh for 60 seconds
  });
};
