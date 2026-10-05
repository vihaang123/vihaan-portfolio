import type { ReactNode } from "react";

/**
 * Small drawing helpers shared by the project concept visuals.
 * Everything here is deterministic, so server and client render identical
 * markup. Colours come from the design tokens through Tailwind classes.
 */

export const round = (n: number) => Math.round(n * 10) / 10;

/** Tiny seeded random number generator for stable scatter data. */
export function seeded(seed: number) {
  let state = seed;
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
}

/** Point on a cubic Bézier curve, so flow markers sit exactly on their path. */
export function bezier(
  p0: [number, number],
  p1: [number, number],
  p2: [number, number],
  p3: [number, number],
  t: number,
): [number, number] {
  const u = 1 - t;
  const f = (a: number, b: number, c: number, d: number) =>
    round(u * u * u * a + 3 * u * u * t * b + 3 * u * t * t * c + t * t * t * d);
  return [f(p0[0], p1[0], p2[0], p3[0]), f(p0[1], p1[1], p2[1], p3[1])];
}

interface TextProps {
  x: number;
  y: number;
  size?: number;
  anchor?: "start" | "middle" | "end";
  className?: string;
  opacity?: number;
  children: ReactNode;
}

/** Monospace UI label. */
export function Mono({
  x,
  y,
  size = 14,
  anchor = "start",
  className = "fill-muted",
  opacity,
  children,
}: TextProps) {
  return (
    <text
      x={x}
      y={y}
      fontSize={size}
      textAnchor={anchor}
      fillOpacity={opacity}
      letterSpacing={round(size * 0.07)}
      className={`font-mono ${className}`}
    >
      {children}
    </text>
  );
}

/** Sans-serif UI heading. */
export function Sans({
  x,
  y,
  size = 18,
  anchor = "start",
  className = "fill-ink",
  opacity,
  children,
}: TextProps) {
  return (
    <text
      x={x}
      y={y}
      fontSize={size}
      textAnchor={anchor}
      fillOpacity={opacity}
      fontWeight={600}
      letterSpacing={round(size * -0.02)}
      className={`font-sans ${className}`}
    >
      {children}
    </text>
  );
}

/** Marks the visual as a concept, not a screenshot of a real product. */
export function ConceptTag({
  x,
  y,
  dark = false,
}: {
  x: number;
  y: number;
  dark?: boolean;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={98}
        height={26}
        rx={13}
        fill="none"
        className={dark ? "stroke-paper" : "stroke-ink"}
        strokeOpacity={0.35}
      />
      <Mono
        x={x + 49}
        y={y + 17.5}
        size={11}
        anchor="middle"
        className={dark ? "fill-paper" : "fill-ink"}
        opacity={0.7}
      >
        CONCEPT
      </Mono>
    </g>
  );
}

/** Repeating dot texture, drawn as one pattern instead of hundreds of nodes. */
export function DotGrid({
  id,
  x,
  y,
  width,
  height,
  step = 28,
  className = "fill-ink",
  opacity = 0.12,
}: {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  step?: number;
  className?: string;
  opacity?: number;
}) {
  return (
    <>
      <defs>
        <pattern
          id={id}
          width={step}
          height={step}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <circle cx={step / 2} cy={step / 2} r={1.4} className={className} fillOpacity={opacity} />
        </pattern>
      </defs>
      <rect x={x} y={y} width={width} height={height} fill={`url(#${id})`} />
    </>
  );
}
