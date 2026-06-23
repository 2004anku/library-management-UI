"use client";

import { Search } from "lucide-react";

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export default function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
}: SearchInputProps) {
  return (
    <div className="relative w-full sm:w-64">
      <Search
        size={18}
        className="
          absolute left-3 top-1/2
          -translate-y-1/2
          text-[var(--text-secondary)]
        "
      />

      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full
          pl-10 pr-4 py-2
          bg-[var(--bg-card)]
          border border-[var(--border)]
          text-[var(--text-primary)]
          placeholder-[var(--text-secondary)]
          text-sm rounded-xl
          focus:outline-none
          focus:ring-2
          focus:ring-[var(--primary)]
          focus:border-[var(--primary)]
          transition-all
        "
      />
    </div>
  );
}
