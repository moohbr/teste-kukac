import { TransactionType } from "@/app/lib/mockData";
import { useState, useCallback } from "react";
import { useDashboardStore } from "@/app/stores/dashboard";

interface TableInOutRowProps {
  id: string;
  title: string;
  type: string;
  amount: number;
  date: string;
  onDelete: () => void;
}

function TableInOutRow({
  id,
  title,
  type,
  amount,
  date,
  onDelete,
}: TableInOutRowProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editType, setEditType] = useState<TransactionType | undefined>(type as TransactionType);
  const [editAmount, setEditAmount] = useState(amount);
  const [editDate, setEditDate] = useState(date);
  const editTransaction = useDashboardStore((state) => state.editTransaction);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = useCallback(() => {
    setIsEditing(false);
    editTransaction(id, {
      title: editTitle,
      type: editType,
      amount: editAmount,
      date: editDate,
    });
  }, [id, editTitle, editType, editAmount, editDate, editTransaction]);

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditTitle(title);
    setEditType(type as TransactionType);
    setEditAmount(amount);
    setEditDate(date);
  };

  return (
    <tr key={id} className="transition-all hover:bg-old-rose-100">
      <td className="whitespace-nowrap px-6 py-4">
        {isEditing ? (
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="text-sm font-medium text-old-rose-900"
            title="Edit Title"
          />
        ) : (
          <div className="text-sm font-medium text-old-rose-900">{title}</div>
        )}
      </td>
      <td className="whitespace-nowrap px-6 py-4">
        {isEditing ? (
          <input
            type="number"
            value={editAmount}
            onChange={(e) => setEditAmount(parseFloat(e.target.value))}
            className="text-sm text-old-rose-900"
            title="Edit Amount"
          />
        ) : (
          <div className="text-sm text-old-rose-900">
            {amount.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </div>
        )}
      </td>
      <td className="whitespace-nowrap px-6 py-4">
        {isEditing ? (
          <select
            value={editType}
            onChange={(e) => setEditType(e.target.value as TransactionType)}
            className="text-sm"
            title="Edit Type"
          >
            <option value={TransactionType.EXPENSE}>Despesa</option>
            <option value={TransactionType.INCOME}>Receita</option>
          </select>
        ) : (
          <span
            className={[
              "inline-flex rounded-full px-2 text-xs font-semibold leading-5",
              type === TransactionType.EXPENSE
                ? "bg-old-rose-900 text-old-rose-100"
                : "bg-old-rose-300 text-old-rose-900",
            ].join(" ")}
          >
            {type}
          </span>
        )}
      </td>
      <td className="whitespace-nowrap px-6 py-4">
        {isEditing ? (
          <input
            type="date"
            value={editDate}
            onChange={(e) => setEditDate(e.target.value)}
            className="text-sm text-old-rose-900"
            title="Edit Date"
          />
        ) : (
          <div className="text-sm text-old-rose-900">
            {new Date(date).toLocaleDateString("pt-BR")}
          </div>
        )}
      </td>
      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
        {isEditing ? (
          <>
            <button
              className="inline-block border-e p-3 text-old-rose-700 hover:bg-old-rose-50 focus:relative"
              title="Save"
              type="button"
              onClick={handleSaveClick}
            >
              Salvar
            </button>
            <button
              className="inline-block p-3 text-old-rose-700 hover:bg-old-rose-50 focus:relative"
              title="Cancel"
              type="button"
              onClick={handleCancelClick}
            >
              Cancelar
            </button>
          </>
        ) : (
          <>
            <button
              className="inline-block border-e p-3 text-old-rose-700 hover:bg-old-rose-50 focus:relative"
              title="Edit"
              type="button"
              onClick={handleEditClick}
            >
              Editar
            </button>
            <button
              className="inline-block p-3 text-old-rose-700 hover:bg-old-rose-50 focus:relative"
              title="Delete"
              type="button"
              onClick={onDelete}
            >
              Deletar
            </button>
          </>
        )}
      </td>
    </tr>
  );
}

export default TableInOutRow;