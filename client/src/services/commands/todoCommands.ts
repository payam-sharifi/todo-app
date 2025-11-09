import api from "../axiosConfig";
import type { TodoRqType, TodoRsType } from "@/types/todos.type";
import type { ApiResponse } from "@/types/generic.types";


export const createNewTodo = async (
    body: TodoRqType
  ): Promise<ApiResponse<TodoRsType>> => {
    const response = await api.post<ApiResponse<TodoRsType>>(`todos/`, body);
    return response.data;
  };
  
  export const deleteTodoById = async (
    todo_ID: number
  ): Promise<null> => {
    const response = await api.delete<null>(`todos/${todo_ID}`);
    return response.data;
  };
  
  export const updateTodoById = async (
    todo_ID: number,
    body: Partial<TodoRsType>
  ): Promise<TodoRsType> => {
    const response = await api.put<TodoRsType>(
      `todos/${todo_ID}/`,
      body
    );
    return response.data;
  };