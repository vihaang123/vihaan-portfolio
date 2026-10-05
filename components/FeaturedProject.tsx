import type { Project } from "@/lib/content";
import { Reveal, RevealMedia, RevealText } from "@/components/Motion";
import { ProjectCta } from "@/components/ProjectCta";
import { ProjectMedia } from "@/components/ProjectMedia";
import { StatusBadge } from "@/components/StatusBadge";

/**
 * The flagship project. Gets the full width, the biggest title on the page
 * after the hero, and the visual first, so it carries the most weight.
 */
export function FeaturedProject({ project }: { project: Project }) {
  return (
    <article
      className="group relative border-t border-ink pt-6 pb-[var(--section-head-gap)]"
      data-cursor="VIEW"
      aria-labelledby={`project-${project.id}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <p className="label flex items-center gap-3">
          <span>Featured</span>
          <StatusBadge status={project.status} />
        </p>
        {project.role && <p className="label text-muted">{project.role}</p>}
      </div>

      <h3
        id={`project-${project.id}`}
        className="text-feature mt-6 mb-8 sm:mb-12"
      >
        <RevealText>{project.title}</RevealText>
      </h3>

      <RevealMedia>
        <div data-case-origin className="overflow-hidden rounded-lg">
          <div className="transition-transform duration-[1200ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.015]">
            <ProjectMedia
              project={project}
              sizes="(min-width: 1536px) 1400px, (min-width: 768px) 92vw, 100vw"
              priority
              drift
            />
          </div>
        </div>
      </RevealMedia>
      <p className="label mt-3 text-muted">{project.caption}</p>

      {/* y={0}: a transformed ancestor would shrink the button's card-wide hit area. */}
      <Reveal y={0} className="grid-12 mt-10 gap-y-8 lg:mt-14">
        <ul
          className="label col-span-full flex flex-wrap gap-x-4 gap-y-1 text-muted lg:col-span-3 lg:flex-col"
          aria-label="Categories"
        >
          {project.categories.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>

        <p className="col-span-full text-lead max-w-[34ch] md:col-span-4 lg:col-span-5">
          {project.description}
        </p>

        <div className="col-span-full flex flex-col gap-6 md:col-span-2 lg:col-span-3 lg:col-start-10">
          <ul className="flex flex-wrap gap-2" aria-label="Focus areas">
            {project.focus.map((f) => (
              <li
                key={f}
                className="rounded-full border border-line px-3 py-1 text-small"
              >
                {f}
              </li>
            ))}
          </ul>
          <ProjectCta project={project} />
        </div>
      </Reveal>
    </article>
  );
}
