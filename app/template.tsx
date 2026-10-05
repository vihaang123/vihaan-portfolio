"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { m } from "framer-motion";
import { easeOutExpo } from "@/components/Motion";

/* The first page load has its own hero sequence, so only later navigations
   get the page transition. */
let firstPaint = true;

export default function Template({ children }: { children: ReactNode }) {
  const skip = firstPaint;
  useEffect(() => {
    firstPaint = false;
  }, []);

  return (
    <m.div
      initial={skip ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, ease: easeOutExpo }}
    >
      {children}
    </m.div>
  );
}
