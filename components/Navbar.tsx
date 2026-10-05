"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, m, useReducedMotion, useScroll } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { isFilled, links, navItems, site } from "@/lib/content";
import { getSocialItems } from "@/lib/social";
import { easeOutExpo } from "@/components/Motion";

/*
 * A floating header, not a bar. At the top of a page it is a wide pill with
 * the links and a "Let's talk" button. Once you scroll it shrinks into a small
 * dark island: the page you are on, plus a menu button ringed with your
 * reading progress. It slips away on the way down and returns on the way up.
 * The menu opens a full-screen index with the same links in large type.
 */
const centreItems = navItems.filter((item) => item.id !== "contact");
const cta = navItems.find((item) => item.id === "contact");
const menuItems = [{ label: "Home", href: "/", id: "home" }, ...navItems] as const;

function Mark() {
  return (
    <span
      aria-hidden
      className="grid size-9 shrink-0 place-items-center rounded-full bg-accent font-display text-[0.8rem] font-bold tracking-tight text-white"
    >
      VG
    </span>
  );
}

export function Navbar() {
  const [openAt, setOpenAt] = useState<string | null>(null);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [narrow, setNarrow] = useState(false);
  const [hover, setHover] = useState<string | null>(null);
  const [pill, setPill] = useState<{ x: number; w: number; instant: boolean } | null>(null);

  const pathname = usePathname();
  /* The menu belongs to the page it was opened on, so navigating closes it. */
  const open = openAt === pathname;
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const socials = getSocialItems().filter((item) => item.href);
  const compact = scrolled || narrow || open;
  const activeId = centreItems.find((item) => isActive(item.href))?.id ?? null;
  const pillId = hover ?? activeId;
  const current = isActive("/") ? "Home" : (navItems.find((item) => isActive(item.href))?.label ?? "");

  const closeMenu = (restoreFocus = true) => {
    setOpenAt(null);
    if (restoreFocus) toggleRef.current?.focus();
  };

  /* Compact once you leave the top; always compact on phones. */
  useEffect(() => {
    const query = window.matchMedia("(max-width: 47.99rem)");
    const read = () => setNarrow(query.matches);
    read();
    query.addEventListener("change", read);
    return () => query.removeEventListener("change", read);
  }, []);

  /* Quiet on the way down, back on the way up. It also returns when the
     pointer reaches the top edge or when anything inside it takes focus. */
  useEffect(() => {
    let last = window.scrollY;
    let frame = 0;

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - last;
        setScrolled(y > 72);
        if (Math.abs(delta) > 6) {
          setHidden(delta > 0 && y > 280);
          last = y;
        }
        frame = 0;
      });
    };
    const onPointer = (event: PointerEvent) => {
      if (event.clientY < 72) setHidden(false);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointer, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointer);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  /* Slide the highlight to the link under the pointer, or the current page. */
  useEffect(() => {
    const list = listRef.current;
    if (!list || !pillId) {
      setPill(null);
      return;
    }
    const el = list.querySelector<HTMLElement>(`[data-nav="${pillId}"]`);
    if (!el) return;
    setPill((prev) => ({ x: el.offsetLeft, w: el.offsetWidth, instant: prev === null }));
  }, [pillId, compact]);

  /* Open menu: lock page scroll, close on Escape, keep Tab inside the menu,
     and move focus to the first link. */
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenAt(null);
        toggleRef.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;
      const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-menu-focus]"));
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);

    const focusTimer = window.setTimeout(() => firstLinkRef.current?.focus(), 120);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(focusTimer);
    };
  }, [open]);

  const surface = open
    ? "border-line bg-paper text-ink shadow-none"
    : compact
      ? "border-paper/15 bg-ink/90 text-paper shadow-[0_18px_40px_-18px_rgb(0_0_0/0.55)] backdrop-blur-xl"
      : "border-line bg-paper/70 text-ink shadow-[0_10px_40px_-20px_rgb(0_0_0/0.25)] backdrop-blur-xl";

  return (
    <>
      <header
        onFocusCapture={() => setHidden(false)}
        className={`animate-fade-in pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 transition-transform duration-700 ease-out-expo md:pt-4 ${
          hidden && !open ? "-translate-y-[160%]" : "translate-y-0"
        }`}
      >
        <div
          className={`pointer-events-auto relative h-[3.25rem] overflow-hidden rounded-full border transition-[width,background-color,border-color,box-shadow,color] duration-700 ease-out-expo ${surface} ${
            compact ? "w-[min(100%,22rem)]" : "w-[min(100%,62rem)]"
          }`}
        >
          {/* Wide: links, time and the call to action. Desktop, top of page. */}
          <div
            inert={compact}
            className={`absolute inset-0 hidden items-center justify-between gap-4 pl-2 pr-2 transition-opacity duration-500 md:flex ${
              compact ? "opacity-0" : "opacity-100 delay-200"
            }`}
          >
            <Link
              href="/"
              onClick={() => {
                if (pathname === "/") window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              aria-label={`${site.name}, home`}
              className="flex items-center gap-3 rounded-full pr-3"
            >
              <Mark />
              <span className="font-display text-[1.02rem] font-bold tracking-[-0.02em]">
                {site.name}
              </span>
            </Link>

            <nav aria-label="Primary">
              <ul
                ref={listRef}
                className="relative flex items-center"
                onPointerLeave={() => setHover(null)}
              >
                <span
                  aria-hidden
                  className="absolute inset-y-0 left-0 rounded-full bg-ink transition-[transform,width,opacity] duration-500 ease-out-expo"
                  style={{
                    width: pill?.w ?? 0,
                    transform: `translateX(${pill?.x ?? 0}px)`,
                    opacity: pill ? 1 : 0,
                    transitionDuration: pill?.instant ? "0s, 0s, 300ms" : undefined,
                  }}
                />
                {centreItems.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      data-nav={item.id}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      onPointerEnter={() => setHover(item.id)}
                      onFocus={() => setHover(item.id)}
                      onBlur={() => setHover(null)}
                      className={`relative z-10 inline-flex h-9 items-center rounded-full px-4 text-[0.92rem] font-medium transition-colors duration-300 ${
                        pillId === item.id ? "text-paper" : "text-ink"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-3">
              {cta && (
                <Link
                  href={cta.href}
                  aria-current={isActive(cta.href) ? "page" : undefined}
                  className="group inline-flex h-9 items-center gap-2 rounded-full bg-accent pl-4 pr-3 text-[0.92rem] font-medium text-white transition-colors duration-300 hover:bg-ink"
                >
                  Let’s talk
                  <ArrowUpRight
                    aria-hidden
                    size={15}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>
              )}
            </div>
          </div>

          {/* Small: where you are, and the menu. Phones always; desktop once scrolled. */}
          <div
            inert={!compact}
            className={`absolute inset-0 flex items-center justify-between pl-2 pr-1.5 transition-opacity duration-500 ${
              compact ? "opacity-100 delay-200" : "opacity-0"
            } ${open ? "text-ink" : "text-paper"}`}
          >
            <Link
              href="/"
              data-menu-focus
              onClick={() => {
                if (open) closeMenu(false);
                if (pathname === "/") window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              aria-label={`${site.name}, home`}
              className="flex min-w-0 items-center gap-2.5 rounded-full pr-2"
            >
              <Mark />
              <span className="truncate text-[0.92rem] font-medium">{current}</span>
            </Link>

            <button
              ref={toggleRef}
              type="button"
              data-menu-focus
              onClick={() => (open ? closeMenu() : setOpenAt(pathname))}
              aria-expanded={open}
              aria-controls="site-menu"
              className="flex items-center gap-2.5 rounded-full py-1 pl-3 text-[0.92rem] font-medium"
            >
              <span>{open ? "Close" : "Menu"}</span>
              <span className="relative grid size-10 place-items-center">
                <svg viewBox="0 0 40 40" aria-hidden className="absolute inset-0 -rotate-90">
                  <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeOpacity="0.18" strokeWidth="2" />
                  <m.circle
                    cx="20"
                    cy="20"
                    r="18"
                    fill="none"
                    stroke={open ? "#1e3cff" : "#8a9bff"}
                    strokeWidth="2"
                    strokeLinecap="round"
                    style={{ pathLength: scrollYProgress }}
                  />
                </svg>
                <span aria-hidden className="relative block h-2.5 w-4">
                  <span
                    className={`absolute left-0 top-0 h-px w-full bg-current transition-transform duration-500 ease-out-expo ${
                      open ? "translate-y-[5px] rotate-45" : ""
                    }`}
                  />
                  <span
                    className={`absolute bottom-0 left-0 h-px w-full bg-current transition-transform duration-500 ease-out-expo ${
                      open ? "-translate-y-[4px] -rotate-45" : ""
                    }`}
                  />
                </span>
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <m.div
            id="site-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            animate={reduce ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
            exit={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: easeOutExpo }}
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-paper pb-8 pt-28 overscroll-contain"
          >
            <div className="container-x grid flex-1 content-start gap-12 lg:grid-cols-12 lg:gap-8">
              <nav aria-label="Menu" className="lg:col-span-8">
                <ul className="group/list">
                  {menuItems.map((item, index) => (
                    <li
                      key={item.id}
                      className="overflow-hidden border-b border-line transition-opacity duration-300 first:border-t group-hover/list:opacity-30 hover:opacity-100!"
                    >
                      <m.div
                        initial={reduce ? { opacity: 0 } : { y: "100%" }}
                        animate={reduce ? { opacity: 1 } : { y: 0 }}
                        transition={{ duration: 0.8, ease: easeOutExpo, delay: 0.16 + index * 0.06 }}
                      >
                        <Link
                          ref={index === 0 ? firstLinkRef : undefined}
                          href={item.href}
                          data-menu-focus
                          aria-current={isActive(item.href) ? "page" : undefined}
                          onClick={() => closeMenu(false)}
                          className="group/link flex min-h-[4.25rem] items-center justify-between gap-4 py-2 text-h1"
                        >
                          <span className="transition-transform duration-500 ease-out-expo group-hover/link:translate-x-3">
                            {item.label}
                          </span>
                          <span className="flex items-center gap-3">
                            {isActive(item.href) && (
                              <span className="label hidden text-accent sm:inline">You are here</span>
                            )}
                            <ArrowRight
                              aria-hidden
                              className="size-[0.5em] -translate-x-2 opacity-0 transition-all duration-500 ease-out-expo group-hover/link:translate-x-0 group-hover/link:opacity-100"
                              strokeWidth={1.5}
                            />
                          </span>
                        </Link>
                      </m.div>
                    </li>
                  ))}
                </ul>
              </nav>

              <m.aside
                className="space-y-8 lg:col-span-3 lg:col-start-10 lg:pt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                {isFilled(links.email) && (
                  <div>
                    <p className="label text-muted">Write to me</p>
                    <a
                      href={`mailto:${links.email}`}
                      data-menu-focus
                      onClick={() => closeMenu(false)}
                      className="mt-2 inline-block break-all font-display text-h3 underline decoration-line decoration-1 underline-offset-8 transition-colors hover:decoration-ink"
                    >
                      {links.email}
                    </a>
                  </div>
                )}

                {socials.length > 0 && (
                  <ul className="flex flex-wrap gap-x-6">
                    {socials
                      .filter((item) => item.external)
                      .map((item) => (
                        <li key={item.label}>
                          <a
                            href={item.href ?? undefined}
                            data-menu-focus
                            onClick={() => closeMenu(false)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex min-h-11 items-center gap-1 text-small font-medium"
                          >
                            {item.label}
                            <ArrowUpRight aria-hidden size={14} />
                          </a>
                        </li>
                      ))}
                  </ul>
                )}

                <p className="label text-muted">{site.location}</p>
              </m.aside>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
