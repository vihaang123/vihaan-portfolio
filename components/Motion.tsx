"use client";

import {
  LazyMotion,
  MotionConfig,
  domAnimation,
  m,
  useReducedMotion,
} from "framer-motion";
import type { ReactNode } from "react";

/** One easing curve for the whole site so motion feels like one system. */
export const easeOutExpo = [0.16, 1, 0.3, 1] as const;

/**
 * Loads Framer Motion's DOM feature set lazily and makes every animation
 * respect `prefers-reduced-motion`. Components use the lightweight `m`
 * element, which keeps the animation bundle small.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

/** Fades and lifts content into place the first time it scrolls into view. */
export function Reveal({ children, className, delay = 0, y = 24 }: RevealProps) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.9, ease: easeOutExpo, delay }}
    >
      {children}
    </m.div>
  );
}

interface RevealTextProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/**
 * Masked line reveal for headings. The text stays in the DOM the whole time,
 * so screen readers and search engines always get the full heading.
 */
export function RevealText({ children, className = "", delay = 0 }: RevealTextProps) {
  return (
    // The clipping wrapper is the element that is watched, not the text that slides.
    // A heading that wraps onto two lines starts fully outside its own clip box, so
    // watching the text itself never fired on phones and the heading stayed hidden.
    <m.span
      className={`block overflow-hidden pb-[0.1em] ${className}`}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
    >
      <m.span
        className="block"
        variants={{
          hidden: { y: "108%" },
          shown: { y: 0, transition: { duration: 1, ease: easeOutExpo, delay } },
        }}
      >
        {children}
      </m.span>
    </m.span>
  );
}

/** Unveils media from the top edge with a soft fade. Skipped for reduced motion. */
export function RevealMedia({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <m.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, clipPath: "inset(0 0 14% 0)" }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, clipPath: "inset(0 0 0% 0)" }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 1.2, ease: easeOutExpo }}
    >
      {children}
    </m.div>
  );
}

/** A hairline that draws itself from the left when it scrolls into view. */
export function DrawLine({
  className = "bg-line",
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  return (
    <m.span
      aria-hidden
      className={`absolute inset-x-0 top-0 h-px origin-left ${className}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 1.3, ease: easeOutExpo, delay }}
    />
  );
}

/** Children rise in one after another. Wrap items in StaggerItem. */
export function Stagger({
  children,
  className,
  delay = 0,
  gap = 0.05,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  gap?: number;
}) {
  return (
    <m.ul
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: gap, delayChildren: delay } } }}
    >
      {children}
    </m.ul>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <m.li
      className={className}
      variants={{
        hidden: { opacity: 0, y: 14 },
        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOutExpo } },
      }}
    >
      {children}
    </m.li>
  );
}
