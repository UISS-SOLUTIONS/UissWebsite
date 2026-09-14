"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export interface MotionAccordionItem {
  question: React.ReactNode
  answer: React.ReactNode
}

export interface MotionAccordionProps {
  items: MotionAccordionItem[]
  gap?: number
  className?: string
}

export function MotionAccordion({ items, gap = 10, className }: MotionAccordionProps) {
  const rawId = React.useId()
  const baseId = `accordion-${rawId.replace(/:/g, "")}`
  const [openIndex, setOpenIndex] = React.useState<number | null>(null)

  return (
    <div className={cn("w-full", className)}>
      <div className="flex flex-col rounded-xl p-3" style={{ gap }}>
        {items.map((item, index) => {
          const isOpen = openIndex === index
          const itemId = `${baseId}-trigger-${index}`
          const panelId = `${baseId}-panel-${index}`

          return (
            <div key={index} className="overflow-hidden rounded-xl border border-line bg-surface text-ink shadow-soft">
              <button
                id={itemId}
                type="button"
                aria-controls={panelId}
                aria-expanded={isOpen}
                onClick={() => setOpenIndex((current) => current === index ? null : index)}
                className="flex w-full cursor-pointer select-none items-center justify-between gap-4 px-7 py-5 text-left outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-inset"
              >
                <span className="text-[clamp(1.2rem,1.6vw,1.3rem)] font-medium leading-snug tracking-tight">{item.question}</span>
                <span aria-hidden="true" className="inline-flex size-12 shrink-0 items-center justify-center text-2xl leading-none transition-transform duration-150 ease-out active:scale-[0.97] motion-reduce:transition-none">
                  {isOpen ? "−" : "+"}
                </span>
              </button>
              <div id={panelId} role="region" aria-labelledby={itemId} hidden={!isOpen} className="px-7 pb-7 transition-opacity duration-150 ease-out motion-reduce:transition-none [@starting-style]:opacity-0">
                <p className="text-base leading-7 tracking-normal text-muted sm:text-lg sm:leading-8">{item.answer}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
