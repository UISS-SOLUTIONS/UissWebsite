"use client"

import { useEffect, useState } from "react"
import {
  ScrollProgress,
  type ScrollProgressSection,
} from "@/components/ui/scroll-progress"

const introduction: ScrollProgressSection = {
  id: "article-introduction",
  label: "Introduction",
}

function toId(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export function BlogReadingProgress() {
  const [sections, setSections] = useState<ScrollProgressSection[]>([
    introduction,
  ])

  useEffect(() => {
    const article = document.querySelector<HTMLElement>("[data-blog-article]")
    if (!article) return

    const usedIds = new Set<string>([introduction.id])
    const articleSections = Array.from(
      article.querySelectorAll<HTMLHeadingElement>("h2, h3"),
    ).map((heading, index) => {
      const label = heading.textContent?.trim() || `Section ${index + 1}`
      const baseId = heading.id || toId(label) || `article-section-${index + 1}`
      let id = baseId
      let suffix = 2

      while (usedIds.has(id)) {
        id = `${baseId}-${suffix}`
        suffix += 1
      }

      usedIds.add(id)
      heading.id = id
      return { id, label }
    })

    setSections([introduction, ...articleSections])
  }, [])

  return (
    <ScrollProgress
      sections={sections}
      offset={160}
      aria-label="Article reading progress and section navigation"
    />
  )
}
