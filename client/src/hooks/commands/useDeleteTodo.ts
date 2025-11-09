import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { queryClient } from "@/services/queryClient";
import { deleteTodoById } from "@/services";

export const useDeleteTodo = () => {
  return useMutation({
    mutationFn: ({ todo_ID }: { todo_ID: number }) => deleteTodoById(todo_ID),
    onSuccess: () => {
      toast.success("Erfolgreich gelöscht")
      queryClient.invalidateQueries({ queryKey: ["getAllToDoList"] });
    },
    onError: () => {
      toast.error("Löschen fehlgeschlagen")
    }

  });
};
