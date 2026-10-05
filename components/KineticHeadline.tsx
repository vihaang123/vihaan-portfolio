"use client";

import { useEffect, useRef } from "react";
import { m, useReducedMotion } from "framer-motion";
import { easeOutExpo } from "@/components/Motion";

/*
 * The hero headline. Every letter is its own box, set in a variable font whose
 * weight, width and optical size can change. Letters near the pointer swell
 * heavier and wider, then settle back. Touch screens and reduced-motion users
 * get a still headline; touch screens also get a single sweep after load.
 *
 * Rest and peak are the two ends of the font's axes (Bricolage Grotesque:
 * weight 200 to 800, width 75 to 100).
 */
const REST = { wght: 640, wdth: 78 } as const;
const PEAK = { wght: 800, wdth: 100 } as const;
const OPSZ = 96;

const lines = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.35 } },
};

const line = {
  hidden: { y: "112%" },
  show: { y: 0, transition: { duration: 1.1, ease: easeOutExpo } },
};

const settings = (k: number) =>
  `"wght" ${Math.round(REST.wght + (PEAK.wght - REST.wght) * k)}, "wdth" ${Math.round(
    REST.wdth + (PEAK.wdth - REST.wdth) * k,
  )}, "opsz" ${OPSZ}`;

export function KineticHeadline({
  rows,
  className = "",
}: {
  rows: readonly string[];
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const root = ref.current;
    if (!root || reduce) return;

    const chars = Array.from(root.querySelectorAll<HTMLElement>("[data-kc]"));
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const level = new Float32Array(chars.length);
    const applied: string[] = chars.map(() => "");

    let frame = 0;
    let last = 0;
    let px = -1e4;
    let py = -1e4;
    let lastMove = 0;
    let pointerOn = false;
    let sweepStart = 0;
    let sweeping = false;
    let settled = true;

    const visible = () => root.offsetParent !== null;

    const tick = (now: number) => {
      frame = 0;
      if (!visible()) return;
      const dt = Math.min(64, now - (last || now));
      last = now;
      const ease = 1 - Math.exp(-dt / 85);

      /* Read everything first, write afterwards: no layout thrash. */
      const box = root.getBoundingClientRect();
      const sigma = parseFloat(getComputedStyle(root).fontSize) * 1.05;
      const reach = sigma * 3;
      const near =
        pointerOn &&
        px > box.left - reach &&
        px < box.right + reach &&
        py > box.top - reach &&
        py < box.bottom + reach;

      let sweepX = -1e4;
      if (sweeping) {
        const t = (now - sweepStart) / 1700;
        if (t >= 1) sweeping = false;
        else sweepX = box.left - sigma * 2 + (box.width + sigma * 4) * t;
      }

      const live = near || sweeping || !settled;
      const centres = live
        ? chars.map((c) => {
            const r = c.getBoundingClientRect();
            return [r.left + r.width / 2, r.top + r.height / 2] as const;
          })
        : null;

      let unsettled = false;
      const next: string[] = new Array(chars.length);
      for (let i = 0; i < chars.length; i++) {
        let k = 0;
        if (centres) {
          const [cx, cy] = centres[i];
          if (near) {
            const d2 = (cx - px) ** 2 + ((cy - py) * 0.6) ** 2;
            k = Math.exp(-d2 / (2 * sigma * sigma));
          }
          if (sweeping) {
            k = Math.max(k, 0.85 * Math.exp(-((cx - sweepX) ** 2) / (2 * sigma * sigma)));
          }
        }
        level[i] += (k - level[i]) * ease;
        if (Math.abs(level[i] - k) > 0.004) unsettled = true;
        next[i] = level[i] < 0.004 ? "" : settings(level[i]);
      }
      for (let i = 0; i < chars.length; i++) {
        if (next[i] !== applied[i]) {
          chars[i].style.fontVariationSettings = next[i];
          applied[i] = next[i];
        }
      }
      settled = !unsettled;

      const moving = near && now - lastMove < 200;
      if (sweeping || unsettled || moving) frame = requestAnimationFrame(tick);
      else last = 0;
    };

    const wake = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const onMove = (event: PointerEvent) => {
      px = event.clientX;
      py = event.clientY;
      pointerOn = true;
      lastMove = performance.now();
      wake();
    };
    const onLeave = () => {
      pointerOn = false;
      settled = false;
      wake();
    };

    if (fine) {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
    }

    /* One sweep once the lines have risen into place. */
    const timer = window.setTimeout(() => {
      sweepStart = performance.now();
      sweeping = true;
      wake();
    }, 1700);

    return () => {
      window.clearTimeout(timer);
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      chars.forEach((c) => (c.style.fontVariationSettings = ""));
    };
  }, [reduce]);

  return (
    <m.span
      ref={ref}
      aria-hidden
      className={`kinetic ${className}`}
      variants={lines}
      initial="hidden"
      animate="show"
    >
      {rows.map((row) => (
        <span key={row} className="block overflow-hidden pb-[0.1em]">
          <m.span variants={line} className="block whitespace-nowrap">
            {row.split(" ").map((word, wi, words) => (
              <span key={wi}>
                <span className="inline-block whitespace-nowrap">
                  {Array.from(word).map((char, ci) => (
                    <span
                      key={ci}
                      data-kc
                      className={`kinetic-char ${
                        char === "." && ci === word.length - 1 ? "text-accent" : ""
                      }`}
                    >
                      {char}
                    </span>
                  ))}
                </span>
                {wi < words.length - 1 ? " " : null}
              </span>
            ))}
          </m.span>
        </span>
      ))}
    </m.span>
  );
}
