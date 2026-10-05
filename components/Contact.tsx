import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { contact } from "@/lib/content";
import { getSocialItems } from "@/lib/social";
import { DrawLine, Reveal, RevealText } from "@/components/Motion";

const rowClass = "group flex min-h-16 items-center justify-between gap-6 py-5 md:py-7";
const titleClass =
  "font-display text-h2 font-bold transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-3";
const arrowClass =
  "size-[clamp(1.5rem,4vw,3rem)] shrink-0 transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:translate-x-1";

/** Closing call to action. The first row leads to the contact page. */
export function Contact() {
  const items = getSocialItems().filter((item) => item.href);

  return (
    <section id="contact" aria-labelledby="contact-heading" className="section scroll-mt-16">
      <div className="container-x">
        <p className="label text-muted">{contact.eyebrow}</p>
        <h2 id="contact-heading" className="text-feature mt-6">
          <RevealText>{contact.headline}</RevealText>
        </h2>

        <div className="grid-12 mt-10 gap-y-12 lg:mt-16">
          <Reveal className="col-span-full md:col-span-5 lg:col-span-4">
            <p className="text-lead max-w-[30ch]">{contact.note}</p>
          </Reveal>

          <ul className="col-span-full md:col-span-6 md:col-start-1 lg:col-span-8 lg:col-start-5">
            <li className="relative last:border-b last:border-ink">
              <DrawLine className="bg-ink" />
              <Reveal y={12}>
                <Link href="/contact" className={rowClass}>
                  <span className={titleClass}>
                    <span className="u-sweep">{contact.page.message}</span>
                  </span>
                  <ArrowRight aria-hidden className={arrowClass} strokeWidth={1.5} />
                </Link>
              </Reveal>
            </li>
            {items.map((item, i) => (
              <li key={item.label} className="relative last:border-b last:border-ink">
                <DrawLine className="bg-ink" delay={(i + 1) * 0.07} />
                <Reveal delay={(i + 1) * 0.07} y={12}>
                  <a
                    href={item.href ?? undefined}
                    {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className={rowClass}
                  >
                    <span className={titleClass}>
                      <span className="u-sweep">{item.label}</span>
                    </span>
                    <ArrowUpRight aria-hidden className={arrowClass} strokeWidth={1.5} />
                  </a>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
