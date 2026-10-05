import { about } from "@/lib/content";
import { Reveal } from "@/components/Motion";
import { SectionHead } from "@/components/SectionHead";

export function About({ headingAs, first = false }: { headingAs?: "h1" | "h2"; first?: boolean }) {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className={`section scroll-mt-16 ${first ? "section-first" : ""}`}
    >
      <div className="container-x">
        <SectionHead
          index={about.index}
          label={about.label}
          title={about.statement}
          id="about-heading"
          as={headingAs}
        />

        <div className="grid-12 gap-y-10">
          <Reveal className="col-span-full lg:col-span-6 lg:col-start-4">
            <p className="font-display text-h3 max-w-[26ch] font-semibold">{about.lead}</p>
          </Reveal>

          <Reveal
            delay={0.1}
            className="col-span-full md:col-span-4 lg:col-span-5 lg:col-start-4"
          >
            <p className="text-body max-w-[46ch] text-muted">{about.body}</p>
          </Reveal>

          <Reveal
            delay={0.2}
            className="col-span-full md:col-span-2 lg:col-span-3 lg:col-start-10 lg:row-span-2 lg:row-start-1"
          >
            <dl className="grid grid-cols-2 gap-x-6 gap-y-5 md:grid-cols-1">
              {about.facts.map((fact) => (
                <div key={fact.label} className="border-t border-line pt-3">
                  <dt className="label text-muted">{fact.label}</dt>
                  <dd className="mt-1 text-small font-medium">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
