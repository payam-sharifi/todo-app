import { useCallback, useMemo, useEffect, useRef, useState } from "react";

import type { TodoRsType, TodoStatus } from "@/types/todos.type";
import { Spinner } from "@/components/common/Spinner";
import { useDeleteTodo, useGetTodosList, useUpdateTodoById } from "@/hooks";
import { TodoItem } from "./TodoItem";
import { ConfirmModal } from "@/components/common/ConfirmModal";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { queryClient } from "@/lib/react-query/queryClient";

interface TodoListProps {
  status: string;
  title?: string;
}

export default function TodoList({ status, title }: TodoListProps) {
  const {
    data: todosResponse,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetTodosList({ status, title });
  const { t } = useTranslation();
  const { mutate: mutateDeleteTodo, isPending } = useDeleteTodo();
  const { mutate: mutateDoneToggle } = useUpdateTodoById();
  const listRef = useRef<HTMLDivElement>(null);
  const [todoToDelete, setTodoToDelete] = useState<{
    id: number;
    title: string;
  } | null>(null);

  const allTodos = useMemo(() => {
    return todosResponse?.pages.flatMap((page) => page.results) || [];
  }, [todosResponse]);

  const handleDoneToggle = (
    todo_ID: number,
    currentStatus: TodoStatus,
    titel: string
  ) => {
    mutateDoneToggle(
      {
        todo_ID,
        body: {
          status: currentStatus === "erledigt" ? "in_bearbeitung" : "erledigt",
          titel,
        },
      },
      {
        onSuccess(response: TodoRsType) {
          response.status === "in_bearbeitung"
            ? toast.success(t("in_bearbeitung_done"))
            : toast.success(t("erledigt_done"));
        },
      }
    );
  };

  const handleProgressStatus = (
    todo_ID: number,
    currentStatus: TodoStatus,
    titel: string
  ) => {
    mutateDoneToggle(
      {
        todo_ID,
        body: {
          status: currentStatus === "offen" ? "in_bearbeitung" : "offen",
          titel,
        },
      },
      {
        onSuccess: (response: TodoRsType) => {
          queryClient.invalidateQueries({ queryKey: ["getAllToDoList"] });
          response.status === "in_bearbeitung"
            ? toast.success(t("in_bearbeitung_done"))
            : toast.success(t("offen_done"));
        },
      }
    );
  };

  const handleDeleteClick = useCallback(
    (todo_ID: number, todoTitle: string) => {
      setTodoToDelete({ id: todo_ID, title: todoTitle });
    },
    []
  );

  const handleConfirmDelete = useCallback(() => {
    if (todoToDelete) {
      mutateDeleteTodo(
        { todo_ID: todoToDelete.id },
        {
          onSuccess: () => {
            setTodoToDelete(null);
          },
        }
      );
    }
  }, [todoToDelete, mutateDeleteTodo]);

  const handleCancelDelete = useCallback(() => {
    setTodoToDelete(null);
  }, []);

  const handleEdit = (todo_ID: number, titel: string, beschreibung: string) => {
    mutateDoneToggle(
      {
        todo_ID,
        body: {
          beschreibung,
          titel,
        },
      },
      {
        onSuccess: () => {
          toast.success(t("edit_susseccfull"));
        },
      }
    );
  };

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      if (scrollTop + clientHeight >= scrollHeight - 50) {
        if (hasNextPage && !isFetchingNextPage) fetchNextPage();
      }
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const memoizedTodoList = useMemo(
    () =>
      allTodos.map((todo: TodoRsType) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={handleDoneToggle}
          onDelete={handleDeleteClick}
          onProgress={handleProgressStatus}
          onEdit={handleEdit}
        />
      )),
    [allTodos, handleDoneToggle, handleDeleteClick]
  );

  if (isLoading && !allTodos.length) {
    return (
      <div className="py-8">
        <Spinner color="white" size="lg" text="Loading todos..." />
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-red-500 text-center py-8">
        {t("Fehler_beim_Laden_der_Todos")}: {error.message}
      </p>
    );
  }

  if (!allTodos.length && !isLoading) {
    return (
      <p className="text-white text-center py-8">
        {t("Keine_Aufgaben_gefunden")}
      </p>
    );
  }

  return (
    <>
      <div
        ref={listRef}
        className="overflow-y-auto h-full list-section
               [scrollbar-width:thin] 
               [scrollbar-color:white_transparent] 
               [&::-webkit-scrollbar]:w-2 
               [&::-webkit-scrollbar-track]:bg-transparent 
               [&::-webkit-scrollbar-thumb]:bg-white/80 
               [&::-webkit-scrollbar-thumb]:rounded-full 
               [&::-webkit-scrollbar-thumb:hover]:bg-white"
      >
        {memoizedTodoList}

        {isFetchingNextPage && (
          <div className="flex justify-center py-4">
            <Spinner color="white" size="sm" text={t("Loading_more")} />
          </div>
        )}

        {!hasNextPage && allTodos.length > 0 && (
          <div className="text-center py-4 text-gray-400">
            {t("Du_hast_das_Ende_erreicht.")}
          </div>
        )}
      </div>

      <ConfirmModal
        isOpen={!!todoToDelete}
        title={t("Aufgaben_löschen")}
        message={t("delete_confirmation")}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        confirmText={t("Löschen")}
        cancelText={t("stornieren")}
        isConfirmLoading={isPending}
      />
    </>
  );
}
