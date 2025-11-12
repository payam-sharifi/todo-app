import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";


import { deleteTodoById } from "@/services";
import { queryClient } from "@/lib/react-query/queryClient";
import { useTranslation } from "react-i18next";

export const useDeleteTodo = () => {
  const {t}=useTranslation()
  return useMutation({
    mutationFn: ({ todo_ID }: { todo_ID: number }) => deleteTodoById(todo_ID),
    onSuccess: () => {
      toast.success(t("Erfolgreich_gelöscht"))
      queryClient.invalidateQueries({ queryKey: ["getAllToDoList"] });
    },
    onError: () => {
      toast.error(t("Löschen_fehlgeschlagen"))
    }

  });
};
