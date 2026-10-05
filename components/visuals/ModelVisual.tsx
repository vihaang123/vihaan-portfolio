import { ConceptTag, DotGrid, Mono, round, Sans, seeded } from "./primitives";

/**
 * PredictUp: a conceptual model-evaluation view.
 * Predicted vs actual with an uncertainty band, feature importance,
 * residuals, and a training curve. Generic labels, no accuracy figures.
 */
export const modelSize = { width: 1000, height: 780 } as const;

const PLOT = { x: 72, y: 142, w: 520, h: 448 } as const;
const x0 = 112;
const yBase = 560;
const slope = 0.72;
const lineY = (x: number) => round(yBase - (x - x0) * slope);
const band = (x: number) => 20 + (x - x0) * 0.1;

const rand = seeded(11);
const points = Array.from({ length: 64 }, (_, i) => {
  const x = round(x0 + 14 + rand() * (PLOT.x + PLOT.w - x0 - 40));
  const y = round(Math.min(yBase - 6, Math.max(PLOT.y + 22, lineY(x) + (rand() - 0.5) * (46 + (x - x0) * 0.14))));
  return { i, x, y, holdout: x > 430 };
});

const importance = [0.92, 0.74, 0.6, 0.41, 0.28, 0.16];
const histogram = Array.from({ length: 15 }, (_, i) => round(10 + 118 * Math.exp(-Math.pow((i - 7) / 3.1, 2))));

const curve = (decay: number, floor: number, wobble: number) =>
  Array.from({ length: 40 }, (_, i) => {
    const t = i / 39;
    const y = 700 - (floor + (1 - floor) * Math.exp(-decay * t)) * 54 + Math.sin(i * 1.3) * wobble;
    return `${round(100 + t * 800)},${round(y)}`;
  }).join(" ");

export function ModelVisual({ uid }: { uid: string }) {
  const upper = [x0, 300, 500, 580].map((x) => `${x},${round(lineY(x) - band(x))}`);
  const lower = [580, 500, 300, x0].map((x) => `${x},${round(lineY(x) + band(x))}`);

  return (
    <>
      <rect width={1000} height={780} className="fill-paper-deep" />
      <rect x={40} y={40} width={920} height={700} rx={16} className="fill-paper-raise stroke-line" />

      {/* Header */}
      <Sans x={72} y={90} size={22}>
        Model overview
      </Sans>
      <ConceptTag x={826} y={70} />
      <line x1={40} y1={118} x2={960} y2={118} className="stroke-line" />

      {/* Predicted vs actual */}
      <rect x={PLOT.x} y={PLOT.y} width={PLOT.w} height={PLOT.h} rx={12} className="fill-paper-raise stroke-line" />
      <Mono x={PLOT.x + 20} y={PLOT.y + 30} size={12}>
        PREDICTED VS ACTUAL
      </Mono>
      <DotGrid id={`model-dots-${uid}`} x={PLOT.x + 1} y={PLOT.y + 44} width={PLOT.w - 2} height={PLOT.h - 45} step={32} />
      <polygon points={[...upper, ...lower].join(" ")} className="fill-accent" fillOpacity={0.1} />
      <line x1={x0} y1={PLOT.y + 52} x2={x0} y2={yBase} className="stroke-ink" strokeOpacity={0.5} />
      <line x1={x0} y1={yBase} x2={PLOT.x + PLOT.w - 24} y2={yBase} className="stroke-ink" strokeOpacity={0.5} />
      <line x1={430} y1={PLOT.y + 52} x2={430} y2={yBase} className="stroke-ink" strokeOpacity={0.28} strokeDasharray="4 6" />
      <Mono x={440} y={PLOT.y + 72} size={11}>
        HOLDOUT
      </Mono>
      {points.map((p) =>
        p.holdout ? (
          <circle key={p.i} cx={p.x} cy={p.y} r={4.6} fill="none" className="stroke-accent" strokeWidth={2} />
        ) : (
          <circle key={p.i} cx={p.x} cy={p.y} r={4} className="fill-ink" fillOpacity={0.72} />
        ),
      )}
      <line x1={x0} y1={lineY(x0)} x2={580} y2={lineY(580)} className="stroke-accent" strokeWidth={3.2} strokeLinecap="round" />

      {/* Feature importance */}
      <rect x={616} y={142} width={320} height={226} rx={12} className="fill-paper-raise stroke-line" />
      <Mono x={636} y={172} size={12}>
        FEATURE IMPORTANCE
      </Mono>
      {importance.map((v, i) => (
        <g key={i}>
          <Mono x={636} y={208 + i * 25} size={11.5}>
            {`feature_0${i + 1}`}
          </Mono>
          <rect x={740} y={197 + i * 25} width={176} height={11} rx={5.5} className="fill-ink" fillOpacity={0.08} />
          <rect x={740} y={197 + i * 25} width={176 * v} height={11} rx={5.5} className={i === 0 ? "fill-accent" : "fill-ink"} fillOpacity={i === 0 ? 1 : 0.55} />
        </g>
      ))}

      {/* Residuals */}
      <rect x={616} y={384} width={320} height={206} rx={12} className="fill-paper-raise stroke-line" />
      <Mono x={636} y={414} size={12}>
        RESIDUALS
      </Mono>
      {histogram.map((h, i) => (
        <rect key={i} x={636 + i * 19.4} y={568 - h} width={14} height={h} rx={2.5} className={i === 7 ? "fill-accent" : "fill-ink"} fillOpacity={i === 7 ? 1 : 0.5} />
      ))}
      <line x1={636 + 7 * 19.4 + 7} y1={430} x2={636 + 7 * 19.4 + 7} y2={572} className="stroke-ink" strokeOpacity={0.3} strokeDasharray="3 5" />

      {/* Training curve */}
      <rect x={72} y={610} width={864} height={104} rx={12} className="fill-paper-raise stroke-line" />
      <Mono x={92} y={638} size={12}>
        TRAINING
      </Mono>
      <polyline points={curve(4.2, 0.12, 1.2)} fill="none" className="stroke-ink" strokeWidth={2.2} strokeLinejoin="round" strokeOpacity={0.75} />
      <polyline points={curve(3.4, 0.2, 1.6)} fill="none" className="stroke-accent" strokeWidth={2.2} strokeDasharray="6 6" strokeLinejoin="round" />
    </>
  );
}
