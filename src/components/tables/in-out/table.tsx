import React from "react";
import TableInOutRow from "./row";
import InOutTableHeader from "./header";
import { Transactions } from "@/app/lib/mockData";

interface InOutTableProps {
  labels: string[];
  data: Transactions[];
  onDelete: (id: string) => void;
  onEdit: (id: string, updatedData: Partial<Transactions>) => void;
}

function Table({ labels, data, onEdit, onDelete }: InOutTableProps) {
  return (
    <div className="mt-6 min-h-full overflow-hidden overflow-x-auto rounded-md border border-old-rose-200">
      <table className="w-full divide-y divide-old-rose-200">
        <thead className="bg-old-rose-100">
          <tr>
            {labels.map((label) => (
              <InOutTableHeader
                key={label ?? window.crypto.randomUUID()}
                label={label}
              />
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-old-rose-200 bg-old-rose-50">
          {data.map((data) => (
            <TableInOutRow
              key={data?.id ?? window.crypto.randomUUID()}
              onDelete={() => onDelete(data.id)}
              {...data}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
