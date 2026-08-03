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
        group
        relative
        overflow-hidden
        rounded-2xl
        border
        border-slate-800
        bg-[var(--bg-card)]
        p-6
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-[var(--primary)]
        hover:shadow-2xl
      "
    >
      {/* Top Accent */}
      <div className="absolute left-0 top-0 h-1 w-full bg-[var(--primary)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium tracking-wide text-[var(--text-secondary)]">
            {title}
          </p>

          <h2 className="mt-3 text-4xl font-bold tracking-tight text-[var(--text-primary)]">
            {value.toLocaleString()}
          </h2>
        </div>

        <div
          className="
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-full
            bg-[var(--primary)]/10
            text-2xl
            text-[var(--primary)]
            transition-transform
            duration-300
            group-hover:scale-110
          "
        >
          {icon}
        </div>
      </div>

      {/* Footer */}
      {description && (
        <div className="mt-6 border-t border-slate-800 pt-4">
          <p className="text-sm text-[var(--text-secondary)]">{description}</p>
        </div>
      )}
    </div>
  );
}
