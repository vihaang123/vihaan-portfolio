"use client";

import { currently } from "@/lib/content";
import { m } from "framer-motion";
import { Reveal, easeOutExpo } from "@/components/Motion";
import { SectionHead } from "@/components/SectionHead";

/** Dark band. Each label and value reveals on its own, so rows feel assembled. */
export function Currently() {
  return (
    <section
      id="now"
      aria-labelledby="now-heading"
      className="section bg-ink text-paper"
    >
      <div className="container-x">
        <SectionHead
          index={currently.index}
          label={currently.label}
          title={currently.heading}
          id="now-heading"
          tone="dark"
        />

        <dl>
          {currently.blocks.map((block, i) => (
            <div key={block.label} className="grid-12 relative gap-y-3 py-6 md:py-8">
              <m.span
                aria-hidden
                className="absolute inset-x-0 top-0 h-px origin-left bg-paper/20"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                transition={{ duration: 1.2, ease: easeOutExpo, delay: i * 0.06 }}
              />
              <dt className="col-span-full lg:col-span-3">
                <Reveal delay={i * 0.06} y={12}>
                  <span className="label flex items-center gap-3 text-paper/60">
                    {"live" in block && block.live && (
                      <span className="relative flex size-2" aria-hidden>
                        <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent-soft opacity-70" />
                        <span className="relative inline-flex size-2 rounded-full bg-accent-soft" />
                      </span>
                    )}
                    {block.label}
                  </span>
                </Reveal>
              </dt>
              <dd className="col-span-full lg:col-span-9">
                <Reveal delay={i * 0.06 + 0.12}>
                  <p className="font-display text-h2 flex flex-col font-bold md:block">
                    {block.values.map((value, j) => (
                      <span key={value}>
                        {j > 0 && (
                          <>
                            {" "}
                            <span className="sr-only">, </span>
                            <span aria-hidden className="mx-[0.5em] hidden text-paper/30 md:inline">
                              /
                            </span>
                          </>
                        )}
                        {value}
                      </span>
                    ))}
                  </p>
                </Reveal>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
