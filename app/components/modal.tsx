"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { IModal } from "./types";

export default function Modal({ children, isOpen, setIsOpen }: IModal) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    previousFocus.current = document.activeElement as HTMLElement;
    const dialog = dialogRef.current;
    dialog?.querySelector<HTMLElement>("button, input, textarea, select, a[href]")?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
      if (event.key !== "Tab" || !dialog) return;
      const elements = [...dialog.querySelectorAll<HTMLElement>("button, input, textarea, select, a[href]")].filter((element) => !element.hasAttribute("disabled"));
      if (!elements.length) return;
      const first = elements[0];
      const last = elements[elements.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKeyDown); document.body.style.overflow = ""; previousFocus.current?.focus(); };
  }, [isOpen, setIsOpen]);

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/75 p-4 backdrop-blur-sm" onMouseDown={(event) => { if (event.target === event.currentTarget) setIsOpen(false); }}>
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-label="Administration form" className="relative max-h-[90dvh] w-full max-w-2xl overflow-y-auto rounded-xl border border-line bg-canvas p-5 text-ink shadow-raised sm:p-7">
        <button type="button" aria-label="Close dialog" onClick={() => setIsOpen(false)} className="uiss-pressable absolute right-4 top-4 z-10 grid size-10 place-items-center rounded-md border border-line bg-canvas"><X className="size-5" /></button>
        {children}
      </div>
    </div>
  );
}
