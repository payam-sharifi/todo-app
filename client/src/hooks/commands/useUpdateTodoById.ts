import { useMutation } from "@tanstack/react-query";
import type { TodoRsType } from "@/types/todos.type";

import { updateTodoById } from "@/services";

export const useUpdateTodoById = () => {
  return useMutation<
    TodoRsType,
    Error,
    { todo_ID: number; body: Partial<TodoRsType> }
  >({
    mutationKey: ["updateTodoById"],
    mutationFn: ({ todo_ID, body }) => updateTodoById(todo_ID, body),
  });
};
