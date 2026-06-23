type TableHeaderProps = {
  title: string;
  action?: React.ReactNode;
};

export default function TableHeader({ title, action }: TableHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-3xl font-bold">{title}</h1>

      {action}
    </div>
  );
}
