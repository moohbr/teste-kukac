import React from "react";

interface ConfirmActionProps {
  isOpen: boolean;
  title: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmAction: React.FC<ConfirmActionProps> = ({
  isOpen,
  title,
  onCancel,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-old-rose-800 bg-opacity-50">
      <div className="rounded-md bg-old-rose-50 px-16 py-14 text-center">
        <h1 className="mb-4 text-xl font-bold text-old-rose-500">{title}</h1>
        <div>
          <button
            type="button"
            onClick={onCancel}
            className="text-md rounded-md bg-old-rose-300 px-4 py-2 text-old-rose-900"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="text-md ml-2 rounded-md bg-old-rose-900 px-7 py-2 font-semibold text-old-rose-300"
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmAction;
