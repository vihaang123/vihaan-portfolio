"use client";

import { useEffect, useRef, useState } from "react";
import { m } from "framer-motion";
import { hero } from "@/lib/content";
import { easeOutExpo } from "@/components/Motion";

/*
 * "My path so far, drawn as a time series."
 * A noisy line that passes exactly through real milestones (dates from
 * lib/content.ts), then a forecast cone fanning out past today. It is a
 * picture of a path, not a chart of data: there is no y axis.
 *
 * Geometry is computed in real pixels (measured with a ResizeObserver) so the
 * stroke stays an even width and the draw-on animation behaves.
 */
const { points, now, label, next } = hero.trajectory;

const r2 = (n: number) => Math.round(n * 100) / 100;
const smooth = (t: number) => t * t * (3 - 2 * t);

const anchors = [{ at: 0, y: 0.88 }, ...points.map((p) => ({ at: p.at, y: p.y }))];

/** Height of the line (0 top, 1 bottom) at horizontal position x (0 to 1). */
function levelAt(x: number) {
  let k = 0;
  while (k < anchors.length - 2 && x > anchors[k + 1].at) k++;
  const a = anchors[k];
  const b = anchors[k + 1];
  const t = Math.min(1, Math.max(0, (x - a.at) / (b.at - a.at)));
  const window = Math.sin(Math.PI * t); // zero at every milestone
  const noise =
    (Math.sin(x * 97) * 0.5 + Math.sin(x * 41 + 1.3) * 0.35 + Math.sin(x * 173 + 0.4) * 0.15) *
    0.055 *
    window;
  return a.y + (b.y - a.y) * smooth(t) + noise;
}

const xs = Array.from(
  new Set([
    ...Array.from({ length: 141 }, (_, i) => r2((i / 140) * now)),
    ...points.map((p) => p.at),
  ]),
).sort((a, b) => a - b);

function geometry(w: number, h: number) {
  const pts = xs.map((x) => [r2(x * w), r2(levelAt(x) * h)] as const);
  const line = pts.map(([x, y], i) => `${i ? "L" : "M"}${x} ${y}`).join("");
  const [nx, ny] = pts[pts.length - 1];
  const area = `${line}L${nx} ${h}L0 ${h}Z`;
  const cx = r2(nx + (w - nx) * 0.55);
  const end = r2(w - 2);
  const yUp = r2(Math.max(h * 0.05, ny - h * 0.24));
  const yMid = r2(ny - h * 0.1);
  const yLow = r2(ny + h * 0.14);
  const up = `M${nx} ${ny}Q${cx} ${r2(ny - h * 0.03)} ${end} ${yUp}`;
  const mid = `M${nx} ${ny}Q${cx} ${r2(ny - h * 0.02)} ${end} ${yMid}`;
  const low = `M${nx} ${ny}Q${cx} ${r2(ny + h * 0.03)} ${end} ${yLow}`;
  const cone = `${up}L${end} ${yLow}Q${cx} ${r2(ny + h * 0.03)} ${nx} ${ny}Z`;
  return { line, area, up, mid, low, cone };
}

const delayFor = (at: number) => 0.85 + (at / now) * 2;

export function Trajectory() {
  const box = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 1000, h: 170 });

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const read = () => {
      const { width, height } = el.getBoundingClientRect();
      if (width > 0 && height > 0) setSize({ w: Math.round(width), h: Math.round(height) });
    };
    read();
    const observer = new ResizeObserver(read);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const g = geometry(size.w, size.h);

  return (
    <figure aria-label={label} className="relative">
      <ol className="sr-only">
        {points.map((p) => (
          <li key={p.id}>
            {p.date ? `${p.date}: ` : ""}
            {p.title}
          </li>
        ))}
      </ol>

      <div ref={box} aria-hidden className="relative mb-12 h-[clamp(7.5rem,17svh,11rem)] w-full sm:mb-14">
        {/* Dots and lines fade out at the sides; labels sit outside the fade. */}
        <div className="absolute inset-0 [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)] before:absolute before:inset-0 before:bg-[radial-gradient(circle,rgb(11_11_11/0.16)_1px,transparent_1.5px)] before:bg-[length:22px_22px] before:content-['']">
        <svg
          viewBox={`0 0 ${size.w} ${size.h}`}
          width="100%"
          height="100%"
          className="absolute inset-0 overflow-visible"
          focusable="false"
        >
          <defs>
            <linearGradient id="trajectory-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#1e3cff" stopOpacity="0.14" />
              <stop offset="1" stopColor="#1e3cff" stopOpacity="0" />
            </linearGradient>
          </defs>

          <m.path
            d={g.area}
            fill="url(#trajectory-fill)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.6, delay: 2.2, ease: easeOutExpo }}
          />

          {/* forecast cone */}
          <m.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, delay: 2.9, ease: easeOutExpo }}
          >
            <path d={g.cone} fill="#1e3cff" fillOpacity={0.11} />
            <path d={g.up} fill="none" stroke="#1e3cff" strokeOpacity={0.6} strokeWidth={1.4} strokeDasharray="3 6" />
            <path d={g.low} fill="none" stroke="#1e3cff" strokeOpacity={0.6} strokeWidth={1.4} strokeDasharray="3 6" />
            <path
              d={g.mid}
              fill="none"
              stroke="#1e3cff"
              strokeWidth={2}
              strokeLinecap="round"
              strokeDasharray="2 8"
              className="animate-[dash_2.4s_linear_infinite] motion-reduce:animate-none"
            />
          </m.g>

          <m.path
            d={g.line}
            fill="none"
            stroke="#0b0b0b"
            strokeWidth={2}
            strokeLinejoin="round"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.2, delay: 0.85, ease: [0.45, 0, 0.2, 1] }}
          />
        </svg>
        </div>

        {points.map((p) => {
          const isNow = p.id === "now";
          return (
            <div
              key={p.id}
              className="absolute"
              style={{ left: `${p.at * 100}%`, top: `${p.y * 100}%` }}
            >
              <m.span
                className="absolute -left-[5px] -top-[5px] block size-[10px]"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, ease: easeOutExpo, delay: delayFor(p.at) }}
              >
                {isNow && (
                  <span className="absolute -inset-1.5 animate-ping rounded-full bg-accent/40 motion-reduce:animate-none" />
                )}
                <span
                  className={`relative block size-full rounded-full ring-[3px] ring-paper ${
                    isNow ? "bg-accent" : "bg-ink"
                  }`}
                />
              </m.span>

              <m.span
                className={`absolute left-0 block w-max -translate-x-1/2 text-center sm:whitespace-nowrap ${
                  p.side === "above" ? "-translate-y-[calc(100%+14px)]" : "translate-y-[14px]"
                } ${p.mobile ? "" : "hidden sm:block"}`}
                initial={{ opacity: 0, y: p.side === "above" ? 6 : -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: easeOutExpo, delay: delayFor(p.at) + 0.1 }}
              >
                {p.date && <span className="label block text-muted">{p.date}</span>}
                <span
                  className={`block font-display text-[0.95rem] font-semibold leading-tight tracking-[-0.01em] ${
                    isNow ? "text-accent" : "text-ink"
                  }`}
                >
                  {p.title}
                </span>
              </m.span>
            </div>
          );
        })}

        <m.span
          className="label absolute right-[3%] top-2 text-accent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 3.2 }}
        >
          {next}
        </m.span>
      </div>
    </figure>
  );
}
