/* eslint-disable @next/next/no-img-element -- Zenblog cover images may use administrator-selected hosts. */
import type { ReactNode } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface Blogpost1Props {
    className?: string
    title: string
    description?: string
    category?: string
    authors?: Array<{ name: string; image?: string }>
    image?: string
    published: string
    children: ReactNode
}

const Blogpost1 = ({ className, title, description, category, authors = [], image, published, children }: Blogpost1Props) => (
    <article className={cn('py-20 sm:py-28', className)}>
        <div className="container mx-auto px-6">
            <header className="mx-auto flex max-w-4xl flex-col items-center text-center">
                {category ? <Badge variant="secondary">{category}</Badge> : null}
                <h1 className="mt-6 max-w-3xl text-balance text-5xl font-bold tracking-tight text-ink sm:text-6xl">{title}</h1>
                {description ? <p className="mt-6 max-w-2xl text-xl leading-8 text-muted">{description}</p> : null}
                <div className="mt-7 flex flex-wrap items-center justify-center gap-3 text-sm text-muted">
                    {authors.map((author) => (
                        <span key={author.name} className="flex items-center gap-2 font-semibold text-ink">
                            <Avatar className="size-8 border border-line">
                                {author.image ? <AvatarImage src={author.image} alt="" /> : null}
                                <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            {author.name}
                        </span>
                    ))}
                    <time>{published}</time>
                </div>
                {image ? <img src={image} alt="" className="mt-10 aspect-video w-full rounded-lg border border-line object-cover shadow-soft" /> : null}
            </header>
            <div className="mx-auto mt-14 max-w-3xl">{children}</div>
        </div>
    </article>
)

export { Blogpost1 }
