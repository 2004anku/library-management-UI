"use client";

import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  variant?: "primary" | "danger" | "secondary" | "success";
};

export default function Button({
  children,
  loading = false,
  variant = "primary",
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const variants = {
    primary: `
      bg-[var(--primary)]
      hover:bg-[var(--primary-hover)]
      text-[var(--text-primary)]
    `,

    danger: `
      bg-red-600
      hover:bg-red-700
      text-white
    `,

    secondary: `
      border
      border-[var(--border)]
      text-[var(--text-primary)]
      hover:bg-[var(--bg-card)]
    `,
    success: `
  bg-[var(--success)]
  hover:opacity-90
  text-white
`,
  };

  return (
    <button
      disabled={disabled || loading}
      className={`
        flex items-center justify-center gap-2
        px-5 py-2
        rounded-xl
        text-sm
        font-semibold
        transition-all duration-200
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}
