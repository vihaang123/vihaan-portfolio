"use client";

import { useEffect, useRef } from "react";

/**
 * A small circular cursor that appears only over elements marked with
 * `data-cursor="LABEL"`, and only on devices with a real mouse.
 *
 * It is purely decorative (aria-hidden), never replaces the native cursor
 * anywhere else, and is disabled for touch and for reduced motion.
 */
export function Cursor() {
  const positionRef = useRef<HTMLDivElement>(null);
  const discRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduce.matches) return;

    const position = positionRef.current;
    const disc = discRef.current;
    const label = labelRef.current;
    if (!position || !disc || !label) return;

    const root = document.documentElement;
    let targetX = 0;
    let targetY = 0;
    let x = 0;
    let y = 0;
    let frame = 0;
    let active = false;

    /* While visible, keep checking what is under the pointer. This hides the
       label when the page scrolls or a dialog opens under a still mouse. */
    const render = () => {
      const under = document.elementFromPoint(targetX, targetY);
      if (!under?.closest("[data-cursor]")) {
        hide();
        return;
      }
      x += (targetX - x) * 0.22;
      y += (targetY - y) * 0.22;
      position.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      frame = window.requestAnimationFrame(render);
    };

    const show = (text: string) => {
      label.textContent = text;
      if (!active) {
        active = true;
        x = targetX;
        y = targetY;
        root.classList.add("has-cursor");
        disc.dataset.visible = "true";
        frame = window.requestAnimationFrame(render);
      }
    };

    const hide = () => {
      if (!active) return;
      active = false;
      root.classList.remove("has-cursor");
      disc.dataset.visible = "false";
      window.cancelAnimationFrame(frame);
    };

    const onMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      const host = (event.target as Element | null)?.closest?.("[data-cursor]");
      if (host) show(host.getAttribute("data-cursor") ?? "View");
      else hide();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", hide);
    window.addEventListener("blur", hide);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", hide);
      window.removeEventListener("blur", hide);
      window.cancelAnimationFrame(frame);
      root.classList.remove("has-cursor");
    };
  }, []);

  return (
    <div
      ref={positionRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[90] hidden [@media(hover:hover)_and_(pointer:fine)]:block"
    >
      <div
        ref={discRef}
        data-visible="false"
        className="-ml-8 -mt-8 flex h-16 w-16 scale-50 items-center justify-center rounded-full bg-accent text-white opacity-0 transition-[transform,opacity] duration-300 ease-out-expo data-[visible=true]:scale-100 data-[visible=true]:opacity-100"
      >
        <span ref={labelRef} className="label" />
      </div>
    </div>
  );
}
