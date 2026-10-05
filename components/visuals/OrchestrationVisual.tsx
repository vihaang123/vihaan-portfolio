import { bezier, ConceptTag, DotGrid, Mono, Sans } from "./primitives";

/**
 * Tekkloom: a conceptual AI agent orchestration workspace.
 * An orchestrator routes a task to four agents; a run log sits on the right.
 * Deliberately free of numbers, names and metrics.
 */
export const orchestrationSize = { width: 1200, height: 750 } as const;

const NODE = { w: 172, h: 84 } as const;

const agents = [
  { x: 268, y: 168, name: "Research", role: "gathers context", active: true, progress: 0.72 },
  { x: 652, y: 168, name: "Planner", role: "plans the work", active: true, progress: 0.5 },
  { x: 268, y: 508, name: "Builder", role: "runs the steps", active: false, progress: 0.34 },
  { x: 652, y: 508, name: "Reviewer", role: "checks the output", active: false, progress: 0.18 },
] as const;

type Pt = [number, number];
const hub = { x: 446, y: 378, w: 200, h: 84 } as const;

/** Each connector leaves the orchestrator and lands on the agent's nearest edge. */
const connectors: { d: string; mid: Pt }[] = [
  [[446, 420], [396, 420], [354, 350], [354, 252]],
  [[646, 420], [696, 420], [738, 350], [738, 252]],
  [[446, 420], [396, 420], [354, 490], [354, 508]],
  [[646, 420], [696, 420], [738, 490], [738, 508]],
].map(([a, b, c, d]) => ({
  d: `M${a[0]} ${a[1]} C${b[0]} ${b[1]}, ${c[0]} ${c[1]}, ${d[0]} ${d[1]}`,
  mid: bezier(a as Pt, b as Pt, c as Pt, d as Pt, 0.5),
}));

const nav = ["Agents", "Workflows", "Runs", "Tools", "Settings"];

const log = [
  ["plan.created", "planner"],
  ["task.assigned", "orchestrator"],
  ["agent.running", "research"],
  ["tool.called", "builder"],
  ["review.requested", "reviewer"],
  ["output.ready", "orchestrator"],
];

export function OrchestrationVisual({ uid }: { uid: string }) {
  return (
    <>
      <rect width={1200} height={750} className="fill-paper-deep" />

      {/* Window */}
      <rect x={48} y={48} width={1104} height={654} rx={16} className="fill-paper-raise stroke-line" />
      <line x1={48} y1={104} x2={1152} y2={104} className="stroke-line" />
      <Mono x={76} y={82} size={14}>
        tekkloom / orchestration
      </Mono>
      <ConceptTag x={1026} y={63} />

      {/* Sidebar */}
      <line x1={224} y1={104} x2={224} y2={702} className="stroke-line" />
      <rect x={60} y={124} width={152} height={38} rx={9} className="fill-paper-deep" />
      {nav.map((item, i) => (
        <g key={item}>
          <rect
            x={78}
            y={136 + i * 44}
            width={14}
            height={14}
            rx={4}
            className={i === 0 ? "fill-ink" : "fill-line"}
          />
          <Sans x={104} y={148 + i * 44} size={16} className={i === 0 ? "fill-ink" : "fill-muted"}>
            {item}
          </Sans>
        </g>
      ))}

      {/* Canvas */}
      <DotGrid id={`orch-dots-${uid}`} x={225} y={105} width={642} height={596} step={28} />

      {connectors.map((c, i) => (
        <g key={i}>
          <path d={c.d} fill="none" className="stroke-ink" strokeOpacity={0.4} strokeWidth={1.6} strokeDasharray="2 6" strokeLinecap="round" />
          <circle cx={c.mid[0]} cy={c.mid[1]} r={6} className="fill-accent" />
          <circle cx={c.mid[0]} cy={c.mid[1]} r={13} fill="none" className="stroke-accent" strokeOpacity={0.3} />
        </g>
      ))}

      {/* Orchestrator */}
      <rect x={hub.x} y={hub.y} width={hub.w} height={hub.h} rx={14} className="fill-ink" />
      <Sans x={hub.x + 22} y={hub.y + 38} size={22} className="fill-paper">
        Orchestrator
      </Sans>
      <Mono x={hub.x + 22} y={hub.y + 63} size={12.5} className="fill-accent-soft">
        routes every task
      </Mono>
      <circle cx={hub.x + hub.w - 24} cy={hub.y + 28} r={5} className="fill-accent-soft" />

      {/* Agents */}
      {agents.map((a) => (
        <g key={a.name}>
          <rect x={a.x} y={a.y} width={NODE.w} height={NODE.h} rx={12} className="fill-paper-raise stroke-line" />
          <Sans x={a.x + 20} y={a.y + 34} size={20}>
            {a.name}
          </Sans>
          <Mono x={a.x + 20} y={a.y + 55} size={12}>
            {a.role}
          </Mono>
          <circle
            cx={a.x + NODE.w - 24}
            cy={a.y + 28}
            r={5}
            className={a.active ? "fill-accent" : "fill-paper-raise stroke-muted"}
            strokeWidth={1.5}
          />
          <rect x={a.x + 20} y={a.y + 68} width={NODE.w - 40} height={4} rx={2} className="fill-line" />
          <rect
            x={a.x + 20}
            y={a.y + 68}
            width={(NODE.w - 40) * a.progress}
            height={4}
            rx={2}
            className={a.active ? "fill-accent" : "fill-ink"}
            fillOpacity={a.active ? 1 : 0.35}
          />
        </g>
      ))}

      {/* Prompt bar */}
      <rect x={268} y={614} width={556} height={56} rx={14} className="fill-paper-raise stroke-line" />
      <Mono x={292} y={647} size={15}>
        Describe a workflow to automate
      </Mono>
      <rect x={772} y={622} width={44} height={40} rx={10} className="fill-accent" />
      <path d="M788 642h12m-5-5 5 5-5 5" fill="none" stroke="#ffffff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />

      {/* Run log */}
      <line x1={868} y1={104} x2={868} y2={702} className="stroke-line" />
      <Mono x={892} y={138} size={12.5}>
        RUN LOG
      </Mono>
      <line x1={892} y1={156} x2={1128} y2={156} className="stroke-line" />
      {log.map(([event, source], i) => {
        const y = 196 + i * 78;
        const last = i === log.length - 1;
        return (
          <g key={event}>
            <circle cx={900} cy={y - 5} r={5} className={last ? "fill-accent" : "fill-ink"} fillOpacity={last ? 1 : 0.28} />
            <Mono x={920} y={y} size={14} className="fill-ink">
              {event}
            </Mono>
            <Mono x={920} y={y + 22} size={12}>
              {source}
            </Mono>
            {!last && <line x1={900} y1={y + 4} x2={900} y2={y + 62} className="stroke-line" />}
          </g>
        );
      })}
    </>
  );
}
