import type { ReactNode } from 'react'
import Link from 'next/link'
import { ChevronRight, UserRound } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ManagedImage } from '@/components/managed-image'

export interface BlogArticleTwoProps {
    title: string
    description?: string
    category?: string
    authors?: Array<{ name: string; image?: string }>
    image?: string
    published: string
    children: ReactNode
}

function ArticleRail({ children, className }: { children: ReactNode; className?: string }) {
    return (
        <div className="grid grid-cols-[10px_minmax(0,1fr)_10px] lg:grid-cols-[minmax(0,1fr)_minmax(0,69rem)_minmax(0,1fr)]">
            <div aria-hidden="true" className="border-r border-line bg-canvas" />
            <div className="min-w-0 border-x border-line bg-canvas p-px">
                <div className={cn('rounded-md bg-canvas p-6 lg:p-12', className)}>{children}</div>
            </div>
            <div aria-hidden="true" className="border-l border-line bg-canvas" />
        </div>
    )
}

function AuthorMark({ author }: { author: NonNullable<BlogArticleTwoProps['authors']>[number] }) {
    return (
        <span className="inline-flex min-w-0 items-center gap-2 text-sm text-muted">
            <span
                className="flex size-6 shrink-0 items-center justify-center overflow-hidden rounded-md border border-line bg-canvas"
                role={author.image ? undefined : 'img'}
                aria-label={author.image ? undefined : `${author.name} avatar unavailable`}
            >
                {author.image ? <ManagedImage src={author.image} alt={author.name} width={24} height={24} sizes="24px" className="size-full object-cover" /> : <UserRound aria-hidden="true" className="size-3.5" strokeWidth={1.5} />}
            </span>
            <span className="line-clamp-1 text-ink">{author.name}</span>
        </span>
    )
}

export function BlogArticleTwo({ title, description, category, authors = [], image, published, children }: BlogArticleTwoProps) {
    return (
        <article className="overflow-hidden bg-canvas">
            <ArticleRail>
                <header className="mx-auto max-w-2xl">
                    <nav aria-label="Breadcrumb">
                        <ol className="flex flex-wrap items-center gap-2 text-sm text-muted">
                            <li>
                                <Link href="/blog" className="transition-colors hover:text-ink">
                                    Blog
                                </Link>
                            </li>
                            {category ? (
                                <>
                                    <li aria-hidden="true" className="text-muted">
                                        <ChevronRight aria-hidden="true" className="size-3.5" />
                                    </li>
                                    <li aria-current="page" className="text-ink">
                                        {category}
                                    </li>
                                </>
                            ) : null}
                        </ol>
                    </nav>
                    <h1 className="my-6 text-balance text-3xl font-bold tracking-tight text-ink md:text-4xl">{title}</h1>
                    {description ? <p className="text-xl leading-8 text-ink">{description}</p> : null}
                </header>
            </ArticleRail>

            <ArticleRail className="lg:px-12 lg:py-6">
                <div className="mx-auto flex max-w-2xl flex-wrap items-center justify-between gap-4">
                    {authors.length ? (
                        <div className="flex min-w-0 flex-wrap items-center gap-4">
                            {authors.map((author) => <AuthorMark key={author.name} author={author} />)}
                        </div>
                    ) : null}
                    <time className="text-sm text-muted">{published}</time>
                </div>
            </ArticleRail>

            <ArticleRail>
                <div className="mx-auto max-w-2xl">
                    {image ? (
                        <div className="relative mb-12 overflow-hidden rounded-lg border border-line bg-surface">
                            <ManagedImage src={image} alt={title} width={672} height={378} sizes="(min-width: 768px) 672px, 100vw" quality={70} className="aspect-video w-full object-cover" priority />
                        </div>
                    ) : (
                        <div className="mb-12 flex aspect-video items-center justify-center rounded-lg border border-line bg-canvas text-sm text-muted" role="img" aria-label={`${title} cover image unavailable`}>
                            Cover image unavailable
                        </div>
                    )}
                    <div data-blog-article className="zenblog-content zenblog-content--quartz">{children}</div>
                </div>
            </ArticleRail>
        </article>
    )
}
