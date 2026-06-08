type StatsCardProps = {
  title: string;
  count: number;
};

export default function StatsCard({ title, count }: StatsCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md px-2 py-2">
      <h2 className="text-[#846B5A] text-sl font-bold ">{title}</h2>

      <p className="text-4xl font-bold mt-3 text-[#CAB8A9]">{count}</p>
    </div>
  );
}
