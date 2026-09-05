"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

export interface HoverExpandItem {
  id: string;
  label: string;
  /** e.g. country, year, category */
  sublabel?: string;
  image?: string;
  imageAlt?: string;
  /** short descriptor shown when expanded */
  description?: string;
}

export interface HoverExpandProps {
  items: HoverExpandItem[];
  /**
   * Row height when collapsed, in pixels.
   * @default 68
   */
  collapsedHeight?: number;
  /**
   * Row height when expanded, in pixels.
   * @default 320
   */
  expandedHeight?: number;
  className?: string;
  renderItem?: (item: HoverExpandItem, content: React.ReactNode) => React.ReactNode;
}

export function HoverExpand({
  items,
  collapsedHeight = 68,
  expandedHeight = 320,
  className,
  renderItem,
}: HoverExpandProps) {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={cn("flex flex-col w-full", className)}>
      <div className="w-full border-t border-current opacity-15" />

      {items.map((item, i) => {
        const isActive = activeIndex === i;
        const isOtherActive = activeIndex !== null && !isActive;
        const hasImage = Boolean(item.image);

        const row = (
          <motion.div
            className="relative w-full overflow-hidden text-left"
            animate={{
              height: isActive ? expandedHeight : collapsedHeight,
              opacity: isOtherActive ? 0.58 : 1,
            }}
            transition={shouldReduceMotion ? { duration: 0 } : {
              height: {
                type: "spring",
                stiffness: 280,
                damping: 32,
                mass: 0.9,
              },
              opacity: { duration: 0.22, ease: "easeOut" },
            }}
            onHoverStart={() => setActiveIndex(i)}
            onHoverEnd={() => setActiveIndex(null)}
            onFocusCapture={() => setActiveIndex(i)}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setActiveIndex(null);
            }}
          >
            <motion.div
              className={cn("absolute inset-0 size-full bg-ink", !hasImage && "bg-ink")}
              style={item.image ? { backgroundImage: `url(${item.image})`, backgroundPosition: "center", backgroundSize: "cover" } : undefined}
              initial={false}
              animate={{
                opacity: isActive ? 1 : 0,
                scale: shouldReduceMotion || isActive ? 1 : 1.04,
              }}
              transition={shouldReduceMotion ? { duration: 0 } : {
                opacity: { duration: 0.28, ease: [0.23, 1, 0.32, 1] },
                scale: { duration: 0.45, ease: [0.23, 1, 0.32, 1] },
              }}
              aria-hidden="true"
            >
              {hasImage ? <div className="absolute inset-0 bg-black/55" /> : null}
            </motion.div>

            <div className="absolute inset-0 flex items-end px-5 pb-4">
              <div className="flex w-full items-end justify-between gap-4">
                <div className="flex min-w-0 items-baseline gap-3">
                  <motion.span
                    className={cn(
                      "shrink-0 text-xs tabular-nums transition-colors duration-200 motion-reduce:transition-none",
                      isActive && "text-white",
                    )}
                    animate={{ opacity: isActive ? 0.6 : 0.4 }}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </motion.span>

                  <motion.span
                    className={cn(
                      "truncate font-semibold tracking-tight transition-colors duration-200 motion-reduce:transition-none",
                      isActive && "text-white",
                    )}
                    style={{ fontSize: "clamp(1.1rem, 2.2vw, 1.5rem)" }}
                  >
                    {item.label}
                  </motion.span>

                  {item.description ? (
                    <motion.span
                      className="hidden min-w-0 overflow-hidden whitespace-nowrap text-sm text-white/75 sm:block"
                      initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -8 }}
                      animate={{
                        maxWidth: isActive ? "38rem" : "0rem",
                        opacity: isActive ? 1 : 0,
                        x: isActive ? 0 : shouldReduceMotion ? 0 : -8,
                      }}
                      transition={{ duration: shouldReduceMotion ? 0 : 0.25, delay: isActive && !shouldReduceMotion ? 0.08 : 0, ease: "easeOut" }}
                    >
                      — {item.description}
                    </motion.span>
                  ) : null}
                </div>

                {item.sublabel ? (
                  <motion.span
                    className={cn(
                      "hidden shrink-0 text-xs uppercase tracking-widest transition-colors duration-200 motion-reduce:transition-none sm:block",
                      isActive && "text-white/70",
                    )}
                    animate={{ opacity: isActive ? 1 : 0.45 }}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
                  >
                    {item.sublabel}
                  </motion.span>
                ) : null}
              </div>
            </div>
          </motion.div>
        );

        return (
          <React.Fragment key={item.id}>
            {renderItem ? (
              <div
                className="w-full"
                onMouseEnter={() => setActiveIndex(i)}
                onMouseLeave={() => setActiveIndex(null)}
                onFocusCapture={() => setActiveIndex(i)}
                onBlurCapture={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setActiveIndex(null);
                }}
              >
                {renderItem(item, row)}
              </div>
            ) : row}
            <div className="w-full border-t border-current opacity-15" />
          </React.Fragment>
        );
      })}
    </div>
  );
}
