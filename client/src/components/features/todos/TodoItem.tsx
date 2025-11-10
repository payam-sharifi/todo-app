import type { TodoRsType, TodoStatus } from "@/types/todos.type";
import { FaCheckCircle, FaTrash } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { memo, useCallback, useState } from "react";

interface TodoItemProps {
  todo: TodoRsType;
  onToggle?: (id: number, status: TodoStatus, titel: string) => void;
  onDelete?: (id: number, title: string) => void;
  onProgress?: (id: number, status: TodoStatus, titel: string) => void;
  onEdit?: (id: number, titel: string, beschreibung: string) => void; // ✅ new prop
}

export const TodoItem = memo(
  ({ todo, onToggle: onDoneToggle, onDelete, onProgress, onEdit }: TodoItemProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(todo.titel);
    const [editedDesc, setEditedDesc] = useState(todo.beschreibung || "");

    const handleDoneToggle = useCallback(() => {
      onDoneToggle?.(todo.id, todo.status, todo.titel);
    }, [onDoneToggle, todo.id, todo.status, todo.titel]);

    const handleDelete = useCallback(() => {
      onDelete?.(todo.id, todo.titel);
    }, [onDelete, todo.id, todo.titel]);

    const handleProgressToggle = useCallback(() => {
      onProgress?.(todo.id, todo.status, todo.titel);
    }, [onProgress, todo.id, todo.status, todo.titel]);

    const handleEditClick = useCallback(() => {
      setIsEditing(true);
    }, []);

    const handleSaveEdit = useCallback(() => {
      onEdit?.(todo.id, editedTitle, editedDesc);
      setIsEditing(false);
    }, [onEdit, todo.id, editedTitle, editedDesc]);

    const handleCancelEdit = useCallback(() => {
      setEditedTitle(todo.titel);
      setEditedDesc(todo.beschreibung || "");
      setIsEditing(false);
    }, [todo.titel, todo.beschreibung]);

    return (
      <div className="bg-purple-800 p-3 rounded-lg flex justify-between items-center my-3 text-white shadow-md hover:bg-purple-700 transition-colors duration-200">
        <div className="flex items-start gap-2 flex-1">
          <input
            id={`todo-${todo.id}`}
            type="checkbox"
            onClick={handleProgressToggle}
            checked={
              todo.status === "in_bearbeitung" || todo.status === "erledigt"
            }
            className="cursor-pointer w-4 h-4 mt-1 accent-purple-500 bg-gray-100 border-purple-900 rounded-sm 
             focus:ring-purple-900 dark:focus:ring-purple-900 dark:ring-offset-gray-800 
             focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />

          {isEditing ? (
            <div className="flex flex-col ">
              <input
                className="bg-purple-600 text-white text-sm rounded px-2 py-1 mb-1 focus:outline-none focus:ring-2 focus:ring-purple-400"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />
              <input
                className="bg-purple-600 text-white text-xs rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-400"
                value={editedDesc}
                onChange={(e) => setEditedDesc(e.target.value)}
              />
              <div className="flex gap-2 mt-2">
              <button
                  onClick={handleCancelEdit}
                  className=" cursor-pointer bg-gray-500 hover:bg-gray-400 text-xs px-2 py-1 rounded"
                >
                  stornieren
                </button>
                <button
                  onClick={handleSaveEdit}
                  className=" cursor-pointer bg-green-500 hover:bg-green-400 text-xs px-2 py-1 rounded"
                >
                  speichern
                </button>
               
              </div>
            </div>
          ) : (
            <div>
              <p
                className={`text-sm ${
                  todo.status === "erledigt" ? "line-through text-gray-300" : ""
                }`}
              >
                {todo.titel}
              </p>
              <p
                className={`text-xs text-purple-200 ${
                  todo.status === "erledigt" ? "line-through text-gray-300" : ""
                }`}
              >
                {todo.beschreibung}
              </p>
            </div>
          )}
        </div>


        <div className="flex items-center gap-3">
          {!isEditing && (
            <CiEdit
              size={22}
              className="cursor-pointer hover:text-yellow-300 text-gray-300 transition-colors duration-200"
              onClick={handleEditClick}
              aria-label="Edit todo"
            />
          )}

          {todo.status !== "offen" && !isEditing && (
            <>
              <FaCheckCircle
                className={`cursor-pointer hover:text-green-300 transition-colors duration-200 ${
                  todo.status === "erledigt" ? "text-green-400" : "text-gray-300"
                }`}
                size={20}
                onClick={handleDoneToggle}
                aria-label={
                  todo.status === "erledigt"
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
            </>
          )}
        </div>
      </div>
    );
  }
);

TodoItem.displayName = "TodoItem";
