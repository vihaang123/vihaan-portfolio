import { beyond } from "@/lib/content";
import { Reveal } from "@/components/Motion";
import { SectionHead } from "@/components/SectionHead";

/** Hidden until real interests are added to `beyond.items` in lib/content.ts. */
export function Beyond() {
  if (beyond.items.length === 0) return null;

  return (
    <section id="beyond" aria-labelledby="beyond-heading" className="section">
      <div className="container-x">
        <SectionHead
          index={beyond.index}
          label={beyond.label}
          title={beyond.heading}
          id="beyond-heading"
        >
          <p className="text-lead mt-6 max-w-[38ch] text-muted">{beyond.intro}</p>
        </SectionHead>

        <ul className="grid-12 gap-y-10">
          {beyond.items.map((item, i) => (
            <li key={item.title} className="col-span-full md:col-span-3">
              <Reveal delay={i * 0.08} className="border-t border-ink pt-4">
                <h3 className="text-h3 font-semibold">{item.title}</h3>
                <p className="text-body mt-3 text-muted">{item.note}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
