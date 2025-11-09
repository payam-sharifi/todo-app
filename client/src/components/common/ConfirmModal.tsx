import { memo } from "react";
import { FaExclamationTriangle, FaTimes } from "react-icons/fa";
import { Spinner } from "./Spinner";

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  isConfirmLoading?: boolean;
}

export const ConfirmModal = memo(({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  isConfirmLoading,
  confirmText = "Delete",
  cancelText = "Cancel"
}: ConfirmModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-20 flex items-center justify-center z-50 p-4">
      <div className="bg-purple-200 rounded-lg max-w-md w-full p-6 shadow-xl">
        {/* Header with red warning icon */}
        <div className="flex items-start gap-4 mb-4">
          <div className=" text-red-500">
            <FaExclamationTriangle size={24} />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          </div>
          <button
            onClick={onCancel}
            className="cursor-pointer text-gray-400 hover:text-gray-600 transition-colors duration-200"
            aria-label="Close"
          >
            <FaTimes size={18} />
          </button>
        </div>

        {/* Message */}
        <p className="text-gray-600 mb-6 ml-10">{message}</p>
        
        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="cursor-pointer px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            disabled={isConfirmLoading}
            className="cursor-pointer flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-70 disabled:cursor-not-allowed min-w-20"
          >
            {isConfirmLoading ? (
              <>
                <Spinner color="white" size="sm" />
                <span>Löschen...</span>
              </>
            ) : (
              confirmText
            )}
          </button>
          
        </div>
      </div>
    </div>
  );
});

ConfirmModal.displayName = "ConfirmModal";