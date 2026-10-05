import type { ReactNode } from "react";
import { ConceptTag, DotGrid, Mono, round, Sans, seeded } from "./primitives";

/**
 * Concept illustrations for the newer projects. Each one is a small drawing
 * of the idea (an agent team, a gate, a pool of capital), not a screenshot,
 * and carries the "Concept" tag. They hold no figures, names or results.
 */
export const posterSize = { width: 1000, height: 700 } as const;

function Frame({ uid, children }: { uid: string; children: ReactNode }) {
  return (
    <>
      <rect width={1000} height={700} className="fill-paper-deep" />
      <DotGrid id={`poster-dots-${uid}`} x={0} y={0} width={1000} height={700} step={32} opacity={0.1} />
      {children}
      <ConceptTag x={842} y={48} />
    </>
  );
}

const polar = (cx: number, cy: number, r: number, deg: number): [number, number] => {
  const a = (deg * Math.PI) / 180;
  return [round(cx + r * Math.cos(a)), round(cy + r * Math.sin(a))];
};

/* ----------------------------------------------------------------------------
 * AI Company OS: an orchestrator, five agents and a shared memory
 * -------------------------------------------------------------------------- */
const team = [
  { name: "CEO", x: 500, y: 118 },
  { name: "CTO", x: 822, y: 248 },
  { name: "Growth", x: 770, y: 468 },
  { name: "Finance", x: 230, y: 468 },
  { name: "Research", x: 178, y: 248 },
] as const;

export function AgentsVisual({ uid }: { uid: string }) {
  const rand = seeded(5);
  return (
    <Frame uid={uid}>
      {team.map((a) => (
        <line key={a.name} x1={500} y1={336} x2={a.x} y2={a.y} className="stroke-ink" strokeOpacity={0.3} strokeDasharray="5 8" />
      ))}
      <line x1={500} y1={384} x2={500} y2={592} className="stroke-accent" strokeWidth={2.4} />
      <circle cx={500} cy={592} r={6} className="fill-accent" />

      {team.map((a) => (
        <g key={a.name}>
          <rect x={a.x - 82} y={a.y - 32} width={164} height={64} rx={16} className="fill-paper-raise stroke-line" />
          <circle cx={a.x - 54} cy={a.y} r={7} className="fill-accent" />
          <Sans x={a.x - 36} y={a.y + 7} size={21}>
            {a.name}
          </Sans>
        </g>
      ))}

      <rect x={380} y={288} width={240} height={96} rx={22} className="fill-ink" />
      <Sans x={500} y={348} size={27} anchor="middle" className="fill-paper">
        Orchestrator
      </Sans>

      <rect x={190} y={592} width={620} height={58} rx={29} className="fill-paper-raise stroke-line" />
      <Mono x={226} y={626} size={15}>
        Company memory
      </Mono>
      {Array.from({ length: 16 }, (_, i) => (
        <circle key={i} cx={520 + i * 17} cy={621} r={4.2} className="fill-ink" fillOpacity={round(0.15 + rand() * 0.6)} />
      ))}
    </Frame>
  );
}

/* ----------------------------------------------------------------------------
 * SalesBuddy: an execution layer that sits above the CRM
 * -------------------------------------------------------------------------- */
export function SalesVisual({ uid }: { uid: string }) {
  const rand = seeded(9);
  return (
    <Frame uid={uid}>
      <rect x={150} y={344} width={700} height={290} rx={24} className="fill-paper-raise stroke-line" />
      <Mono x={188} y={388} size={15}>
        Your CRM
      </Mono>
      {Array.from({ length: 5 }, (_, i) => (
        <g key={i}>
          <circle cx={200} cy={436 + i * 38} r={11} className="fill-ink" fillOpacity={0.14} />
          <rect x={226} y={431 + i * 38} width={round(170 + rand() * 170)} height={10} rx={5} className="fill-ink" fillOpacity={0.12} />
          <rect x={740} y={431 + i * 38} width={76} height={10} rx={5} className="fill-ink" fillOpacity={0.1} />
        </g>
      ))}

      {[330, 500, 670].map((x) => (
        <line key={x} x1={x} y1={364} x2={x} y2={420} className="stroke-accent" strokeWidth={2} strokeDasharray="4 6" />
      ))}

      <rect x={248} y={128} width={540} height={250} rx={24} className="fill-ink" fillOpacity={0.1} />
      <rect x={228} y={108} width={540} height={250} rx={24} className="fill-ink" />
      <Mono x={264} y={150} size={15} className="fill-paper" opacity={0.65}>
        Execution layer
      </Mono>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={264} y={178 + i * 52} width={468} height={40} rx={20} className={i === 2 ? "fill-accent" : "fill-paper"} fillOpacity={i === 2 ? 1 : 0.09} />
          <circle cx={288} cy={198 + i * 52} r={8} className={i === 2 ? "fill-paper" : "fill-accent-soft"} />
          <rect x={312} y={194 + i * 52} width={[220, 168, 262][i]} height={8} rx={4} className="fill-paper" fillOpacity={i === 2 ? 0.9 : 0.5} />
        </g>
      ))}
    </Frame>
  );
}

/* ----------------------------------------------------------------------------
 * OnCue: a ring that closes on a commitment
 * -------------------------------------------------------------------------- */
export function CommitVisual({ uid }: { uid: string }) {
  const c = { x: 500, y: 372 };
  const R = 170;
  const circ = 2 * Math.PI * R;
  const done = 0.68;
  const [mx, my] = polar(c.x, c.y, R, -90 + done * 360);
  return (
    <Frame uid={uid}>
      {Array.from({ length: 60 }, (_, i) => {
        const [x1, y1] = polar(c.x, c.y, i % 5 === 0 ? 206 : 214, i * 6);
        const [x2, y2] = polar(c.x, c.y, 226, i * 6);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} className="stroke-ink" strokeOpacity={i % 5 === 0 ? 0.5 : 0.22} />;
      })}
      <circle cx={c.x} cy={c.y} r={R} fill="none" className="stroke-ink" strokeOpacity={0.1} strokeWidth={26} />
      <circle
        cx={c.x}
        cy={c.y}
        r={R}
        fill="none"
        className="stroke-accent"
        strokeWidth={26}
        strokeLinecap="round"
        strokeDasharray={`${round(circ * done)} ${round(circ)}`}
        transform={`rotate(-90 ${c.x} ${c.y})`}
      />
      <circle cx={mx} cy={my} r={20} className="fill-ink stroke-paper-deep" strokeWidth={5} />
      <Sans x={c.x} y={c.y + 20} size={58} anchor="middle">
        On cue
      </Sans>

      <rect x={56} y={236} width={236} height={52} rx={26} className="fill-paper-raise stroke-line" />
      <circle cx={86} cy={262} r={9} fill="none" className="stroke-ink" strokeOpacity={0.5} strokeWidth={2} />
      <Mono x={108} y={267} size={14}>
        Promise made
      </Mono>
      <rect x={708} y={470} width={236} height={52} rx={26} className="fill-paper-raise stroke-line" />
      <circle cx={738} cy={496} r={9} className="fill-accent" />
      <Mono x={760} y={501} size={14}>
        Promise kept
      </Mono>
    </Frame>
  );
}

/* ----------------------------------------------------------------------------
 * Tekkloom Tools: a library of small tools
 * -------------------------------------------------------------------------- */
const tools = ["Image", "PDF", "OCR", "Data", "AI", "Blog"] as const;

function Glyph({ kind }: { kind: (typeof tools)[number] }) {
  const ink = "stroke-ink";
  switch (kind) {
    case "Image":
      return (
        <g fill="none" strokeWidth={3} strokeLinejoin="round">
          <rect x={0} y={4} width={68} height={52} rx={9} className={ink} />
          <circle cx={48} cy={20} r={6} className="fill-accent stroke-none" />
          <polyline points="6,50 26,28 40,42 50,34 62,48" className={ink} />
        </g>
      );
    case "PDF":
      return (
        <g fill="none" strokeWidth={3} strokeLinejoin="round">
          <path d="M8 2h34l16 16v40H8z" className={ink} />
          <path d="M42 2v16h16" className={ink} />
          <line x1={18} y1={34} x2={48} y2={34} className="stroke-accent" />
          <line x1={18} y1={44} x2={40} y2={44} className={ink} strokeOpacity={0.5} />
        </g>
      );
    case "OCR":
      return (
        <g fill="none" strokeWidth={3} strokeLinecap="round">
          <path d="M2 16V4h12M54 4h12v12M66 44v12H54M14 56H2V44" className={ink} />
          <line x1={16} y1={22} x2={52} y2={22} className="stroke-accent" />
          <line x1={16} y1={32} x2={46} y2={32} className={ink} strokeOpacity={0.5} />
          <line x1={16} y1={42} x2={50} y2={42} className={ink} strokeOpacity={0.5} />
        </g>
      );
    case "Data":
      return (
        <g>
          {[22, 38, 28, 52].map((h, i) => (
            <rect key={i} x={i * 17} y={56 - h} width={11} height={h} rx={3} className={i === 3 ? "fill-accent" : "fill-ink"} fillOpacity={i === 3 ? 1 : 0.7} />
          ))}
        </g>
      );
    case "AI":
      return (
        <g>
          <path d="M30 2c3 16 8 22 24 26-16 4-21 10-24 26-3-16-8-22-24-26 16-4 21-10 24-26z" className="fill-accent" />
          <path d="M56 36c1.4 6 3.2 8 9 9.6-5.8 1.4-7.6 3.6-9 9.4-1.4-5.8-3.2-8-9-9.4 5.8-1.6 7.6-3.6 9-9.6z" className="fill-ink" />
        </g>
      );
    default:
      return (
        <g>
          <rect x={0} y={6} width={46} height={10} rx={5} className="fill-ink" />
          {[0, 1, 2].map((i) => (
            <rect key={i} x={0} y={26 + i * 12} width={[68, 60, 40][i]} height={6} rx={3} className="fill-ink" fillOpacity={0.3} />
          ))}
        </g>
      );
  }
}

export function ToolsVisual({ uid }: { uid: string }) {
  return (
    <Frame uid={uid}>
      {tools.map((name, i) => {
        const x = 83 + (i % 3) * 286;
        const y = 150 + Math.floor(i / 3) * 224;
        return (
          <g key={name}>
            <rect x={x} y={y} width={262} height={200} rx={22} className="fill-paper-raise stroke-line" />
            <g transform={`translate(${x + 28} ${y + 30})`}>
              <Glyph kind={name} />
            </g>
            <Sans x={x + 28} y={y + 164} size={26}>
              {name}
            </Sans>
          </g>
        );
      })}
    </Frame>
  );
}

/* ----------------------------------------------------------------------------
 * Multi-Agent RL for Finance: four assets sharing one pool over time
 * -------------------------------------------------------------------------- */
const bands = [
  { name: "Equity", base: 0.34, amp: 0.2, f: 6.2, ph: 0.4, fill: "fill-accent", op: 0.92 },
  { name: "Bonds", base: 0.26, amp: 0.12, f: 5.1, ph: 2.1, fill: "fill-ink", op: 0.55 },
  { name: "Gold", base: 0.2, amp: 0.1, f: 7.3, ph: 4.0, fill: "fill-ink", op: 0.3 },
  { name: "Cash", base: 0.2, amp: 0.08, f: 4.4, ph: 1.2, fill: "fill-ink", op: 0.12 },
] as const;

export function AllocationVisual({ uid }: { uid: string }) {
  const N = 48;
  const X0 = 112;
  const W = 540;
  const Y0 = 196;
  const H = 332;
  const shares = Array.from({ length: N + 1 }, (_, i) => {
    const t = i / N;
    const raw = bands.map((b) => b.base + b.amp * Math.sin(b.f * t + b.ph));
    const sum = raw.reduce((a, v) => a + v, 0);
    return raw.map((v) => v / sum);
  });
  /* Stack from the top: equity first, then bonds, gold, cash. */
  const edge = (layer: number, i: number) =>
    round(Y0 + H * shares[i].slice(0, layer).reduce((a, v) => a + v, 0));
  const polygon = (layer: number) => {
    const top = shares.map((_, i) => `${round(X0 + (i / N) * W)},${edge(layer, i)}`);
    const bottom = shares.map((_, i) => `${round(X0 + (i / N) * W)},${edge(layer + 1, i)}`).reverse();
    return [...top, ...bottom].join(" ");
  };

  return (
    <Frame uid={uid}>
      <rect x={60} y={96} width={880} height={534} rx={22} className="fill-paper-raise stroke-line" />
      <Mono x={112} y={142} size={15}>
        One pool of capital, shared out over time
      </Mono>
      {bands.map((b, i) => (
        <polygon key={b.name} points={polygon(i)} className={b.fill} fillOpacity={b.op} />
      ))}
      {[0.3, 0.62].map((t) => (
        <line key={t} x1={X0 + t * W} y1={Y0 - 12} x2={X0 + t * W} y2={Y0 + H} className="stroke-ink" strokeOpacity={0.55} strokeDasharray="4 6" />
      ))}
      {["regime 1", "regime 2", "regime 3"].map((label, i) => (
        <Mono key={label} x={[X0 + 8, X0 + 0.3 * W + 8, X0 + 0.62 * W + 8][i]} y={Y0 - 22} size={12.5}>
          {label}
        </Mono>
      ))}

      {bands.map((b, i) => (
        <g key={b.name}>
          <rect x={724} y={188 + i * 52} width={30} height={30} rx={8} className={b.fill} fillOpacity={b.op} />
          <Sans x={768} y={211 + i * 52} size={22}>
            {b.name}
          </Sans>
        </g>
      ))}
      <line x1={724} y1={420} x2={900} y2={420} className="stroke-line" />
      <Mono x={724} y={452} size={13}>
        Four agents
      </Mono>
      {["Growth", "Conservative", "Balanced", "Risk / Liquidity"].map((name, i) => (
        <g key={name}>
          <circle cx={732} cy={486 + i * 30} r={6} className="fill-accent" />
          <Mono x={750} y={491 + i * 30} size={14} className="fill-ink">
            {name}
          </Mono>
        </g>
      ))}
    </Frame>
  );
}

/* ----------------------------------------------------------------------------
 * Nifty 50 Sector Attribution: a price path split into hidden states
 * -------------------------------------------------------------------------- */
const REGIME = { X0: 112, W: 540, Y0: 160, H: 250 } as const;

/** A seeded random walk, built once at module load so rendering stays pure. */
const regimePath = (() => {
  const rand = seeded(23);
  const N = 90;
  let v = 0.5;
  const points: (readonly [number, number])[] = [];
  for (let i = 0; i <= N; i++) {
    v = Math.min(0.95, Math.max(0.08, v + (rand() - 0.46) * 0.075));
    points.push([round(REGIME.X0 + (i / N) * REGIME.W), round(REGIME.Y0 + REGIME.H * (1 - v))]);
  }
  return points;
})();

export function RegimesVisual({ uid }: { uid: string }) {
  const { X0, W, Y0, H } = REGIME;
  const path = regimePath;
  const states = [
    { from: 0, to: 0.26, label: "State 1", fill: "fill-accent", op: 0.1, solid: 0.5 },
    { from: 0.26, to: 0.58, label: "State 2", fill: "fill-ink", op: 0.07, solid: 0.22 },
    { from: 0.58, to: 0.8, label: "State 1", fill: "fill-accent", op: 0.1, solid: 0.5 },
    { from: 0.8, to: 1, label: "State 3", fill: "fill-accent", op: 0.22, solid: 1 },
  ] as const;
  const sectors = [0.9, 0.7, 0.58, 0.46, 0.34, 0.22];

  return (
    <Frame uid={uid}>
      <rect x={60} y={96} width={880} height={534} rx={22} className="fill-paper-raise stroke-line" />
      <Mono x={112} y={142} size={15}>
        Index path, split into hidden states
      </Mono>
      {states.map((s, i) => (
        <rect key={i} x={X0 + s.from * W} y={Y0} width={(s.to - s.from) * W} height={H} className={s.fill} fillOpacity={s.op} />
      ))}
      <polyline points={path.map(([x, y]) => `${x},${y}`).join(" ")} fill="none" className="stroke-ink" strokeWidth={2.4} strokeLinejoin="round" />
      {states.map((s, i) => (
        <g key={`strip-${i}`}>
          <rect x={X0 + s.from * W + 2} y={Y0 + H + 18} width={(s.to - s.from) * W - 4} height={34} rx={9} className={s.fill} fillOpacity={s.solid} />
          <Mono x={X0 + s.from * W + 14} y={Y0 + H + 40} size={12.5} className={s.solid >= 0.5 ? "fill-paper" : "fill-ink"}>
            {s.label}
          </Mono>
        </g>
      ))}

      {[0, 1, 2].map((i) => {
        const [x, y] = [[168, 540], [290, 580], [412, 540]][i];
        return <circle key={i} cx={x} cy={y} r={20} fill="none" className="stroke-ink" strokeOpacity={0.6} strokeWidth={2.2} />;
      })}
      {[
        [188, 545, 270, 575],
        [310, 575, 392, 545],
        [188, 538, 392, 538],
      ].map(([x1, y1, x2, y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} className="stroke-accent" strokeWidth={2} strokeDasharray="4 5" />
      ))}
      <Mono x={470} y={562} size={13}>
        Moves between states
      </Mono>

      <Mono x={724} y={188} size={13}>
        Sector contribution
      </Mono>
      {sectors.map((len, i) => (
        <g key={i}>
          <Mono x={724} y={232 + i * 54} size={12.5}>
            {`Sector ${i + 1}`}
          </Mono>
          <rect x={724} y={242 + i * 54} width={192} height={12} rx={6} className="fill-ink" fillOpacity={0.08} />
          <rect x={724} y={242 + i * 54} width={round(192 * len)} height={12} rx={6} className={i === 0 ? "fill-accent" : "fill-ink"} fillOpacity={i === 0 ? 1 : 0.5} />
        </g>
      ))}
    </Frame>
  );
}

/* ----------------------------------------------------------------------------
 * AgentGate: an agent, a gate with four controls, the tools behind it
 * -------------------------------------------------------------------------- */
const controls = ["Permissions", "Approval", "Redaction", "Audit"] as const;
const behind = ["Database", "Email", "Payments"] as const;

export function GateVisual({ uid }: { uid: string }) {
  const rand = seeded(31);
  const lanes = [296, 342, 388];
  return (
    <Frame uid={uid}>
      <rect x={64} y={284} width={156} height={110} rx={20} className="fill-ink" />
      <Sans x={142} y={348} size={26} anchor="middle" className="fill-paper">
        Agent
      </Sans>

      <line x1={220} y1={lanes[0]} x2={780} y2={214} className="stroke-accent" strokeWidth={2.4} />
      <line x1={220} y1={lanes[1]} x2={780} y2={346} className="stroke-ink" strokeOpacity={0.55} strokeWidth={2} strokeDasharray="6 6" />
      <line x1={220} y1={lanes[2]} x2={414} y2={lanes[2]} className="stroke-accent" strokeWidth={2.4} />
      <g className="stroke-accent" strokeWidth={3.2} strokeLinecap="round">
        <line x1={384} y1={lanes[2] - 16} x2={412} y2={lanes[2] + 12} />
        <line x1={412} y1={lanes[2] - 16} x2={384} y2={lanes[2] + 12} />
      </g>

      {behind.map((name, i) => (
        <g key={name}>
          <rect x={780} y={[182, 314, 446][i]} width={170} height={64} rx={16} className="fill-paper-raise stroke-line" />
          <Sans x={806} y={[182, 314, 446][i] + 40} size={20}>
            {name}
          </Sans>
        </g>
      ))}

      <rect x={414} y={140} width={172} height={420} rx={26} className="fill-paper-raise stroke-ink" strokeWidth={2} />
      {controls.map((label, i) => (
        <g key={label}>
          <rect x={432} y={162 + i * 98} width={136} height={80} rx={14} className="fill-ink" fillOpacity={0.05} />
          <circle cx={450} cy={202 + i * 98} r={6} className="fill-accent" />
          <Mono x={464} y={206 + i * 98} size={12} className="fill-ink">
            {label}
          </Mono>
        </g>
      ))}

      <rect x={64} y={598} width={872} height={58} rx={16} className="fill-paper-raise stroke-line" />
      <Mono x={90} y={632} size={14}>
        Audit trail
      </Mono>
      {Array.from({ length: 22 }, (_, i) => (
        <rect key={i} x={250 + i * 30} y={616} width={14} height={22} rx={3} className="fill-ink" fillOpacity={round(0.1 + rand() * 0.5)} />
      ))}
    </Frame>
  );
}
