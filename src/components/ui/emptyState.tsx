type EmptyStateProps = {
  message?: string;
};

export default function EmptyState({
  message = "No data found.",
}: EmptyStateProps) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <h1 className="text-xl text-[var(--text-secondary)]">{message}</h1>
    </div>
  );
}
