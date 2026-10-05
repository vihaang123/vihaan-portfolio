"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, X } from "lucide-react";
import { isFilled, work, type Project } from "@/lib/content";
import { easeOutExpo } from "@/components/Motion";
import { ProjectMedia } from "@/components/ProjectMedia";
import { useDialogBehavior } from "@/components/case-study/useDialogBehavior";

/** Distance in px from each viewport edge to the card the sheet grows from. */
export interface Origin {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

interface CaseStudyDialogProps {
  project: Project | undefined;
  origin: Origin | null;
  onClose: () => void;
  onNavigate: (id: string) => void;
  onExited: () => void;
}

const labels = work.caseStudy;

const clip = (o: Origin) =>
  `inset(${o.top}px ${o.right}px ${o.bottom}px ${o.left}px round 12px)`;
const clipOpen = "inset(0px 0px 0px 0px round 0px)";

/** Content block that fades up after the sheet has started to open. */
function Enter({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <m.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 28 }}
      animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: easeOutExpo, delay }}
    >
      {children}
    </m.div>
  );
}

function Meta({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-line pt-3">
      <dt className="label text-muted">{label}</dt>
      <dd className="mt-1 text-small font-medium">{children}</dd>
    </div>
  );
}

function Body({ project, onNavigate }: { project: Project; onNavigate: (id: string) => void }) {
  const projects = work.projects;
  const next = projects[(projects.findIndex((p) => p.id === project.id) + 1) % projects.length];
  const hasLink = isFilled(project.href);

  return (
    <>
      <div className="pt-10 md:pt-14">
        <Enter delay={0.25}>
          <p className="label flex flex-wrap items-center gap-x-3 gap-y-1 text-muted">
            <span>{project.featured ? "Featured" : "Case study"}</span>
            {project.status && (
              <span className="rounded-full border border-line px-2.5 py-0.5 text-ink">{project.status}</span>
            )}
          </p>
          <h2 id="case-study-title" className="text-feature mt-5">
            {project.title}
          </h2>
        </Enter>
      </div>

      <Enter delay={0.35} className="mt-8 md:mt-12">
        <ProjectMedia
          project={project}
          uid="case"
          sizes="(min-width: 1536px) 1400px, 94vw"
          priority
        />
        <p className="label mt-3 text-muted">{project.caption}</p>
      </Enter>

      <Enter delay={0.45} className="grid-12 mt-14 gap-y-12 md:mt-20">
        <dl className="col-span-full grid grid-cols-2 gap-x-6 gap-y-5 md:col-span-2 md:grid-cols-1 lg:col-span-3">
          {project.role && <Meta label={labels.role}>{project.role}</Meta>}
          <Meta label={labels.categories}>{project.categories.join(", ")}</Meta>
          {project.technology && project.technology.length > 0 && (
            <Meta label={labels.technology}>{project.technology.join(", ")}</Meta>
          )}
          {project.details?.map((d) => (
            <Meta key={d.label} label={d.label}>
              {d.value}
            </Meta>
          ))}
        </dl>

        <div className="col-span-full flex flex-col gap-14 md:col-span-4 lg:col-span-8 lg:col-start-5">
          <section aria-labelledby="cs-overview">
            <h3 id="cs-overview" className="label text-muted">
              {labels.overview}
            </h3>
            <p className="text-lead mt-4 max-w-[34ch]">{project.overview}</p>
          </section>

          <section aria-labelledby="cs-focus">
            <h3 id="cs-focus" className="label text-muted">
              {labels.focus}
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {project.focus.map((f) => (
                <li key={f} className="rounded-full border border-line px-3 py-1 text-small">
                  {f}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="cs-worked">
            <h3 id="cs-worked" className="label text-muted">
              {labels.worked}
            </h3>
            <ol className="mt-4 border-b border-line">
              {project.worked.map((item, i) => (
                <li
                  key={item}
                  className="grid grid-cols-[2.5rem_1fr] items-baseline gap-x-4 border-t border-line py-4 text-body"
                >
                  <span aria-hidden className="label text-muted">
                    0{i + 1}
                  </span>
                  {item}
                </li>
              ))}
            </ol>
          </section>

          {hasLink && (
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-11 items-center gap-2 self-start text-small font-medium"
            >
              <span className="u-sweep">{project.hrefLabel ?? labels.visit}</span>
              <ArrowUpRight
                aria-hidden
                className="size-4 transition-transform duration-500 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          )}
        </div>
      </Enter>

      <div className="mt-20 border-t border-ink md:mt-28">
        <button
          type="button"
          onClick={() => onNavigate(next.id)}
          className="group flex min-h-24 w-full items-center justify-between gap-6 py-8 text-left"
        >
          <span className="flex flex-col gap-2">
            <span className="label text-muted">{labels.next}</span>
            <span className="text-h2 transition-transform duration-700 ease-out-expo group-hover:translate-x-3">
              <span className="u-sweep">{next.title}</span>
            </span>
          </span>
          <ArrowRight
            aria-hidden
            className="size-[clamp(1.5rem,4vw,3rem)] shrink-0 transition-transform duration-500 ease-out group-hover:translate-x-2"
            strokeWidth={1.5}
          />
        </button>
      </div>
    </>
  );
}

/**
 * Full-screen case study. It opens by growing out of the project card that was
 * clicked, and is a real modal dialog: labelled, focus-trapped, closes on
 * Escape, and locks the page behind it.
 */
export function CaseStudyDialog({
  project,
  origin,
  onClose,
  onNavigate,
  onExited,
}: CaseStudyDialogProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const open = Boolean(project);

  useDialogBehavior(ref, open, onClose);

  /* Jump back to the top when moving to the next project. */
  const id = project?.id;
  useEffect(() => {
    ref.current?.scrollTo({ top: 0 });
  }, [id]);

  const from = reduce || !origin ? undefined : clip(origin);

  return (
    <AnimatePresence onExitComplete={onExited}>
      {project && (
        <m.div
          key="case-study"
          ref={ref}
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-study-title"
          className="fixed inset-0 z-[70] overflow-y-auto overscroll-contain bg-paper"
          initial={from ? { clipPath: from, opacity: 1 } : { opacity: 0 }}
          animate={from ? { clipPath: clipOpen, opacity: 1 } : { opacity: 1, clipPath: clipOpen }}
          exit={
            from
              ? { clipPath: from, opacity: 1, transition: { duration: 0.65, ease: easeOutExpo } }
              : { opacity: 0, transition: { duration: 0.3 } }
          }
          transition={{ duration: from ? 0.85 : 0.4, ease: easeOutExpo }}
        >
          <div className="sticky top-0 z-10 border-b border-line bg-paper/85 backdrop-blur-md">
            <div className="container-x flex h-16 items-center justify-between md:h-[4.5rem]">
              <p className="label text-muted">
                {work.heading}
                <span aria-hidden> / </span>
                <span className="text-ink">{project.title}</span>
              </p>
              <button
                type="button"
                data-autofocus
                onClick={onClose}
                className="label group -mr-3 inline-flex min-h-11 items-center gap-3 px-3"
              >
                <span className="u-sweep">{labels.close}</span>
                <X
                  aria-hidden
                  size={16}
                  className="transition-transform duration-500 ease-out group-hover:rotate-90"
                />
              </button>
            </div>
          </div>

          <div className="container-x pb-16 md:pb-24">
            <m.div
              key={project.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <Body project={project} onNavigate={onNavigate} />
            </m.div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
