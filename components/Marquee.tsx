import { marquee } from "@/lib/content";

function Row({ hidden }: { hidden?: boolean }) {
  return (
    <ul
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center motion-reduce:flex-wrap"
    >
      {marquee.map((word, i) => (
        <li key={word} className="flex items-center">
          <span
            className={`font-display text-h1 whitespace-nowrap ${
              i % 2 === 1 ? "text-ink/20" : ""
            }`}
          >
            {word}
          </span>
          <span aria-hidden className="mx-[clamp(1.5rem,4vw,3.5rem)] size-2.5 shrink-0 rounded-full bg-accent" />
        </li>
      ))}
    </ul>
  );
}

/** Slow ticker of what I work on. Pauses on hover, static for reduced motion. */
export function Marquee() {
  return (
    <section
      aria-label="What I work on"
      className="group overflow-hidden border-y border-line py-[clamp(1.5rem,3vw,2.5rem)]"
    >
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:w-auto motion-reduce:animate-none">
        <Row />
        <span className="motion-reduce:hidden">
          <Row hidden />
        </span>
      </div>
    </section>
  );
}
