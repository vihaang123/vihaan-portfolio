"use client";

import { ArrowUp } from "lucide-react";

export function BackToTop() {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="label group inline-flex min-h-11 items-center gap-2"
    >
      <span className="u-sweep">Back to top</span>
      <ArrowUp
        aria-hidden
        size={14}
        className="transition-transform duration-300 group-hover:-translate-y-0.5"
      />
    </button>
  );
}
