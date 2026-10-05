"use client";

import { useRef, type ReactNode } from "react";
import { m, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * Slow parallax for media: the picture glides a few percent against the
 * scroll inside its frame. The frame must clip (overflow-hidden).
 */
export function Drift({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-2.2%", "2.2%"]);

  return (
    <div ref={ref} className="relative h-full w-full">
      <m.div
        className="relative h-full w-full"
        style={reduce ? undefined : { y, scale: 1.05 }}
      >
        {children}
      </m.div>
    </div>
  );
}
