interface TableHeaderProps {
  label: string;
}

function TableHeader({ label }: TableHeaderProps) {
  return (
    <th
      scope="col"
      className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-old-rose-950 "
    >
      {label}
    </th>
  );
}

export default TableHeader