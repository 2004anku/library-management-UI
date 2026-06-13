"use client";

import { useEffect, useState } from "react";
import { loadingStore } from "@/lib/loading/loadingStore";

export default function GlobalLoader() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadingStore.subscribe(setLoading);
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}