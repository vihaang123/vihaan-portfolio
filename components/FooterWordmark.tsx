"use client";

import { m } from "framer-motion";
import { easeOutExpo } from "@/components/Motion";

/**
 * The oversized name at the bottom of the footer. Drawn as SVG text stretched
 * to the exact container width, so it fits every screen, and cropped at the
 * bottom edge. It rises into place when it scrolls into view.
 */
export function FooterWordmark({ text }: { text: string }) {
  return (
    <div aria-hidden className="overflow-hidden">
      <m.div
        initial={{ y: "42%", opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 1.4, ease: easeOutExpo }}
      >
        <svg viewBox="0 0 1000 96" className="block w-full select-none" focusable="false">
          <defs>
            <linearGradient id="wordmark-fade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#f6f6f1" stopOpacity="0.34" />
              <stop offset="1" stopColor="#f6f6f1" stopOpacity="0.05" />
            </linearGradient>
          </defs>
          <text
            x="0"
            y="112"
            textLength="1000"
            lengthAdjust="spacingAndGlyphs"
            fontSize="124"
            fontWeight="800"
            letterSpacing="-4"
            fill="url(#wordmark-fade)"
            className="font-display"
          >
            {text}
          </text>
        </svg>
      </m.div>
    </div>
  );
}
