import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { aboutMore } from "@/lib/content";
import { Reveal } from "@/components/Motion";
import { SectionHead } from "@/components/SectionHead";

/** The longer "who I am" story for the About page. */
export function AboutStory() {
  const { story } = aboutMore;
  return (
    <section id="story" aria-labelledby="story-heading" className="section">
      <div className="container-x">
        <SectionHead label={story.label} title={story.heading} id="story-heading" />
        <div className="grid-12 gap-y-6">
          <div className="col-span-full flex flex-col gap-6 lg:col-span-7 lg:col-start-4">
            {story.paragraphs.map((text, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <p
                  className={`max-w-[56ch] ${
                    i === 0 ? "text-lead text-ink" : "text-body text-muted"
                  }`}
                >
                  {text}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/** Four things I'm doing right now, each with a link to the detail. */
export function WhatIDo() {
  const { doing } = aboutMore;
  return (
    <section id="doing" aria-labelledby="doing-heading" className="section">
      <div className="container-x">
        <SectionHead label={doing.label} title={doing.heading} id="doing-heading" />
        <ul className="grid-12 gap-y-12">
          {doing.items.map((item, i) => (
            <li key={item.title} className="col-span-full md:col-span-6 lg:col-span-4 lg:[&:nth-child(odd)]:col-start-4 lg:[&:nth-child(even)]:col-start-8">
              <Reveal delay={(i % 2) * 0.08} className="group relative h-full border-t border-ink pt-5">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="font-display text-h3 font-bold">{item.title}</h3>
                  <p className="label text-muted">{item.role}</p>
                </div>
                <p className="text-body mt-4 max-w-[44ch] text-muted">{item.text}</p>
                <Link
                  href={item.href}
                  className="mt-5 inline-flex min-h-11 items-center gap-2 text-small font-medium"
                >
                  <span className="u-sweep">{item.linkLabel}</span>
                  <ArrowUpRight
                    aria-hidden
                    className="size-4 transition-transform duration-500 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** What keeps pulling my attention: big type, one line each. */
export function Interests() {
  const { interests } = aboutMore;
  return (
    <section id="interests" aria-labelledby="interests-heading" className="section">
      <div className="container-x">
        <SectionHead label={interests.label} title={interests.heading} id="interests-heading" />
        <ul>
          {interests.items.map((item, i) => (
            <li key={item.title} className="grid-12 gap-y-2 border-t border-line py-6 last:border-b md:py-8">
              <Reveal delay={i * 0.04} className="col-span-full lg:col-span-4 lg:col-start-4">
                <h3 className="font-display text-h3 font-bold">{item.title}</h3>
              </Reveal>
              <Reveal delay={i * 0.04 + 0.08} className="col-span-full lg:col-span-4">
                <p className="text-body max-w-[40ch] text-muted">{item.note}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
