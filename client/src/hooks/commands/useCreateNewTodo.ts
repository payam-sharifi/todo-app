import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";


import { createNewTodo } from "@/services";
import type { TodoRqType } from "@/types/todos.type";
import { queryClient } from "@/lib/react-query/queryClient";
import { useTranslation } from "react-i18next";

export const useCreateNewTodo = () => {
  const {t}=useTranslation()
  return useMutation({
    mutationFn: (body: TodoRqType) => createNewTodo(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllToDoList"] });
      toast.success(t("erfolgreich_erstellt"));
    },
    onError: () => {
      toast.error("Fehler_beim_Erstellen");
    },
  });
};
