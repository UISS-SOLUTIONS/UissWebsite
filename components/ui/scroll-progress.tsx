"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { motion, useScroll } from "motion/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

export type ScrollProgressSection = { id: string; label: string };

export type ScrollProgressProps = React.ComponentProps<"div"> & {
  sections?: ScrollProgressSection[];
  containerRef?: React.RefObject<HTMLElement | null>;
  offset?: number;
};

export function ScrollProgress({
  className,
  sections = [],
  containerRef,
  offset = 120,
  ...props
}: ScrollProgressProps) {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll(containerRef ? { container: containerRef } : undefined);
  const [activeId, setActiveId] = React.useState(sections[0]?.id);
  const [open, setOpen] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const navigationId = React.useId();
  const scrollLock = React.useRef(false);
  const scrollLockTimer = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  React.useEffect(() => {
    const scroller = containerRef?.current ?? window;

    const update = () => {
      if (scrollLock.current) return;
      const anchor = (containerRef?.current?.getBoundingClientRect().top ?? 0) + offset;

      const active = sections.findLast(({ id }) => {
        const top = document.getElementById(id)?.getBoundingClientRect().top;

        return top !== undefined && top <= anchor;
      });

      setActiveId(active?.id ?? sections[0]?.id);
    };

    update();
    scroller.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      scroller.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [sections, containerRef, offset]);

  React.useEffect(() => {
    if (!open) return;

    const onPointer = (event: PointerEvent) => {
      if (!(event.target instanceof Node && rootRef.current?.contains(event.target)))
        setOpen(false);
    };

    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      setOpen(false);
      triggerRef.current?.focus({ preventScroll: true });
    };

    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  React.useEffect(() => () => clearTimeout(scrollLockTimer.current), []);

  const selectSection = (id: string, keyboard: boolean) => {
    const immediate = keyboard || reduceMotion;
    scrollLock.current = true;
    clearTimeout(scrollLockTimer.current);
    scrollLockTimer.current = setTimeout(
      () => {
        scrollLock.current = false;
      },
      immediate ? 0 : 700,
    );
    setActiveId(id);
    setOpen(false);
    const target = document.getElementById(id);

    if (!target) return;
    target.tabIndex = -1;
    target.focus({ preventScroll: true });
    target.scrollIntoView({ behavior: immediate ? "auto" : "smooth", block: "start" });
  };

  const label = sections.find((section) => section.id === activeId)?.label ?? sections[0]?.label;

  if (!label) return null;

  return (
    <div
      ref={rootRef}
      data-slot="scroll-progress"
      className={cn(
        "fixed bottom-6 left-1/2 z-30 max-w-[calc(100vw-3rem)] -translate-x-1/2",
        className,
      )}
      {...props}
    >
      {open ? (
        <nav
          id={navigationId}
          aria-label="Article sections"
          className="absolute bottom-full left-1/2 mb-3 max-h-[60dvh] w-80 max-w-[calc(100vw-3rem)] -translate-x-1/2 overflow-y-auto rounded-lg bg-panel p-2 shadow-raised"
        >
          <ul>
            {sections.map((section) => (
              <li key={section.id}>
                <button
                  type="button"
                  onClick={(event) => selectSection(section.id, event.detail === 0)}
                  aria-current={section.id === activeId ? "location" : undefined}
                  className={cn(
                    "flex min-h-11 w-full items-center px-3 py-2 text-left text-sm",
                    section.id === activeId
                      ? "bg-surface text-ink"
                      : "text-muted hover:bg-surface hover:text-ink",
                  )}
                >
                  {section.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
      <button
        ref={triggerRef}
        type="button"
        aria-label="Show sections"
        aria-expanded={open}
        aria-controls={navigationId}
        onClick={() => setOpen((value) => !value)}
        data-slot="scroll-progress-surface"
        className="uiss-button flex min-h-11 max-w-full items-center gap-3 bg-panel px-3 py-2 text-sm text-ink shadow-raised hover:bg-surface"
      >
        <svg viewBox="0 0 24 24" className="size-5 shrink-0 -rotate-90" aria-hidden>
          <circle cx="12" cy="12" r="10" fill="none" strokeWidth="2.5" className="stroke-line" />
          <motion.circle
            cx="12"
            cy="12"
            r="10"
            fill="none"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="stroke-ink"
            style={{ pathLength: scrollYProgress }}
          />
        </svg>
        <span data-slot="scroll-progress-label" className="min-w-0 truncate">
          {label}
        </span>
        <ChevronDown aria-hidden className={cn("size-4 shrink-0", open && "rotate-180")} />
      </button>
    </div>
  );
}

export default ScrollProgress;
