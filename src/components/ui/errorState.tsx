type ErrorStateProps = {
  message: string;
};

export default function ErrorState({ message }: ErrorStateProps) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <h1 className="text-xl text-[var(--danger)]">{message}</h1>
    </div>
  );
}
