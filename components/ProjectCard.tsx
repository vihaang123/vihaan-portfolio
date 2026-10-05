import type { Project } from "@/lib/content";
import { Reveal, RevealMedia } from "@/components/Motion";
import { ProjectCta } from "@/components/ProjectCta";
import { ProjectMedia } from "@/components/ProjectMedia";
import { StatusBadge } from "@/components/StatusBadge";

interface ProjectCardProps {
  project: Project;
  /** Mirrors the layout (text left, visual right) for rhythm down the page. */
  mirrored?: boolean;
}

/**
 * Standard project block: a large visual beside the text. On hover the visual
 * eases in, the title shifts and the call to action underlines.
 */
export function ProjectCard({ project, mirrored = false }: ProjectCardProps) {
  return (
    <article
      className="group relative grid-12 items-center gap-y-8 border-t border-line py-[var(--section-head-gap)]"
      data-cursor="VIEW"
      aria-labelledby={`project-${project.id}`}
    >
      <RevealMedia
        className={`col-span-full md:col-span-6 lg:col-span-7 ${
          mirrored ? "lg:order-2 lg:col-start-6" : ""
        }`}
      >
        <div data-case-origin className="overflow-hidden rounded-lg">
          <div className="transition-transform duration-[1200ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.03]">
            <ProjectMedia
              project={project}
              sizes="(min-width: 1536px) 820px, (min-width: 1024px) 58vw, (min-width: 768px) 92vw, 100vw"
              drift
            />
          </div>
        </div>
        <p className="label mt-3 text-muted">{project.caption}</p>
      </RevealMedia>

      {/* y={0}: a transformed ancestor would shrink the button's card-wide hit area. */}
      <Reveal
        y={0}
        className={`col-span-full flex flex-col gap-6 md:col-span-6 lg:col-span-5 ${
          mirrored ? "lg:order-1 lg:col-start-1 lg:pr-6" : "lg:pl-6"
        }`}
      >
        <p className="label flex flex-wrap items-center gap-x-3 gap-y-2 text-muted">
          <StatusBadge status={project.status} />
          <span>{project.categories.join(", ")}</span>
        </p>

        <h3
          id={`project-${project.id}`}
          className="text-h2 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-2"
        >
          {project.title}
        </h3>

        <p className="text-body max-w-[40ch]">{project.description}</p>

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

        <div className="pt-2">
          <ProjectCta project={project} />
        </div>
      </Reveal>
    </article>
  );
}
