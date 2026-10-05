"use client";

import { useState } from "react";
import { m } from "framer-motion";
import { work, type ProjectGroup } from "@/lib/content";
import { easeOutExpo } from "@/components/Motion";
import { FeaturedProject } from "@/components/FeaturedProject";
import { ProjectTile } from "@/components/ProjectTile";

type Filter = (typeof work.filters)[number];

/** The Projects page: the flagship, then every project in a grid you can filter. */
export function ProjectsExplorer() {
  const [filter, setFilter] = useState<Filter>("All");
  const featured = work.projects.find((p) => p.featured);
  const rest = work.projects.filter((p) => !p.featured);

  const matches = (group: ProjectGroup) => filter === "All" || filter === group;
  const shown = rest.filter((p) => matches(p.group));
  const showFeatured = featured && matches(featured.group);
  const count = shown.length + (showFeatured ? 1 : 0);
  const countOf = (f: Filter) =>
    f === "All" ? work.projects.length : work.projects.filter((p) => p.group === f).length;

  return (
    <>
      <div className="mb-10 flex flex-wrap items-center justify-between gap-x-8 gap-y-4 border-t border-ink pt-5">
        <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-2">
          {work.filters.map((f) => {
            const active = f === filter;
            return (
              <button
                key={f}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(f)}
                className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-small font-medium transition-colors duration-300 ${
                  active
                    ? "border-ink bg-ink text-paper"
                    : "border-line hover:border-ink"
                }`}
              >
                {f}
                <span className={`label ${active ? "text-paper/60" : "text-muted"}`}>{countOf(f)}</span>
              </button>
            );
          })}
        </div>
        <p className="label text-muted" role="status" aria-live="polite">
          {count === 1 ? "1 project" : `${count} projects`}
        </p>
      </div>

      <m.div
        key={filter}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: easeOutExpo }}
      >
        {showFeatured && featured && <FeaturedProject project={featured} />}
        {shown.length > 0 && (
          <ul
            className={`grid gap-x-[var(--gutter)] gap-y-16 md:grid-cols-2 ${
              showFeatured ? "border-t border-line pt-[var(--section-head-gap)]" : ""
            }`}
          >
            {shown.map((project) => (
              <li key={project.id}>
                <ProjectTile project={project} />
              </li>
            ))}
          </ul>
        )}
      </m.div>
    </>
  );
}
