import React, { useState } from "react";
import { Transactions, TransactionType } from "@/app/lib/mockData";

interface AddTransactionModalProps {
  isOpen: boolean;
  onSave: (newTransaction: Omit<Transactions, "id">) => void;
  onCancel: () => void;
}

const AddTransactionModal: React.FC<AddTransactionModalProps> = ({
  isOpen,
  onSave,
  onCancel,
}) => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState(TransactionType.EXPENSE);
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState("");

  const handleSaveClick = () => {
    if (title && type && amount && date) {
      onSave({
        title,
        type,
        amount,
        date,
        userId: "",
      });
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-old-rose-950 bg-opacity-50">
      <div className="space-y-4 rounded-md bg-old-rose-50 p-6">
        <h2 className="text-2xl font-bold">Adicionar Translação</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-md border border-old-rose-200 p-2"
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
          className="w-full rounded-md border border-old-rose-200 p-2"
        />
        <select
          title="Type"
          value={type}
          onChange={(e) => setType(e.target.value as TransactionType)}
          className="w-full rounded-md border border-old-rose-200 p-2"
        >
          <option value={TransactionType.EXPENSE}>Despesa</option>
          <option value={TransactionType.INCOME}>Receita</option>
        </select>
        <input
          title="Date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full rounded-md border border-old-rose-200 p-2"
        />
        <div className="flex space-x-4">
          <button
            type="button"
            className="rounded-md bg-old-rose-800 px-4 py-2 text-old-rose-50"
            onClick={handleSaveClick}
          >
            Save
          </button>
          <button
            type="button"
            className="rounded-md bg-old-rose-500 px-4 py-2 text-old-rose-50"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTransactionModal;
