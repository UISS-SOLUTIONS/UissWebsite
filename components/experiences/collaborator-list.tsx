import { cn } from '@/lib/utils'
import type { Collaborator } from '@/lib/experience-catalog'

type CollaboratorListProps = {
  items: Collaborator[]
  className?: string
}

function CollaboratorContent({ collaborator }: { collaborator: Collaborator }) {
  return (
    <>
      {collaborator.logo ? (
        // eslint-disable-next-line @next/next/no-img-element -- approved logos may be local or externally managed.
        <img src={collaborator.logo} alt="" className="h-9 w-24 shrink-0 object-contain object-left" />
      ) : (
        <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-brand font-bold text-brand-ink" aria-hidden>
          {collaborator.name.charAt(0)}
        </span>
      )}
      <span>
        <span className="block font-bold text-ink">{collaborator.name}</span>
        {collaborator.role ? <span className="mt-1 block text-sm text-muted">{collaborator.role}</span> : null}
      </span>
    </>
  )
}

export function CollaboratorList({ items, className }: CollaboratorListProps) {
  if (!items.length) return null

  return (
    <ul className={cn('grid gap-3 sm:grid-cols-2', className)}>
      {items.map((collaborator) => (
        <li key={collaborator.name} className="rounded-lg border border-line bg-canvas p-4">
          {collaborator.href ? (
            <a href={collaborator.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 rounded-sm hover:underline hover:underline-offset-4">
              <CollaboratorContent collaborator={collaborator} />
            </a>
          ) : (
            <div className="flex items-center gap-4"><CollaboratorContent collaborator={collaborator} /></div>
          )}
        </li>
      ))}
    </ul>
  )
}
