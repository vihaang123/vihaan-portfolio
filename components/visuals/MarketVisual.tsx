import { ConceptTag, Mono, round, Sans } from "./primitives";

/**
 * StockIQ: a conceptual market-intelligence view.
 * Candles, a trend line with a forecast cone, volume, and four signal
 * sparklines. Generic series only: no tickers, prices or performance claims.
 */
export const marketSize = { width: 1000, height: 780 } as const;

const COUNT = 22;
const price = (i: number) =>
  round(400 - i * 6 + Math.sin(i * 0.9) * 26 + Math.sin(i * 2.1) * 11);

const candles = Array.from({ length: COUNT }, (_, i) => {
  const x = 112 + i * 19.5;
  const mid = price(i);
  const body = 7 + ((i * 7) % 10);
  return { i, x, mid, body, wick: body + 11, up: Math.sin(i * 1.7) > 0 };
});

const average = candles.map((c, i) => {
  const prev = candles[Math.max(0, i - 1)].mid;
  const next = candles[Math.min(COUNT - 1, i + 1)].mid;
  return [c.x, round((prev + c.mid + next) / 3)] as const;
});

const last = average[average.length - 1];
const forecastX = 650;
const forecastY = round(last[1] - (forecastX - last[0]) * 0.5);

const sparkline = (seed: number, drift: number) =>
  Array.from({ length: 16 }, (_, i) => {
    const x = 712 + i * 12.5;
    const y = 64 - i * drift + Math.sin(i * 0.8 + seed) * 9 + Math.sin(i * 1.9 + seed * 2) * 4;
    return `${round(x)},${round(y)}`;
  });

const signals = [
  { name: "Trend", seed: 1, drift: 1.6 },
  { name: "Momentum", seed: 2, drift: 0.8 },
  { name: "Volatility", seed: 3, drift: -0.4 },
  { name: "Volume", seed: 4, drift: 0.2 },
];

export function MarketVisual(props: { uid: string }) {
  void props;
  return (
    <>
      <rect width={1000} height={780} className="fill-paper-deep" />
      <rect x={40} y={40} width={920} height={700} rx={16} className="fill-paper-raise stroke-line" />

      {/* Header */}
      <Sans x={72} y={90} size={22}>
        Market intelligence
      </Sans>
      {["1D", "1W", "1M", "1Y"].map((label, i) => (
        <g key={label}>
          <rect x={564 + i * 60} y={68} width={54} height={30} rx={15} className={i === 2 ? "fill-ink" : "fill-paper-deep"} />
          <Mono x={591 + i * 60} y={88} size={12} anchor="middle" className={i === 2 ? "fill-paper" : "fill-muted"}>
            {label}
          </Mono>
        </g>
      ))}
      <ConceptTag x={826} y={70} />
      <line x1={40} y1={118} x2={960} y2={118} className="stroke-line" />

      {/* Chart */}
      <rect x={72} y={142} width={600} height={420} rx={12} className="fill-paper-raise stroke-line" />
      {Array.from({ length: 6 }, (_, i) => (
        <line key={i} x1={88} y1={176 + i * 52} x2={656} y2={176 + i * 52} className="stroke-line" />
      ))}
      <polygon
        points={`${last[0]},${last[1]} ${forecastX},${round(forecastY - 54)} ${forecastX},${round(forecastY + 54)}`}
        className="fill-accent"
        fillOpacity={0.1}
      />
      {candles.map((c) => (
        <g key={c.i}>
          <line x1={c.x} y1={c.mid - c.wick} x2={c.x} y2={c.mid + c.wick} className="stroke-ink" strokeWidth={1.4} />
          <rect
            x={c.x - 5.5}
            y={c.mid - c.body}
            width={11}
            height={c.body * 2}
            className={c.up ? "fill-ink stroke-ink" : "fill-paper-raise stroke-ink"}
            strokeWidth={1.4}
          />
        </g>
      ))}
      <polyline points={average.map(([x, y]) => `${x},${y}`).join(" ")} fill="none" className="stroke-accent" strokeWidth={3.2} strokeLinejoin="round" />
      <line x1={last[0]} y1={last[1]} x2={forecastX} y2={forecastY} className="stroke-accent" strokeWidth={3.2} strokeDasharray="2 8" strokeLinecap="round" />
      <line x1={last[0] + 12} y1={158} x2={last[0] + 12} y2={548} className="stroke-ink" strokeOpacity={0.3} strokeDasharray="4 6" />
      <Mono x={last[0] + 22} y={176} size={11}>
        FORECAST
      </Mono>

      {/* Volume */}
      {candles.map((c) => (
        <rect
          key={c.i}
          x={c.x - 5.5}
          y={552 - (14 + ((c.i * 13) % 9) * 4.6)}
          width={11}
          height={14 + ((c.i * 13) % 9) * 4.6}
          rx={2}
          className="fill-ink"
          fillOpacity={0.14}
        />
      ))}

      {/* Signals */}
      {signals.map((s, i) => {
        const y = 142 + i * 106;
        const points = sparkline(s.seed, s.drift);
        const end = points[points.length - 1].split(",");
        return (
          <g key={s.name} transform={`translate(0 ${y - 142})`}>
            <rect x={696} y={142} width={240} height={98} rx={12} className="fill-paper-raise stroke-line" />
            <Sans x={712} y={170} size={16}>
              {s.name}
            </Sans>
            <polyline points={points.map((p) => p.replace(/,(-?[\d.]+)$/, (_m, v) => `,${round(Number(v) + 146)}`)).join(" ")} fill="none" className={i === 0 ? "stroke-accent" : "stroke-ink"} strokeWidth={2} strokeOpacity={i === 0 ? 1 : 0.55} strokeLinejoin="round" />
            <circle cx={Number(end[0])} cy={round(Number(end[1]) + 146)} r={4} className={i === 0 ? "fill-accent" : "fill-ink"} />
          </g>
        );
      })}

      {/* Footer strip */}
      <rect x={72} y={582} width={864} height={132} rx={12} className="fill-paper-raise stroke-line" />
      <Mono x={92} y={612} size={12}>
        WATCHLIST
      </Mono>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={92 + i * 284} y={634} width={150} height={10} rx={5} className="fill-ink" fillOpacity={0.14} />
          <rect x={92 + i * 284} y={634} width={[104, 76, 126][i]} height={10} rx={5} className={i === 0 ? "fill-accent" : "fill-ink"} fillOpacity={i === 0 ? 1 : 0.5} />
          <rect x={92 + i * 284} y={662} width={210} height={8} rx={4} className="fill-ink" fillOpacity={0.08} />
          <rect x={92 + i * 284} y={684} width={140} height={8} rx={4} className="fill-ink" fillOpacity={0.08} />
        </g>
      ))}
    </>
  );
}
