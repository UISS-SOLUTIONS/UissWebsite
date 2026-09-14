'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { Rss, Search, UserRound, X } from 'lucide-react'
import { ManagedImage } from '@/components/managed-image'

export type BlogIndexPost = {
    slug: string
    title: string
    excerpt?: string
    category?: string
    published: string
    coverImage?: string
    authors: Array<{ name: string; image?: string }>
}

interface BlogGridTwoProps {
    posts: BlogIndexPost[]
    emptyMessage: string
}

const PAGE_SIZE = 9

function AuthorList({ post }: { post: BlogIndexPost }) {
    return (
        <div className="flex min-w-0 items-center gap-2.5">
            <div className="flex -space-x-2" aria-hidden="true">
                {post.authors.slice(0, 3).map((author, index) => (
                    <span key={`${author.name}-${index}`} className="flex size-7 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-canvas bg-surface">
                        {author.image ? <ManagedImage src={author.image} alt="" width={28} height={28} sizes="28px" className="size-full object-cover" /> : <UserRound className="size-3.5 text-muted" strokeWidth={1.5} />}
                    </span>
                ))}
            </div>
            <span className="truncate text-sm text-muted">{post.authors.map((author) => author.name).join(', ')}</span>
        </div>
    )
}

function CoverImage({ post }: { post: BlogIndexPost }) {
    return post.coverImage ? (
        <ManagedImage src={post.coverImage} alt="" fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-200 ease-out group-hover:scale-[1.015]" />
    ) : (
        <div className="flex size-full items-center justify-center bg-surface px-6 text-center text-sm text-muted" role="img" aria-label={`${post.title} cover image unavailable`}>
            Cover image unavailable
        </div>
    )
}

function FeaturedArticle({ post }: { post: BlogIndexPost }) {
    return (
        <article className="group min-w-0">
            <Link href={`/blog/${post.slug}`} className="block">
                <div className="relative aspect-video overflow-hidden rounded-md border border-line bg-surface"><CoverImage post={post} /></div>
                <div className="pt-5">
                    <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
                        <time>{post.published}</time>
                        {post.category ? <><span aria-hidden="true">·</span><span>{post.category}</span></> : null}
                    </div>
                    <h2 className="text-xl font-semibold leading-[1.25] tracking-[-0.015em] text-ink md:text-2xl">{post.title}</h2>
                    {post.excerpt ? <p className="mt-3 line-clamp-2 text-[15px] leading-6 text-muted">{post.excerpt}</p> : null}
                </div>
            </Link>
            <div className="mt-5"><AuthorList post={post} /></div>
        </article>
    )
}

function ArticleCard({ post }: { post: BlogIndexPost }) {
    return (
        <article className="group min-w-0">
            <Link href={`/blog/${post.slug}`} className="block">
                <div className="relative aspect-video overflow-hidden rounded-md border border-line bg-surface"><CoverImage post={post} /></div>
                <div className="pt-4">
                    <div className="mb-2.5 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm text-muted">
                        <time>{post.published}</time>
                        {post.category ? <><span aria-hidden="true">·</span><span>{post.category}</span></> : null}
                    </div>
                    <h3 className="text-lg font-semibold leading-[1.3] tracking-[-0.01em] text-ink">{post.title}</h3>
                    {post.excerpt ? <p className="mt-2.5 line-clamp-2 text-sm leading-6 text-muted">{post.excerpt}</p> : null}
                </div>
            </Link>
            <div className="mt-4"><AuthorList post={post} /></div>
        </article>
    )
}

export function BlogGridTwo({ posts, emptyMessage }: BlogGridTwoProps) {
    const [activeCategory, setActiveCategory] = useState('All')
    const [query, setQuery] = useState('')
    const [searchOpen, setSearchOpen] = useState(false)
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
    const searchRef = useRef<HTMLInputElement>(null)

    const categories = useMemo(() => {
        const unique = new Set(posts.flatMap((post) => post.category ? [post.category] : []))
        return ['All', ...unique]
    }, [posts])

    const filteredPosts = useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase()
        return posts.filter((post) => {
            if (activeCategory !== 'All' && post.category !== activeCategory) return false
            if (!normalizedQuery) return true
            return [post.title, post.excerpt ?? '', post.category ?? '', ...post.authors.map((author) => author.name)]
                .join(' ').toLowerCase().includes(normalizedQuery)
        })
    }, [activeCategory, posts, query])

    const featuredPosts = filteredPosts.slice(0, 2)
    const regularPosts = filteredPosts.slice(2)
    const visiblePosts = regularPosts.slice(0, visibleCount)

    useEffect(() => setVisibleCount(PAGE_SIZE), [activeCategory, query])

    useEffect(() => {
        const handleShortcut = (event: KeyboardEvent) => {
            if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
                event.preventDefault()
                setSearchOpen(true)
                window.setTimeout(() => searchRef.current?.focus(), 0)
            } else if (event.key === 'Escape' && searchOpen) {
                setQuery('')
                setSearchOpen(false)
            }
        }
        window.addEventListener('keydown', handleShortcut)
        return () => window.removeEventListener('keydown', handleShortcut)
    }, [searchOpen])

    const openSearch = () => {
        setSearchOpen(true)
        window.setTimeout(() => searchRef.current?.focus(), 0)
    }

    const closeSearch = () => {
        setQuery('')
        setSearchOpen(false)
    }

    return (
        <main className="bg-canvas text-ink" aria-labelledby="blog-heading">
            <section className="mx-auto w-full max-w-[1024px] px-6 pb-24 pt-16 md:pb-32 md:pt-24">
                <header>
                    <p className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-muted">Blog</p>
                    <h1 id="blog-heading" className="max-w-[448px] text-[36px] font-semibold leading-[40px] tracking-[-0.035em] text-ink">Ideas, updates and stories from UISS.</h1>
                </header>

                <div className="relative mt-10 flex min-w-0 items-center gap-3 border-b border-line pb-4 md:mt-12">
                    <div role="tablist" aria-label="Blog categories" className="-mx-1 flex min-w-0 flex-1 snap-x snap-mandatory gap-1 overflow-x-auto px-1 py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                        {categories.map((category) => (
                            <button key={category} type="button" role="tab" aria-selected={activeCategory === category} onClick={() => setActiveCategory(category)} className={`shrink-0 snap-start rounded-md px-3 py-1.5 text-sm transition-colors ${activeCategory === category ? 'bg-ink font-medium text-canvas' : 'text-muted hover:bg-surface hover:text-ink'}`}>
                                {category}
                            </button>
                        ))}
                    </div>

                    <div className="flex shrink-0 items-center gap-1 border-l border-line pl-3" aria-label="Blog utilities">
                        {searchOpen ? (
                            <div className="absolute left-0 right-0 z-10 flex h-10 items-center gap-2 rounded-md border border-line bg-canvas px-3 shadow-soft md:static md:w-60">
                                <Search aria-hidden="true" className="size-4 shrink-0 text-muted" strokeWidth={1.75} />
                                <input ref={searchRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search articles" aria-label="Search articles" className="min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-muted" />
                                <button type="button" onClick={closeSearch} className="uiss-pressable rounded-md p-1 text-muted hover:bg-surface hover:text-ink" aria-label="Close search"><X aria-hidden="true" className="size-4" /></button>
                            </div>
                        ) : (
                            <button type="button" onClick={openSearch} className="uiss-pressable inline-flex size-9 items-center justify-center rounded-md text-muted hover:bg-surface hover:text-ink" aria-label="Search articles" title="Search articles (Cmd/Ctrl+K)"><Search aria-hidden="true" className="size-[18px]" strokeWidth={1.75} /></button>
                        )}
                        <Link href="/rss.xml" className="uiss-pressable inline-flex size-9 items-center justify-center rounded-md text-muted hover:bg-surface hover:text-ink" aria-label="RSS feed"><Rss aria-hidden="true" className="size-[18px]" strokeWidth={1.75} /></Link>
                    </div>
                </div>

                {filteredPosts.length ? (
                    <>
                        <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-12 md:mt-12 md:grid-cols-2">
                            {featuredPosts.map((post) => <FeaturedArticle key={post.slug} post={post} />)}
                        </div>

                        {regularPosts.length ? (
                            <section className="mt-20 md:mt-24" aria-labelledby="more-articles-heading">
                                <h2 id="more-articles-heading" className="border-b border-line pb-5 text-2xl font-semibold tracking-[-0.025em]">More Articles</h2>
                                <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                                    {visiblePosts.map((post) => <ArticleCard key={post.slug} post={post} />)}
                                </div>
                                {visibleCount < regularPosts.length ? (
                                    <div className="mt-14 flex justify-center">
                                        <button type="button" onClick={() => setVisibleCount((count) => count + PAGE_SIZE)} className="rounded-md border border-line bg-canvas px-5 py-2.5 text-sm font-semibold text-ink shadow-soft transition-colors hover:bg-surface active:translate-y-px">Load more</button>
                                    </div>
                                ) : null}
                            </section>
                        ) : null}
                    </>
                ) : (
                    <div className="mt-12 border-y border-line py-16 text-center text-muted">
                        <p>{posts.length ? 'No stories match your search.' : emptyMessage}</p>
                        {posts.length && (query || activeCategory !== 'All') ? (
                            <button type="button" onClick={() => { setQuery(''); setSearchOpen(false); setActiveCategory('All') }} className="mt-4 text-sm font-semibold text-ink underline decoration-line underline-offset-4 hover:decoration-ink">Clear filters</button>
                        ) : null}
                    </div>
                )}
            </section>
        </main>
    )
}
