type DataTableProps = {
  children: React.ReactNode;
};

export default function DataTable({ children }: DataTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-[var(--border)]">
      <table className="w-full">{children}</table>
    </div>
  );
}
