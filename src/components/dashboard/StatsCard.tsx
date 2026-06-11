type StatsCardProps = {
  title: string;
  count: number;
};

export default function StatsCard({ title, count }: StatsCardProps) {
  return (
    <div className="rounded-2xl shadow-md px-2 py-2">
      <h2 className="text-[var(--primary)] text-2xl font-bold">{title}</h2>

      <p className="text-4xl font-bold mt-3 text-[var(--text-primary)]">
        {count}
      </p>
    </div>
  );
}
