
import api from "@/lib/axios/axiosConfig";
import type { TodoRsType } from "@/types/todos.type";
import type { ApiResponse } from "@/types/generic.types";


export const getToDoList = async ({
  page,
  status,
  title,
}: {
  page: number;
  status?: string;
  title?: string;
}): Promise<ApiResponse<TodoRsType[]>> => {
  const params = new URLSearchParams();
  params.append("page", page.toString());
  if (status) params.append("status", status);
  if (title) params.append("title", title);

  const response = await api.get(`todos/?${params.toString()}`);
  return response.data;
};


export const getOneTodoById = async (
  todo_ID: string
): Promise<TodoRsType> => {
  const response = await api.get(`todos/${todo_ID}`);
  return response.data;
};