type StatsCardProps = {
  title: string;
  count: number;
};

export default function StatsCard({ title, count }: StatsCardProps) {
  return (
    <div className="border rounded-lg p-6">
      <h2>{title}</h2>
      <p>{count}</p>
    </div>
  );
}
