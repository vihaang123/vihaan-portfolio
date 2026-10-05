"use client";

import { ArrowUpRight } from "lucide-react";
import { work, type Project } from "@/lib/content";
import { useCaseStudy } from "@/components/case-study/CaseStudyProvider";

/**
 * Opens the project's case study. It is a real button, so it works with the
 * keyboard and screen readers, and its hit area stretches over the whole card.
 * The parent card must be `relative` and have the `group` class.
 */
export function ProjectCta({ project }: { project: Project }) {
  const { open } = useCaseStudy();

  return (
    <button
      type="button"
      data-case-trigger={project.id}
      aria-haspopup="dialog"
      aria-label={`${work.caseStudy.open}: ${project.title.toLowerCase()}`}
      onClick={(event) => open(project.id, event.currentTarget)}
      className="inline-flex min-h-11 items-center gap-2 text-small font-medium after:absolute after:inset-0 after:content-['']"
    >
      <span className="u-sweep">{work.caseStudy.open}</span>
      <ArrowUpRight
        aria-hidden
        className="size-4 transition-transform duration-500 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      />
    </button>
  );
}
