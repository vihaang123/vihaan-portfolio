import { capabilities } from "@/lib/content";
import { DrawLine, Reveal, Stagger, StaggerItem } from "@/components/Motion";
import { SectionHead } from "@/components/SectionHead";

export function Capabilities({ headingAs, first = false }: { headingAs?: "h1" | "h2"; first?: boolean }) {
  return (
    <section
      id="capabilities"
      aria-labelledby="capabilities-heading"
      className={`section scroll-mt-16 ${first ? "section-first" : ""}`}
    >
      <div className="container-x">
        <SectionHead
          label={capabilities.label}
          title={capabilities.heading}
          id="capabilities-heading"
          as={headingAs}
        />

        <ul className="grid-12 gap-y-14">
          {capabilities.areas.map((area, i) => (
            <li key={area.title} className="col-span-full md:col-span-3">
              <Reveal delay={i * 0.08} className="relative h-full pt-5">
                <DrawLine className="bg-ink" delay={i * 0.08} />
                <h3 className="text-h3">{area.title}</h3>
                <Stagger className="mt-6 flex flex-wrap gap-2" delay={i * 0.08 + 0.25} gap={0.04}>
                  {area.items.map((item) => (
                    <StaggerItem
                      key={item}
                      className="rounded-full border border-line px-3.5 py-1.5 text-small transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-paper"
                    >
                      {item}
                    </StaggerItem>
                  ))}
                </Stagger>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
