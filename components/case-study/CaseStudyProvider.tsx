"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { work } from "@/lib/content";
import { CaseStudyDialog, type Origin } from "@/components/case-study/CaseStudyDialog";

interface CaseStudyContextValue {
  /** Open a project's case study, expanding from the element that was clicked. */
  open: (id: string, trigger: HTMLElement) => void;
}

const CaseStudyContext = createContext<CaseStudyContextValue | null>(null);

export function useCaseStudy() {
  const context = useContext(CaseStudyContext);
  if (!context) throw new Error("useCaseStudy must be used inside CaseStudyProvider");
  return context;
}

/**
 * Owns which case study is open. Opening adds a history entry, so the browser
 * or phone Back button closes the sheet instead of leaving the site.
 */
export function CaseStudyProvider({ children }: { children: ReactNode }) {
  const [current, setCurrent] = useState<{ id: string; origin: Origin | null } | null>(null);
  const pushed = useRef(false);
  const lastId = useRef<string | null>(null);

  const open = useCallback((id: string, trigger: HTMLElement) => {
    if (pushed.current) return;
    const article = trigger.closest("article");
    const target =
      article?.querySelector<HTMLElement>("[data-case-origin]") ?? article ?? trigger;
    const rect = target.getBoundingClientRect();
    const origin: Origin = {
      top: Math.max(0, rect.top),
      left: Math.max(0, rect.left),
      right: Math.max(0, window.innerWidth - rect.right),
      bottom: Math.max(0, window.innerHeight - rect.bottom),
    };
    lastId.current = id;
    window.history.pushState({ caseStudy: id }, "");
    pushed.current = true;
    setCurrent({ id, origin });
  }, []);

  const close = useCallback(() => {
    if (pushed.current) {
      pushed.current = false;
      window.history.back();
    } else {
      setCurrent(null);
    }
  }, []);

  const navigate = useCallback((id: string) => {
    lastId.current = id;
    window.history.replaceState({ caseStudy: id }, "");
    setCurrent({ id, origin: null });
  }, []);

  /* Back button, or the history.back() call above. */
  useEffect(() => {
    const onPop = () => {
      pushed.current = false;
      setCurrent(null);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  /* Return focus to the project card the person was last looking at. */
  const restoreFocus = useCallback(() => {
    const id = lastId.current;
    if (!id) return;
    document
      .querySelector<HTMLElement>(`[data-case-trigger="${id}"]`)
      ?.focus();
  }, []);

  const value = useMemo(() => ({ open }), [open]);
  const project = current ? work.projects.find((p) => p.id === current.id) : undefined;

  return (
    <CaseStudyContext.Provider value={value}>
      {children}
      <CaseStudyDialog
        project={project}
        origin={current?.origin ?? null}
        onClose={close}
        onNavigate={navigate}
        onExited={restoreFocus}
      />
    </CaseStudyContext.Provider>
  );
}
