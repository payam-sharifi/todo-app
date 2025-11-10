import type { TodoRsType, TodoStatus } from "@/types/todos.type";
import { FaCheckCircle, FaTrash } from "react-icons/fa";
import { memo, useCallback } from "react";

interface TodoItemProps {
  todo: TodoRsType;
  onToggle?: (id: number, status: TodoStatus, titel: string) => void;
  onDelete?: (id: number, title: string) => void;
  onProgress?: (id: number, status: TodoStatus, titel: string) => void;
}

export const TodoItem = memo(
  ({ todo, onToggle: onDoneToggle, onDelete, onProgress }: TodoItemProps) => {
    const handleDoneToggle = useCallback(() => {
      onDoneToggle?.(todo.id, todo.status, todo.titel);
    }, [onDoneToggle, todo.id]);

    const handleDelete = useCallback(() => {
      onDelete?.(todo.id, todo.titel);
    }, [onDelete, todo.id, todo.titel]);

    const handleProgressToggle = useCallback(() => {
      onProgress?.(todo.id, todo.status, todo.titel);
    }, [onProgress, todo.id, todo.titel]);

    return (
      <div className="bg-purple-800 p-2 rounded-lg flex justify-between items-center my-3 text-white shadow-md hover:bg-purple-700 transition-colors duration-200">
        <div className="flex justify-between  gap-2">
          <input
            id="default-checkbox"
            type="checkbox"
            onClick={handleProgressToggle}
            checked={todo.status==="in_bearbeitung" || todo.status=== "erledigt"}
            className="cursor-pointer w-4 h-4 mt-1 accent-purple-500 bg-gray-100 border-purple-900 rounded-sm 
             focus:ring-purple-900 dark:focus:ring-purple-900 dark:ring-offset-gray-800 
             focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <div>
            <p
              className={`text-sm ${
                todo.status == "erledigt" ? "line-through text-gray-300" : ""
              }`}
            >
              {todo.titel}
            </p>
            <p
              className={`text-xs text-purple-200 ${
                todo.status == "erledigt" ? "line-through text-gray-300" : ""
              }`}
            >
              {todo.beschreibung}
            </p>
          </div>
        </div>
        {(todo.status !== "offen") && (
          <div className="flex items-center gap-3">
            <FaCheckCircle
              className={`cursor-pointer hover:text-green-300 transition-colors duration-200 ${
                todo.status == "erledigt" ? "text-green-400" : "text-gray-300"
              }`}
              size={20}
              onClick={handleDoneToggle}
              aria-label={
                todo.status == "erledigt"
                  ? "Mark as incomplete"
                  : "Mark as complete"
              }
            />
            <FaTrash
              className="cursor-pointer hover:text-red-300 text-gray-300 transition-colors duration-200"
              size={18}
              onClick={handleDelete}
              aria-label="Delete todo"
            />
          </div>
        )}
      </div>
    );
  }
);

TodoItem.displayName = "TodoItem";
