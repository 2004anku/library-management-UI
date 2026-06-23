type TableEmptyProps = {
  message: string;
};

export default function TableEmpty({ message }: TableEmptyProps) {
  return (
    <div className="py-10 text-center text-[var(--text-secondary)]">
      {message}
    </div>
  );
}
