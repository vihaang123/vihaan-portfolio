"use client";

import { m } from "framer-motion";
import { hero, site } from "@/lib/content";
import { easeOutExpo } from "@/components/Motion";
import { KineticHeadline } from "@/components/KineticHeadline";
import { Trajectory } from "@/components/Trajectory";

/*
 * Load sequence (seconds):
 *   0.00  page begins
 *   0.15  floating header settles in (CSS)
 *   0.25  status and location
 *   0.35  headline, line by line (0.09s apart)
 *   0.85  the path line draws itself, dots pop as it reaches them
 *   1.70  one sweep of weight and width runs through the headline
 *   2.90  the forecast cone opens past today
 */
const fade = (delay: number, y = 0) => ({
  initial: { opacity: 0, y },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, ease: easeOutExpo, delay },
});

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col overflow-hidden pb-6 pt-24 md:pb-8 md:pt-28"
    >
      {/* Ambient light: a soft accent glow that drifts very slowly. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-[12%] top-[6%] size-[min(70vw,46rem)] rounded-full bg-accent/[0.10] blur-[110px] animate-glow motion-reduce:animate-none" />
        <div className="absolute -left-[18%] bottom-[-10%] size-[min(60vw,38rem)] rounded-full bg-accent-soft/[0.14] blur-[120px] animate-glow [animation-delay:-11s] [animation-direction:alternate-reverse] motion-reduce:animate-none" />
      </div>

      {/* Status and place */}
      <div className="container-x">
        <m.div className="label flex items-center justify-between gap-6" {...fade(0.25)}>
          <p className="inline-flex items-center gap-3 rounded-full border border-line bg-paper-raise/70 py-1.5 pl-3 pr-4 backdrop-blur-sm">
            <span className="relative flex h-2 w-2" aria-hidden>
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            {hero.status}
          </p>
          <p className="hidden shrink-0 whitespace-nowrap text-right text-ink sm:block">{site.location}</p>
        </m.div>
      </div>

      {/* Statement, with the intro beside it on wide screens */}
      <div className="container-x my-auto py-6 md:py-8">
        <div className="grid-12 items-end gap-y-8">
          <h1 className="text-hero sm:text-hero-wide col-span-full lg:col-span-8">
            <span className="sr-only">
              {site.name}. {hero.statement}
            </span>
            <KineticHeadline rows={hero.lines.narrow} className="block sm:hidden" />
            <KineticHeadline rows={hero.lines.wide} className="hidden sm:block" />
          </h1>

          <div className="col-span-full flex flex-col gap-8 lg:col-span-3 lg:col-start-10 lg:pb-5">
            <m.p className="max-w-[26rem] text-lead text-ink/85" {...fade(0.95, 18)}>
              {hero.intro}
            </m.p>
            <m.a
              href="#work"
              className="label group hidden min-h-11 items-center gap-4 self-start text-muted lg:inline-flex"
              {...fade(1.35)}
            >
              <span>Scroll</span>
              <span aria-hidden className="relative block h-12 w-px overflow-hidden bg-line">
                <span className="absolute inset-0 animate-scroll-line bg-ink" />
              </span>
              <span className="sr-only">to see selected work</span>
            </m.a>
          </div>
        </div>
      </div>

      {/* Path so far */}
      <div className="container-x pt-6 sm:pt-10">
        <Trajectory />
      </div>
    </section>
  );
}
