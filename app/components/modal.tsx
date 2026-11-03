"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { IModal } from "./types";
import { useEntranceMotion } from "@/hooks/use-entrance-motion";

export default function Modal({ children, isOpen, setIsOpen, animateEntrance = false }: IModal) {
  const dialogRef = useEntranceMotion<HTMLDivElement>({
    enabled: isOpen && animateEntrance,
    fromOpacity: 0,
    fromTransform: "scale(0.98)",
    duration: "section",
  });

  const backdropRef = useEntranceMotion<HTMLDivElement>({
    enabled: isOpen && animateEntrance,
    fromOpacity: 0,
    duration: "control",
  });

  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    previousFocus.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const dialog = dialogRef.current;
    dialog?.querySelector<HTMLElement>("button, input, textarea, select, a[href]")?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);

      if (event.key !== "Tab" || !dialog) return;

      const elements = [
        ...dialog.querySelectorAll<HTMLElement>("button, input, textarea, select, a[href]"),
      ].filter((element) => !element.hasAttribute("disabled"));

      if (!elements.length) return;
      const first = elements[0];
      const last = elements[elements.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus.current?.focus();
    };
  }, [dialogRef, isOpen, setIsOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) setIsOpen(false);
      }}
    >
      <div
        ref={backdropRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-ink/30"
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Administration form"
        className="relative max-h-[calc(100dvh-2rem)] w-full max-w-2xl overflow-y-auto overscroll-contain rounded-lg bg-panel p-6 pt-20 text-ink shadow-modal sm:p-8 sm:pt-20"
      >
        <button
          type="button"
          aria-label="Close dialog"
          onClick={() => setIsOpen(false)}
          className="uiss-button uiss-pressable absolute end-4 top-4 z-10 grid size-11 place-items-center rounded-control bg-panel shadow-border hover:bg-surface"
        >
          <X className="size-5" />
        </button>
        {children}
      </div>
    </div>
  );
}
