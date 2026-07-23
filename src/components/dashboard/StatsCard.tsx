import { ReactNode } from "react";

type StatsCardProps = {
  title: string;
  value: number;
  icon: ReactNode;
  description?: string;
};

export default function StatsCard({
  title,
  value,
  icon,
  description,
}: StatsCardProps) {
  return (
    <div
      className="
      bg-[var(--bg-card)]
      border border-slate-800
      rounded-2xl
      p-6
      shadow-sm
      hover:border-[var(--primary)]
      hover:-translate-y-1
      transition-all
      duration-300
    "
    >
      <div className="flex justify-between items-center mb-5">
        <div>
          <p className="text-sm text-[var(--text-secondary)]">{title}</p>

          <h2 className="text-4xl font-bold text-[var(--text-primary)] mt-2">
            {value}
          </h2>
        </div>

        <div
          className="
          h-14
          w-14
          rounded-xl
          flex
          items-center
          justify-center
          bg-[var(--primary)]/10
          text-[var(--primary)]
          text-2xl
        "
        >
          {icon}
        </div>
      </div>

      {description && (
        <p className="text-sm text-[var(--text-secondary)]">{description}</p>
      )}
    </div>
  );
}
