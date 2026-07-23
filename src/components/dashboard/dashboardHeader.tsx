export default function DashboardHeader() {
  const today = new Date();

  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-4xl font-bold text-[var(--text-primary)]">
          Admin <span className="text-[var(--primary)]">Dashboard</span>
        </h1>

        <p className="mt-2 text-[var(--text-secondary)]">
          Welcome back! Here's what's happening in your library today.
        </p>
      </div>

      <div className="rounded-xl border border-slate-800 bg-[var(--bg-card)] px-5 py-3">
        <p className="text-sm text-[var(--text-secondary)]">
          {today.toLocaleDateString("en-IN", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>
    </div>
  );
}
