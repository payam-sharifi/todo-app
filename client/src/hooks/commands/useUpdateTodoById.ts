import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { TodoRsType } from "@/types/todos.type";

import { toast } from "react-toastify";
import { updateTodoById } from "@/services";
import { useTranslation } from "react-i18next";

export const useUpdateTodoById = () => {
  const {t}=useTranslation()
  const queryClient = useQueryClient();
return useMutation<TodoRsType,Error,{ todo_ID: number; body: Partial<TodoRsType> }>({
    mutationKey: ["updateTodoById"],
    mutationFn: ({ todo_ID, body }) => updateTodoById(todo_ID, body),
    onSuccess: () => {
      
      queryClient.invalidateQueries({ queryKey: ["getAllToDoList"] });
      toast.success(t("Erfolgreich_bearbeitet"))
    },
  });
};
