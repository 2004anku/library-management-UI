type TableColumn = {
  key: string;
  label: string;
  width?: string;
  align?: "left" | "right" | "center";
};

type TableColumnsProps = {
  columns: TableColumn[];
};

export default function TableColumns({ columns }: TableColumnsProps) {
  return (
    <thead className="border-b border-[var(--border)]">
      <tr>
        {columns.map((column) => (
          <th
            key={column.key}
            className={`
              p-4
              text-xs
              font-semibold
              uppercase
              tracking-wider
              text-[var(--text-secondary)]
              ${column.align === "right" ? "text-right" : ""}
              ${column.align === "center" ? "text-center" : ""}
              ${
                column.align !== "right" && column.align !== "center"
                  ? "text-left"
                  : ""
              }
            `}
            style={{
              width: column.width,
            }}
          >
            {column.label}
          </th>
        ))}
      </tr>
    </thead>
  );
}
