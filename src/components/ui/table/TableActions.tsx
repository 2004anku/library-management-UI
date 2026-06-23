type TableActionsProps = {
  children: React.ReactNode;
};

export default function TableActions({ children }: TableActionsProps) {
  return <div className="flex justify-end gap-2">{children}</div>;
}
