import Image from "next/image";
import type { Project } from "@/lib/content";
import { Drift } from "@/components/Drift";
import { ProjectVisual, visualRatios } from "@/components/ProjectVisual";

interface ProjectMediaProps {
  project: Project;
  /** `sizes` hint so the browser downloads a right-sized screenshot. */
  sizes: string;
  priority?: boolean;
  /** Unique per place the media appears on the page (card, case study). */
  uid?: string;
  /** Slow parallax as the page scrolls. Cards use it; the case study does not. */
  drift?: boolean;
}

/**
 * The visual for a project. Uses a real screenshot when `project.image` is
 * set in lib/content.ts, otherwise the code-drawn concept visual.
 */
export function ProjectMedia({
  project,
  sizes,
  priority = false,
  uid = "card",
  drift = false,
}: ProjectMediaProps) {
  const ratios = visualRatios(project.visual);
  const picture = project.image ? (
    <Image
      src={project.image.src}
      alt={project.image.alt}
      fill
      sizes={sizes}
      priority={priority}
      draggable={false}
      className="select-none object-cover object-top"
    />
  ) : (
    <ProjectVisual
      kind={project.visual}
      uid={uid}
      label={`${project.title.toLowerCase()}, ${project.caption.toLowerCase()}`}
    />
  );

  return (
    <div
      className="relative w-full overflow-hidden rounded-lg border border-line bg-paper-deep transition-colors duration-700 [aspect-ratio:var(--ratio-phone)] group-hover:border-ink/40 md:[aspect-ratio:var(--ratio-wide)]"
      style={
        {
          "--ratio-phone": ratios.phone,
          "--ratio-wide": ratios.wide,
        } as React.CSSProperties
      }
    >
      {drift ? <Drift>{picture}</Drift> : picture}
    </div>
  );
}
