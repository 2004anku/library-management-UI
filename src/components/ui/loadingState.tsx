type LoadingStateProps = {
  message?: string;
};

export default function LoadingState({
  message = "Loading...",
}: LoadingStateProps) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <h1 className="text-xl text-[var(--text-primary)]">{message}</h1>
    </div>
  );
}
