import type { ProjectVisualKind } from "@/lib/content";
import {
  ForecastVisual,
  forecastSize,
} from "@/components/visuals/ForecastVisual";
import {
  MarketVisual,
  marketSize,
} from "@/components/visuals/MarketVisual";
import {
  ModelVisual,
  modelSize,
} from "@/components/visuals/ModelVisual";
import {
  OperationsVisual,
  operationsSize,
} from "@/components/visuals/OperationsVisual";
import {
  OrchestrationVisual,
  orchestrationSize,
} from "@/components/visuals/OrchestrationVisual";
import {
  AgentsVisual,
  AllocationVisual,
  CommitVisual,
  GateVisual,
  RegimesVisual,
  SalesVisual,
  ToolsVisual,
  posterSize,
} from "@/components/visuals/PosterVisuals";

/* The orchestration and operations visuals are kept for reuse. Tekkloom and
   Supercore now live under Experience, so no project uses them at the moment. */
const visuals = {
  orchestration: { Component: OrchestrationVisual, size: orchestrationSize },
  operations: { Component: OperationsVisual, size: operationsSize },
  market: { Component: MarketVisual, size: marketSize },
  model: { Component: ModelVisual, size: modelSize },
  forecast: { Component: ForecastVisual, size: forecastSize },
  agents: { Component: AgentsVisual, size: posterSize },
  sales: { Component: SalesVisual, size: posterSize },
  commit: { Component: CommitVisual, size: posterSize },
  tools: { Component: ToolsVisual, size: posterSize },
  allocation: { Component: AllocationVisual, size: posterSize },
  regimes: { Component: RegimesVisual, size: posterSize },
  gate: { Component: GateVisual, size: posterSize },
} satisfies Record<
  ProjectVisualKind,
  { Component: (props: { uid: string }) => React.JSX.Element; size: { width: number; height: number } }
>;

/**
 * Phone crops. The wide Tekkloom interface is zoomed in to its canvas on
 * phones, so the agents stay large enough to read. Other kinds keep their
 * full composition.
 */
const phoneCrop: Partial<Record<ProjectVisualKind, { viewBox: string; ratio: string }>> = {
  orchestration: { viewBox: "225 105 643 597", ratio: "643 / 597" },
};

/** Aspect ratios of a visual's frame: the full drawing, and the phone crop. */
export const visualRatios = (kind: ProjectVisualKind) => {
  const { width, height } = visuals[kind].size;
  const wide = `${width} / ${height}`;
  return { phone: phoneCrop[kind]?.ratio ?? wide, wide };
};

/**
 * Renders one of the code-drawn concept visuals. They are conceptual
 * compositions, not screenshots, and each carries a small "Concept" tag.
 */
export function ProjectVisual({
  kind,
  label,
  uid,
}: {
  kind: ProjectVisualKind;
  label: string;
  /** Keeps SVG pattern ids unique when the same visual is on the page twice. */
  uid: string;
}) {
  const { Component, size } = visuals[kind];
  const crop = phoneCrop[kind];
  /* Display only: never selectable, draggable or hoverable like a link. */
  const svgClass = "pointer-events-none block h-full w-full select-none";

  if (!crop) {
    return (
      <svg
        viewBox={`0 0 ${size.width} ${size.height}`}
        role="img"
        aria-label={label}
        className={svgClass}
        preserveAspectRatio="xMidYMid slice"
      >
        <Component uid={uid} />
      </svg>
    );
  }

  return (
    <>
      <svg
        viewBox={crop.viewBox}
        role="img"
        aria-label={label}
        className={`${svgClass} md:hidden`}
        preserveAspectRatio="xMidYMid slice"
      >
        <Component uid={`${uid}-phone`} />
      </svg>
      <svg
        viewBox={`0 0 ${size.width} ${size.height}`}
        role="img"
        aria-label={label}
        className={`${svgClass} hidden md:block`}
        preserveAspectRatio="xMidYMid slice"
      >
        <Component uid={uid} />
      </svg>
    </>
  );
}
