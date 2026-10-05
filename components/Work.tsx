import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { work } from "@/lib/content";
import { FeaturedProject } from "@/components/FeaturedProject";
import { Reveal } from "@/components/Motion";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectsExplorer } from "@/components/ProjectsExplorer";
import { SectionHead } from "@/components/SectionHead";

interface WorkProps {
  /** Show every project, filterable (the Projects page). Otherwise a short selection. */
  all?: boolean;
  headingAs?: "h1" | "h2";
  first?: boolean;
}

/** Selected work: the flagship first, then the next two alternating left and right. */
export function Work({ all = false, headingAs, first = false }: WorkProps) {
  const featured = work.projects.find((p) => p.featured);
  const rest = work.projects.filter((p) => !p.featured);
  const shown = rest.slice(0, 2);

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className={`section scroll-mt-16 ${first ? "section-first" : ""}`}
    >
      <div className="container-x">
        <SectionHead
          label={work.label}
          title={all ? work.pageHeading : work.heading}
          id="work-heading"
          as={headingAs}
        >
          <p className="mt-6 max-w-[38ch] text-lead text-muted">{work.subheading}</p>
        </SectionHead>

        {all ? (
          <ProjectsExplorer />
        ) : (
          <>
            {featured && <FeaturedProject project={featured} />}
            {shown.map((project, i) => (
              <ProjectCard key={project.id} project={project} mirrored={i % 2 === 1} />
            ))}

            <Reveal className="border-t border-ink pt-8">
              <Link
                href="/projects"
                className="group inline-flex min-h-14 items-center gap-4 font-display text-h3 font-bold"
              >
                <span className="u-sweep">All projects ({work.projects.length})</span>
                <ArrowRight
                  aria-hidden
                  className="size-[1em] transition-transform duration-500 ease-out-expo group-hover:translate-x-2"
                  strokeWidth={1.5}
                />
              </Link>
            </Reveal>
          </>
        )}
      </div>
    </section>
  );
}
