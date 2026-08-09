"use client";

import { ReactNode, useEffect } from "react";
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
  // Close modal with Escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  // Prevent background page from scrolling
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/65
        px-4
        py-6
        backdrop-blur-[3px]
      "
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
    >
      <div
        className={`
          relative
          flex
          w-full
          ${widthClasses[width]}
          max-h-[90vh]
          flex-col
          overflow-hidden
          rounded-2xl
          border
          border-[var(--border)]
          bg-[var(--bg-sidebar)]
          shadow-[0_25px_70px_rgba(0,0,0,0.45)]
          animate-in
          fade-in
          zoom-in-95
          duration-200
        `}
        onClick={(event) => event.stopPropagation()}
      >
        {/* Optional Header */}
        {title && (
          <div
            className="
              flex
              shrink-0
              items-center
              justify-between
              border-b
              border-[var(--border)]
              bg-[var(--bg-sidebar)]
              px-6
              py-4
            "
          >
            <h2
              id="modal-title"
              className="
                text-lg
                font-semibold
                tracking-tight
                text-[var(--text-primary)]
              "
            >
              {title}
            </h2>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-xl
                border
                border-transparent
                text-[var(--text-secondary)]
                transition-all
                duration-200
                hover:border-[var(--border)]
                hover:bg-[var(--bg-card)]
                hover:text-[var(--text-primary)]
                focus:outline-none
                focus:ring-2
                focus:ring-[var(--primary)]/50
              "
            >
              <X size={18} strokeWidth={2} />
            </button>
          </div>
        )}

        {/* Modal Body */}
        <div
          className="
            min-h-0
            flex-1
            overflow-y-auto
            px-6
            py-6
            scrollbar-thin
          "
        >
          {children}
        </div>
      </div>
    </div>
  );
}
