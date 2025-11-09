import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { queryClient } from "@/services/queryClient";

import { createNewTodo } from "@/services";
import type { TodoRqType } from "@/types/todos.type";

export const useCreateNewTodo = () => {
  return useMutation({
    mutationFn: (body: TodoRqType) => createNewTodo(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllToDoList"] });
      toast.success("erfolgreich erstellt");
    },
    onError: () => {
      toast.error("Fehler beim Erstellen");
    },
  });
};
