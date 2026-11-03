"use client";

import { useState, type ReactNode } from "react";
import { Accordion } from "@base-ui/react/accordion";
import { Minus, Plus } from "lucide-react";

export type FAQItem = {
  question: string;
  answer: ReactNode;
};

export function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [value, setValue] = useState<string[]>([]);

  return (
    <Accordion.Root value={value} onValueChange={setValue} className="-mx-3 flex flex-col gap-2">
      {items.map((item) => {
        const Icon = value.includes(item.question) ? Minus : Plus;

        return (
          <Accordion.Item key={item.question} value={item.question}>
            <Accordion.Header render={<h3 />}>
              <Accordion.Trigger className="flex min-h-16 w-full items-center justify-between gap-4 px-3 py-5 text-start text-sm font-medium text-ink transition-colors duration-100 hover:bg-surface">
                {item.question}
                <Icon aria-hidden className="size-4 shrink-0" />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Panel keepMounted className="px-3 pb-6 pe-8 text-base leading-7 text-muted">
              {item.answer}
            </Accordion.Panel>
          </Accordion.Item>
        );
      })}
    </Accordion.Root>
  );
}
