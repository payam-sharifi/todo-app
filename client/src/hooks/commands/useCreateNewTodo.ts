import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";


import { createNewTodo } from "@/services";
import type { TodoRqType } from "@/types/todos.type";
import { queryClient } from "@/lib/react-query/queryClient";

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
