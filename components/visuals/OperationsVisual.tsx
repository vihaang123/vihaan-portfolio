import { ConceptTag, Mono, Sans, round } from "./primitives";

/**
 * Supercore: a conceptual operations and intelligence dashboard.
 * Area view with contours and a route, a signal list, a timeline and agent
 * status. Abstract on purpose: no real geography, places or figures.
 */
export const operationsSize = { width: 1000, height: 780 } as const;

/** Irregular closed contour, so the area view reads as terrain rather than circles. */
function contour(cx: number, cy: number, r: number, seed: number) {
  const points: string[] = [];
  const steps = 64;
  for (let i = 0; i < steps; i++) {
    const a = (i / steps) * Math.PI * 2;
    const wobble =
      1 +
      0.12 * Math.sin(a * 3 + seed) +
      0.07 * Math.sin(a * 5 + seed * 1.7) +
      0.035 * Math.sin(a * 9 + seed * 2.3);
    points.push(
      `${round(cx + Math.cos(a) * r * wobble * 1.18)} ${round(cy + Math.sin(a) * r * wobble * 0.86)}`,
    );
  }
  return `M${points.join(" L")} Z`;
}

const MAP = { x: 36, y: 96, w: 588, h: 520 } as const;
const markers: [number, number][] = [
  [236, 318],
  [418, 262],
  [470, 424],
  [296, 452],
  [364, 360],
];
const signals = [
  { level: "LOW", width: 0.52 },
  { level: "MED", width: 0.78 },
  { level: "HIGH", width: 0.4 },
  { level: "LOW", width: 0.64 },
  { level: "MED", width: 0.3 },
];
const bars = Array.from({ length: 40 }, (_, i) =>
  round(14 + Math.abs(Math.sin(i * 0.55) * 30) + ((i * 11) % 7) * 3),
);

export function OperationsVisual(props: { uid: string }) {
  void props;
  return (
    <>
      <rect width={1000} height={780} className="fill-ink" />
      {Array.from({ length: 21 }, (_, i) => (
        <line key={`v${i}`} x1={i * 50} y1={0} x2={i * 50} y2={780} className="stroke-paper" strokeOpacity={0.045} />
      ))}
      {Array.from({ length: 16 }, (_, i) => (
        <line key={`h${i}`} x1={0} y1={i * 50} x2={1000} y2={i * 50} className="stroke-paper" strokeOpacity={0.045} />
      ))}

      {/* Top bar */}
      <Mono x={36} y={42} size={14} className="fill-paper" opacity={0.65}>
        OPERATIONS / OVERVIEW
      </Mono>
      <ConceptTag x={866} y={22} dark />
      <line x1={0} y1={68} x2={1000} y2={68} className="stroke-paper" strokeOpacity={0.14} />

      {/* Area view */}
      <rect x={MAP.x} y={MAP.y} width={MAP.w} height={MAP.h} rx={12} className="fill-paper" fillOpacity={0.03} />
      <rect x={MAP.x} y={MAP.y} width={MAP.w} height={MAP.h} rx={12} fill="none" className="stroke-paper" strokeOpacity={0.16} />
      <Mono x={58} y={128} size={12.5} className="fill-paper" opacity={0.55}>
        AREA VIEW
      </Mono>
      {[34, 72, 110, 148, 186, 224].map((r, i) => (
        <path
          key={r}
          d={contour(330, 366, r, 1.3)}
          fill="none"
          className="stroke-paper"
          strokeOpacity={0.12 + i * 0.03}
        />
      ))}
      <line x1={330} y1={150} x2={330} y2={590} className="stroke-paper" strokeOpacity={0.12} strokeDasharray="3 7" />
      <line x1={80} y1={366} x2={580} y2={366} className="stroke-paper" strokeOpacity={0.12} strokeDasharray="3 7" />
      <polyline
        points={[markers[0], markers[4], markers[1], markers[2]].map((p) => p.join(",")).join(" ")}
        fill="none"
        className="stroke-accent-soft"
        strokeWidth={2}
        strokeDasharray="7 7"
        strokeLinejoin="round"
      />
      {markers.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={i === 1 ? 7 : 5} className={i === 1 ? "fill-accent-soft" : "fill-paper"} />
          {i === 1 && <circle cx={x} cy={y} r={20} fill="none" className="stroke-accent-soft" strokeOpacity={0.6} />}
          <Mono x={x + 14} y={y - 12} size={12} className="fill-paper" opacity={0.6}>
            {`A${i + 1}`}
          </Mono>
        </g>
      ))}
      <line x1={58} y1={590} x2={158} y2={590} className="stroke-paper" strokeOpacity={0.5} />
      <line x1={58} y1={584} x2={58} y2={596} className="stroke-paper" strokeOpacity={0.5} />
      <line x1={158} y1={584} x2={158} y2={596} className="stroke-paper" strokeOpacity={0.5} />
      <Mono x={170} y={595} size={11} className="fill-paper" opacity={0.5}>
        SCALE
      </Mono>

      {/* Signals */}
      <rect x={648} y={96} width={316} height={240} rx={12} className="fill-paper" fillOpacity={0.03} />
      <rect x={648} y={96} width={316} height={240} rx={12} fill="none" className="stroke-paper" strokeOpacity={0.16} />
      <Mono x={668} y={128} size={12.5} className="fill-paper" opacity={0.55}>
        SIGNALS
      </Mono>
      {signals.map((s, i) => {
        const y = 156 + i * 33;
        const high = s.level === "HIGH";
        return (
          <g key={i}>
            <rect
              x={668}
              y={y}
              width={52}
              height={22}
              rx={11}
              fill="none"
              className={high ? "stroke-accent-soft" : "stroke-paper"}
              strokeOpacity={high ? 1 : 0.3}
            />
            <Mono x={694} y={y + 15} size={10.5} anchor="middle" className={high ? "fill-accent-soft" : "fill-paper"} opacity={high ? 1 : 0.6}>
              {s.level}
            </Mono>
            <rect x={734} y={y + 9} width={206} height={4} rx={2} className="fill-paper" fillOpacity={0.12} />
            <rect x={734} y={y + 9} width={206 * s.width} height={4} rx={2} className={high ? "fill-accent-soft" : "fill-paper"} fillOpacity={high ? 1 : 0.55} />
          </g>
        );
      })}

      {/* Timeline */}
      <rect x={648} y={352} width={316} height={150} rx={12} className="fill-paper" fillOpacity={0.03} />
      <rect x={648} y={352} width={316} height={150} rx={12} fill="none" className="stroke-paper" strokeOpacity={0.16} />
      <Mono x={668} y={384} size={12.5} className="fill-paper" opacity={0.55}>
        TIMELINE
      </Mono>
      <line x1={668} y1={448} x2={944} y2={448} className="stroke-paper" strokeOpacity={0.35} />
      {Array.from({ length: 24 }, (_, i) => (
        <line key={i} x1={668 + i * 12} y1={448} x2={668 + i * 12} y2={i % 6 === 0 ? 438 : 443} className="stroke-paper" strokeOpacity={0.4} />
      ))}
      {[2, 8, 14, 19].map((i) => (
        <rect key={i} x={668 + i * 12 - 5} y={420} width={10} height={10} rx={2} className="fill-paper" fillOpacity={0.85} />
      ))}
      <line x1={668 + 16 * 12} y1={402} x2={668 + 16 * 12} y2={474} className="stroke-accent-soft" strokeWidth={1.5} />
      <rect x={668 + 16 * 12 - 5} y={398} width={10} height={10} rx={2} className="fill-accent-soft" />

      {/* Agents */}
      <rect x={648} y={518} width={316} height={98} rx={12} className="fill-paper" fillOpacity={0.03} />
      <rect x={648} y={518} width={316} height={98} rx={12} fill="none" className="stroke-paper" strokeOpacity={0.16} />
      <Mono x={668} y={550} size={12.5} className="fill-paper" opacity={0.55}>
        AGENTS
      </Mono>
      {["Intake", "Triage", "Report"].map((name, i) => (
        <g key={name}>
          <rect x={668 + i * 95} y={566} width={86} height={32} rx={16} fill="none" className="stroke-paper" strokeOpacity={0.3} />
          <circle cx={686 + i * 95} cy={582} r={4} className={i < 2 ? "fill-accent-soft" : "fill-paper"} fillOpacity={i < 2 ? 1 : 0.3} />
          <Sans x={698 + i * 95} y={588} size={13.5} className="fill-paper" opacity={0.85}>
            {name}
          </Sans>
        </g>
      ))}

      {/* Activity */}
      <rect x={36} y={640} width={928} height={104} rx={12} className="fill-paper" fillOpacity={0.03} />
      <rect x={36} y={640} width={928} height={104} rx={12} fill="none" className="stroke-paper" strokeOpacity={0.16} />
      <Mono x={58} y={668} size={12.5} className="fill-paper" opacity={0.55}>
        ACTIVITY
      </Mono>
      {bars.map((h, i) => (
        <rect
          key={i}
          x={58 + i * 22.4}
          y={730 - h}
          width={12}
          height={h}
          rx={2}
          className={i > 33 ? "fill-accent-soft" : "fill-paper"}
          fillOpacity={i > 33 ? 0.9 : 0.28}
        />
      ))}
    </>
  );
}
