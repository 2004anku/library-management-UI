"use client";

import { ReactNode } from "react";
import { X } from "lucide-react";

type ModalProps = {
  title?: string;
  children: ReactNode;
  onClose: () => void;
  width?: "sm" | "md" | "lg" | "xl";
};
const widthClasses = {
  sm: "max-w-md",
  md: "max-w-2xl",
  lg: "max-w-4xl",
  xl: "max-w-6xl",
};
export default function Modal({
  title,
  children,
  onClose,
  width = "md",
}: ModalProps) {
  return (
    <div
      className="
      fixed
      inset-0
      z-50
      flex
      items-center
      justify-center
      bg-black/60
      backdrop-blur-sm
      px-4
      "
    >
      <div
        className={`
        relative
        w-full
        ${widthClasses[width]}
        rounded-2xl
        border
        border-[var(--border)]
        bg-[var(--bg-sidebar)]
        shadow-2xl
        animate-in
        fade-in
        zoom-in
        duration-200
        `}
      >
        {/* Header */}

        {title && (
          <div
            className="
            flex
            items-center
            justify-between
            px-6
            py-5
            border-b
            border-[var(--border)]
            "
          >
            <h2
              className="
              text-xl
              font-bold
              text-white
              "
            >
              {title}
            </h2>

            <button
              onClick={onClose}
              className="
              h-8
              w-8
              rounded-full
              flex
              items-center
              justify-center
              text-gray-400
              hover:bg-white/10
              hover:text-white
              transition
              "
            >
              <X size={18} />
            </button>
          </div>
        )}

        {/* Body */}

        <div className="p-10">{children}</div>
      </div>
    </div>
  );
}
