import { ConceptTag, DotGrid, Mono, round, Sans, seeded } from "./primitives";

/**
 * Crime Forecasting: a conceptual district-forecast view.
 * Actual vs forecast lines for the models compared in the project, the top
 * categories for a district, and a hotspot grid. Generic labels and shapes
 * only, no real figures.
 */
export const forecastSize = { width: 1000, height: 700 } as const;

const PLOT = { x: 72, y: 142, w: 560, h: 378 } as const;
const X0 = 112;
const BASE = 436;
const X_SPLIT = 400;
const X_END = 600;
const level = (i: number, amp = 0.13, phase = 0) =>
  0.42 + 0.0045 * i + amp * Math.sin(i * 0.52 + phase);
const toY = (v: number) => round(BASE - v * 232);

const rand = seeded(23);
const actual = Array.from({ length: 37 }, (_, i) => {
  const v = level(i) + (rand() - 0.5) * 0.05;
  return `${X0 + i * 8},${toY(v)}`;
}).join(" ");

const forecast = (amp: number, phase: number, wobble: number) => {
  const r = seeded(Math.round(amp * 100 + phase * 10 + 7));
  return Array.from({ length: 17 }, (_, j) => {
    const i = 36 + (j * 16) / 16;
    const v = level(i, amp, phase) + (r() - 0.5) * wobble;
    return `${round(X_SPLIT + j * ((X_END - X_SPLIT) / 16))},${toY(v)}`;
  }).join(" ");
};

const lstm = `${X_SPLIT},${toY(level(36) + (rand() - 0.5) * 0.02)} ${forecast(0.13, 0, 0.03)}`;
const prophet = forecast(0.09, 0.4, 0.012);
const neural = forecast(0.11, -0.3, 0.02);

/* Hotspot grid: a few soft peaks plus a little texture. */
const COLS = 14;
const ROWS = 6;
const peaks = [
  { c: 3, r: 2, s: 2.1 },
  { c: 9, r: 3, s: 2.6 },
  { c: 12, r: 1, s: 1.6 },
];
const gridRand = seeded(5);
const heat = Array.from({ length: COLS * ROWS }, (_, n) => {
  const c = n % COLS;
  const r = Math.floor(n / COLS);
  const v = peaks.reduce(
    (m, p) => Math.max(m, Math.exp(-((c - p.c) ** 2 + (r - p.r) ** 2) / (p.s * p.s))),
    0,
  );
  return { c, r, v: Math.min(1, v + gridRand() * 0.12) };
});

const categories = [
  { label: "CATEGORY A", v: 0.92 },
  { label: "CATEGORY B", v: 0.64 },
  { label: "CATEGORY C", v: 0.4 },
];

const models = [
  { name: "LSTM", accent: true, amp: 0.13, phase: 0 },
  { name: "PROPHET", accent: false, amp: 0.09, phase: 0.4 },
  { name: "NEURALPROPHET", accent: false, amp: 0.11, phase: -0.3 },
  { name: "REGRESSION", accent: false, amp: 0.0, phase: 0 },
];
const spark = (amp: number, phase: number, w: number, h: number) =>
  Array.from({ length: 24 }, (_, i) => {
    const v = 0.5 + 0.4 * (0.0045 * i * 6) + amp * 2.2 * Math.sin(i * 0.52 + phase);
    return `${round((i / 23) * w)},${round(h - Math.min(0.95, Math.max(0.08, v)) * h)}`;
  }).join(" ");

export function ForecastVisual({ uid }: { uid: string }) {
  return (
    <>
      <rect width={1000} height={700} className="fill-paper-deep" />
      <rect x={40} y={40} width={920} height={620} rx={16} className="fill-paper-raise stroke-line" />

      {/* Header */}
      <Sans x={72} y={90} size={22}>
        District forecast
      </Sans>
      <Mono x={300} y={89} size={12}>
        INDIA · DISTRICT-WISE
      </Mono>
      <ConceptTag x={826} y={70} />
      <line x1={40} y1={118} x2={960} y2={118} className="stroke-line" />

      {/* Actual vs forecast */}
      <rect x={PLOT.x} y={PLOT.y} width={PLOT.w} height={PLOT.h} rx={12} className="fill-paper-raise stroke-line" />
      <Mono x={PLOT.x + 20} y={PLOT.y + 30} size={12}>
        ACTUAL VS FORECAST
      </Mono>
      <DotGrid id={`forecast-dots-${uid}`} x={PLOT.x + 1} y={PLOT.y + 44} width={PLOT.w - 2} height={BASE - PLOT.y - 44} step={32} />
      <rect x={X_SPLIT} y={PLOT.y + 52} width={X_END - X_SPLIT + 24} height={BASE - PLOT.y - 52} className="fill-ink" fillOpacity={0.045} />
      <line x1={X_SPLIT} y1={PLOT.y + 52} x2={X_SPLIT} y2={BASE} className="stroke-ink" strokeOpacity={0.3} strokeDasharray="4 6" />
      <Mono x={X_SPLIT + 12} y={PLOT.y + 72} size={11}>
        FORECAST
      </Mono>
      <line x1={X0} y1={PLOT.y + 52} x2={X0} y2={BASE} className="stroke-ink" strokeOpacity={0.5} />
      <line x1={X0} y1={BASE} x2={PLOT.x + PLOT.w - 24} y2={BASE} className="stroke-ink" strokeOpacity={0.5} />
      <polyline points={actual} fill="none" className="stroke-ink" strokeWidth={2.4} strokeLinejoin="round" strokeLinecap="round" strokeOpacity={0.85} />
      <polyline points={neural} fill="none" className="stroke-ink" strokeWidth={2} strokeOpacity={0.4} strokeDasharray="2 6" strokeLinecap="round" />
      <polyline points={prophet} fill="none" className="stroke-ink" strokeWidth={2} strokeOpacity={0.55} strokeDasharray="7 6" strokeLinejoin="round" />
      <polyline points={lstm} fill="none" className="stroke-accent" strokeWidth={3.2} strokeLinejoin="round" strokeLinecap="round" />

      {/* Legend */}
      <g>
        <line x1={92} y1={474} x2={116} y2={474} className="stroke-ink" strokeWidth={2.4} strokeOpacity={0.85} />
        <Mono x={124} y={478} size={11}>
          ACTUAL
        </Mono>
        <line x1={190} y1={474} x2={214} y2={474} className="stroke-accent" strokeWidth={3.2} />
        <Mono x={222} y={478} size={11}>
          LSTM
        </Mono>
        <line x1={268} y1={474} x2={292} y2={474} className="stroke-ink" strokeWidth={2} strokeOpacity={0.55} strokeDasharray="7 5" />
        <Mono x={300} y={478} size={11}>
          PROPHET
        </Mono>
        <line x1={376} y1={474} x2={400} y2={474} className="stroke-ink" strokeWidth={2} strokeOpacity={0.4} strokeDasharray="2 5" strokeLinecap="round" />
        <Mono x={408} y={478} size={11}>
          NEURALPROPHET
        </Mono>
      </g>

      {/* Top categories */}
      <rect x={656} y={142} width={280} height={170} rx={12} className="fill-paper-raise stroke-line" />
      <Mono x={676} y={172} size={12}>
        TOP 3 CATEGORIES
      </Mono>
      {categories.map((c, i) => (
        <g key={c.label}>
          <Mono x={676} y={212 + i * 34} size={11}>
            {c.label}
          </Mono>
          <rect x={676} y={220 + i * 34} width={240} height={10} rx={5} className="fill-ink" fillOpacity={0.08} />
          <rect x={676} y={220 + i * 34} width={240 * c.v} height={10} rx={5} className={i === 0 ? "fill-accent" : "fill-ink"} fillOpacity={i === 0 ? 1 : 0.55} />
        </g>
      ))}

      {/* Hotspots */}
      <rect x={656} y={328} width={280} height={192} rx={12} className="fill-paper-raise stroke-line" />
      <Mono x={676} y={358} size={12}>
        HOTSPOTS
      </Mono>
      {heat.map((cell) => (
        <rect
          key={`${cell.c}-${cell.r}`}
          x={676 + cell.c * 17.4}
          y={376 + cell.r * 17.4}
          width={13.6}
          height={13.6}
          rx={3}
          className="fill-accent"
          fillOpacity={round(0.07 + cell.v * 0.93)}
        />
      ))}
      <Mono x={676} y={504} size={10.5}>
        LOW
      </Mono>
      <Mono x={916} y={504} size={10.5} anchor="end">
        HIGH
      </Mono>

      {/* Model comparison */}
      {models.map((model, i) => {
        const x = 72 + i * (207 + 12);
        return (
          <g key={model.name}>
            <rect x={x} y={540} width={207} height={100} rx={12} className={`fill-paper-raise ${model.accent ? "stroke-accent" : "stroke-line"}`} />
            <Mono x={x + 18} y={568} size={11.5}>
              {model.name}
            </Mono>
            <polyline
              points={spark(model.amp, model.phase, 171, 38)}
              transform={`translate(${x + 18} 584)`}
              fill="none"
              className={model.accent ? "stroke-accent" : "stroke-ink"}
              strokeWidth={model.accent ? 2.6 : 2}
              strokeOpacity={model.accent ? 1 : 0.5}
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </g>
        );
      })}
    </>
  );
}
