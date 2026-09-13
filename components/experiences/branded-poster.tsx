import { cn } from '@/lib/utils'
import type { ExperienceMedia } from '@/lib/experience-catalog'

type BrandedPosterProps = {
  title: string
  label: string
  kind: 'event' | 'project'
  media?: ExperienceMedia
  className?: string
}

export function BrandedPoster({ title, label, kind, media, className }: BrandedPosterProps) {
  if (media) {
    return (
      <div className={cn('relative overflow-hidden rounded-lg bg-surface', className)}>
        {/* eslint-disable-next-line @next/next/no-img-element -- database media may come from any approved host. */}
        <img
          src={media.src}
          alt={media.alt}
          width={media.width ?? undefined}
          height={media.height ?? undefined}
          className="h-full w-full object-cover transition-transform duration-200 ease-out group-hover:scale-[1.015]"
        />
      </div>
    )
  }

  return (
    <div
      className={cn(
        'relative isolate overflow-hidden rounded-lg bg-ink text-canvas',
        'before:absolute before:-right-[18%] before:-top-[28%] before:size-[72%] before:rounded-full before:border-[3rem] before:border-brand/80',
        'after:absolute after:-bottom-[42%] after:-left-[12%] after:size-[74%] after:rounded-full after:border-[1px] after:border-canvas/20',
        className,
      )}
      role="img"
      aria-label={`${title} ${kind} artwork`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_18%,rgba(239,182,49,0.16),transparent_36%),linear-gradient(135deg,transparent_0%,rgba(255,255,255,0.05)_100%)]" />
      <div className="relative flex h-full min-h-56 flex-col justify-between p-6 sm:p-8" aria-hidden="true">
        <span className="max-w-max border-b border-brand pb-2 text-xs font-bold uppercase tracking-[0.16em] text-canvas/70">
          {kind === 'event' ? 'UISS experience' : 'UISS project'}
        </span>
        <div className="max-w-[86%]">
          <p className="text-sm font-semibold text-brand">{label}</p>
          <p className="mt-3 text-2xl font-bold leading-tight tracking-tight sm:text-3xl">{title}</p>
        </div>
      </div>
    </div>
  )
}
