import { inspirations, quotes } from "@/lib/content";
import { Reveal } from "@/components/Motion";
import { SectionHead } from "@/components/SectionHead";

/** People I look up to. Hidden until `inspirations.items` has real entries. */
export function Inspirations() {
  if (inspirations.items.length === 0) return null;

  return (
    <section id="inspiration" aria-labelledby="inspiration-heading" className="section">
      <div className="container-x">
        <SectionHead
          label={inspirations.label}
          title={inspirations.heading}
          id="inspiration-heading"
        >
          <p className="text-lead mt-6 max-w-[38ch] text-muted">{inspirations.intro}</p>
        </SectionHead>

        <ul className="grid-12 gap-y-10">
          {inspirations.items.map((item, i) => (
            <li key={item.name} className="col-span-full md:col-span-4">
              <Reveal delay={(i % 3) * 0.08} className="h-full border-t border-ink pt-4">
                <h3 className="font-display text-h3 font-bold">{item.name}</h3>
                <p className="text-body mt-3 text-muted">{item.why}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Quotes I keep close. Hidden until `quotes.items` has real entries. */
export function Quotes() {
  if (quotes.items.length === 0) return null;

  return (
    <section id="quotes" aria-labelledby="quotes-heading" className="section">
      <div className="container-x">
        <SectionHead label={quotes.label} title={quotes.heading} id="quotes-heading" />

        <ul className="grid-12 gap-y-14">
          {quotes.items.map((item) => (
            <li key={item.text} className="col-span-full lg:col-span-8 lg:col-start-4">
              <Reveal delay={0.04} className="border-t border-line pt-6">
                <figure>
                  <blockquote className="font-display text-h3 max-w-[30ch] font-semibold">
                    <span aria-hidden className="mr-[0.08em] text-accent">
                      “
                    </span>
                    {item.text}
                    <span aria-hidden className="ml-[0.04em] text-accent">
                      ”
                    </span>
                  </blockquote>
                  <figcaption className="label mt-4 text-muted">{item.author}</figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
