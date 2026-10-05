import type { Project } from "@/lib/content";
import { RevealMedia } from "@/components/Motion";
import { ProjectCta } from "@/components/ProjectCta";
import { ProjectMedia } from "@/components/ProjectMedia";
import { StatusBadge } from "@/components/StatusBadge";

/**
 * Compact project block for the Projects page grid: the visual on top, then
 * the title, a short line and a few focus areas. The whole tile opens the case study.
 */
export function ProjectTile({ project }: { project: Project }) {
  return (
    <article
      className="group relative flex h-full flex-col"
      data-cursor="VIEW"
      aria-labelledby={`project-${project.id}`}
    >
      <RevealMedia>
        <div data-case-origin className="overflow-hidden rounded-lg">
          <div className="transition-transform duration-[1200ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]">
            <ProjectMedia
              project={project}
              sizes="(min-width: 1536px) 700px, (min-width: 768px) 46vw, 100vw"
            />
          </div>
        </div>
      </RevealMedia>

      <div className="mt-6 flex flex-1 flex-col gap-4">
        <p className="label flex flex-wrap items-center gap-x-3 gap-y-2 text-muted">
          <StatusBadge status={project.status} />
          <span>{project.categories.slice(0, 2).join(", ")}</span>
        </p>
        <h3
          id={`project-${project.id}`}
          className="text-h3 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-1.5"
        >
          {project.title}
        </h3>
        <p className="text-body max-w-[44ch] text-muted">{project.description}</p>
        <ul className="flex flex-wrap gap-2" aria-label="Focus areas">
          {project.focus.slice(0, 3).map((f) => (
            <li key={f} className="rounded-full border border-line px-3 py-1 text-small">
              {f}
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-2">
          <ProjectCta project={project} />
        </div>
      </div>
    </article>
  );
}
