
import api from "@/lib/axios/axiosConfig";
import type { TodoRsType } from "@/types/todos.type";
import type { ApiResponse } from "@/types/generic.types";


export const getToDoList = async (page:{page: number  }): Promise<ApiResponse<TodoRsType[]>> => {
  const response = await api.get(`todos/?page=${page.page}`);
  return response.data;
};

export const getOneTodoById = async (
  todo_ID: string
): Promise<TodoRsType> => {
  const response = await api.get(`todos/${todo_ID}`);
  return response.data;
};