import { ArrowUpRight } from "lucide-react";
import { experience, isFilled, type ExperienceItem } from "@/lib/content";
import { DrawLine, Reveal } from "@/components/Motion";
import { SectionHead } from "@/components/SectionHead";

interface RowProps {
  period?: string;
  title: string;
  role?: string;
  meta?: string;
  href?: string;
  hrefLabel?: string;
  description: string;
  highlights?: string[];
  tags?: string[];
}

/** A role still going is marked with a live dot, so "now" is easy to find. */
const isCurrent = (period?: string) => Boolean(period && /present/i.test(period));

function Row({ period, title, role, meta, href, hrefLabel, description, highlights, tags }: RowProps) {
  return (
    <Reveal className="grid-12 relative gap-y-5 py-9 md:py-12">
      <DrawLine />
      {/* The period column keeps its width even when empty, so rows stay aligned. */}
      <p className="col-span-full flex items-start gap-3 font-display text-lead font-semibold tabular-nums lg:col-span-3">
        {isCurrent(period) && (
          <span className="relative mt-[0.55em] flex size-2 shrink-0" aria-hidden>
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:animate-none" />
            <span className="relative inline-flex size-2 rounded-full bg-accent" />
          </span>
        )}
        {isFilled(period) ? period : null}
      </p>

      <div className="col-span-full lg:col-span-5">
        <h4 className="text-h3">{title}</h4>
        {role && <p className="mt-2 text-lead font-medium text-ink/80">{role}</p>}
        {meta && <p className="label mt-3 text-muted">{meta}</p>}
        {href && isFilled(href) && (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-3 inline-flex min-h-11 items-center gap-1.5 text-small font-medium"
          >
            <span className="u-sweep">{hrefLabel ?? "Visit website"}</span>
            <ArrowUpRight
              aria-hidden
              size={15}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        )}
      </div>

      <div className="col-span-full lg:col-span-4">
        <p className="text-body max-w-[42ch] text-muted">{description}</p>

        {highlights && highlights.length > 0 && (
          <ul className="mt-6 max-w-[46ch] text-small">
            {highlights.map((item) => (
              <li key={item} className="flex gap-3 border-t border-line py-3">
                <span aria-hidden className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-accent" />
                {item}
              </li>
            ))}
          </ul>
        )}

        {tags && tags.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Skills and focus">
            {tags.map((tag) => (
              <li key={tag} className="rounded-full border border-line px-3 py-1 text-small">
                {tag}
              </li>
            ))}
          </ul>
        )}
      </div>
    </Reveal>
  );
}

const metaFor = (item: ExperienceItem) =>
  [item.type, item.location, item.field].filter(Boolean).join(" · ");

export function Experience({ headingAs, first = false }: { headingAs?: "h1" | "h2"; first?: boolean }) {
  const { education } = experience;
  const hasInstitution = isFilled(education.institution);

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className={`section scroll-mt-16 ${first ? "section-first" : ""}`}
    >
      <div className="container-x">
        <SectionHead
          label={experience.label}
          title={experience.heading}
          id="experience-heading"
          as={headingAs}
        />

        {experience.groups.map((group, g) => {
          const items = experience.items.filter((item) => item.kind === group);
          if (items.length === 0) return null;
          return (
            <div key={group} className={g === 0 ? "" : "mt-16 md:mt-24"}>
              <h3 className="mb-1 text-h3">{group}</h3>
              <div>
                {items.map((item) => (
                  <Row
                    key={item.organisation}
                    period={item.period}
                    title={item.organisation}
                    role={item.role}
                    meta={metaFor(item)}
                    href={item.href}
                    hrefLabel={item.hrefLabel}
                    description={item.description}
                    highlights={item.highlights}
                    tags={item.tags}
                  />
                ))}
              </div>
            </div>
          );
        })}

        <div className="mt-16 md:mt-24">
          <h3 className="mb-1 text-h3">{experience.educationLabel}</h3>
          <div className="border-b border-line">
            <Row
              period={education.period}
              title={hasInstitution ? education.institution : education.degree}
              role={hasInstitution ? education.degree : undefined}
              description={education.description}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
