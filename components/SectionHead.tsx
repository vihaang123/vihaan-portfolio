import type { ReactNode } from "react";
import { RevealText } from "@/components/Motion";

interface SectionHeadProps {
  /** Kept for the content file; sections are not a sequence, so it is not shown. */
  index?: string;
  /** Short rail label. */
  label: string;
  /** The h2 text. */
  title: string;
  /** Id for aria-labelledby on the parent section. */
  id: string;
  /** Optional supporting line under the heading. */
  children?: ReactNode;
  /** Use on dark sections. */
  tone?: "light" | "dark";
  /** Heading level. Sub-pages use h1 for their first section. */
  as?: "h1" | "h2";
}

/**
 * Shared section header. Every major section uses the same two-part layout:
 * a small label in the first three columns, the heading starting at column 4.
 */
export function SectionHead({ label, title, id, children, tone = "light", as: Heading = "h2" }: SectionHeadProps) {
  return (
    <div className="section-head grid-12 gap-y-6">
      <p
        className={`label col-span-full flex items-center gap-2.5 pt-3 lg:col-span-3 ${
          tone === "dark" ? "text-paper/60" : "text-muted"
        }`}
      >
        <span aria-hidden className="size-1.5 rounded-[1px] bg-accent" />
        {label}
      </p>
      <div className="col-span-full lg:col-span-9">
        <Heading id={id} className="text-h2">
          <RevealText>{title}</RevealText>
        </Heading>
        {children}
      </div>
    </div>
  );
}
