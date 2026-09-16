'use client'

import Image from 'next/image'
import { useState } from 'react'

import {
  getActiveLeaderPortraitCandidate,
  getLeaderPortraitCandidates,
  resolveLeaderPortrait,
  type LeaderPortraitVariant,
} from '@/lib/leader-portraits'
import { cn } from '@/lib/utils'

type LeaderPortraitProps = {
  name: string
  databaseImage?: string | null
  variant: LeaderPortraitVariant
  className?: string
  priority?: boolean
}

const frameStyles: Record<LeaderPortraitVariant, string> = {
  avatar: 'size-24 rounded-full',
  card: 'aspect-[4/5] w-full rounded-2xl',
  advisor: 'aspect-[4/5] w-full max-w-[220px] rounded-2xl',
}

const imageSizes: Record<LeaderPortraitVariant, string> = {
  avatar: '96px',
  card: '(min-width: 1024px) 250px, (min-width: 640px) 45vw, calc(100vw - 68px)',
  advisor: '(min-width: 640px) 220px, calc(100vw - 116px)',
}

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export function LeaderPortrait({
  name,
  databaseImage,
  variant,
  className,
  priority = false,
}: LeaderPortraitProps) {
  const resolvedPortrait = resolveLeaderPortrait(name, databaseImage, variant)
  const candidates = getLeaderPortraitCandidates(resolvedPortrait)
  const [failedSources, setFailedSources] = useState<string[]>([])
  const activeCandidate = getActiveLeaderPortraitCandidate(candidates, failedSources)

  return (
    <div
      className={cn(
        'relative shrink-0 overflow-hidden border border-line bg-surface',
        frameStyles[variant],
        className,
      )}
    >
      {activeCandidate ? (
        <Image
          key={activeCandidate.src}
          src={activeCandidate.src}
          alt={`Portrait of ${name}`}
          fill
          sizes={imageSizes[variant]}
          className="object-cover"
          style={{ objectPosition: activeCandidate.objectPosition }}
          priority={priority}
          onError={() => {
            setFailedSources((current) => current.includes(activeCandidate.src) ? current : [...current, activeCandidate.src])
          }}
        />
      ) : (
        <div
          aria-label={`${name} initials`}
          className="flex size-full items-center justify-center text-lg font-semibold tracking-[0.08em] text-muted"
          role="img"
        >
          {getInitials(name)}
        </div>
      )}
    </div>
  )
}
