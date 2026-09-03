/* eslint-disable @next/next/no-img-element -- Zenblog cover images may use administrator-selected hosts. */
import Link from 'next/link'
import { ArrowRight, Newspaper } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export type Blog7Post = {
    id: string
    title: string
    summary?: string
    label: string
    author: string
    published: string
    url: string
    image?: string
}

interface Blog7Props {
    tagline?: string
    heading?: string
    description?: string
    posts?: Blog7Post[]
    emptyMessage?: string
    className?: string
}

const previewPosts: Blog7Post[] = [
    { id: 'preview-1', title: 'First UISS story', summary: 'A visual placeholder for an article published through the connected Zenblog account.', label: 'Preview', author: 'UISS administrator', published: 'Publication pending', url: '/blog', image: '/welcomeBg.jpg' },
    { id: 'preview-2', title: 'Community update', summary: 'This card will receive its title, excerpt, author, date, and image directly from Zenblog.', label: 'Preview', author: 'UISS administrator', published: 'Publication pending', url: '/blog', image: '/ctfWinner.jpg' },
    { id: 'preview-3', title: 'Project spotlight', summary: 'Newly published articles are checked and refreshed on the website every hour.', label: 'Preview', author: 'UISS administrator', published: 'Publication pending', url: '/blog', image: '/construction.png' },
]

const Blog7 = ({
    tagline = 'Latest updates',
    heading = 'UISS blog',
    description = 'Ideas, updates, and stories written by the authorized UISS administrator and published through Zenblog.',
    posts = previewPosts,
    emptyMessage = 'The Zenblog publication is connected. Your first published article will appear here automatically, with new publications checked hourly.',
    className,
}: Blog7Props) => (
    <section className={cn('py-24 sm:py-32', className)}>
        <div className="container mx-auto flex flex-col items-center gap-10 px-6">
            <div className="max-w-3xl text-center">
                <Badge variant="secondary">{tagline}</Badge>
                <h1 className="mt-6 text-balance text-5xl font-bold tracking-tight text-ink sm:text-6xl">{heading}</h1>
                <p className="mt-5 text-lg leading-8 text-muted">{description}</p>
            </div>
            {posts.length > 0 ? (
                <div className="grid w-full gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {posts.map((post) => (
                        <Card key={post.id} className="grid overflow-hidden">
                            {post.image ? <Link href={post.url} className="block aspect-video overflow-hidden"><img src={post.image} alt="" className="size-full object-cover transition duration-300 hover:scale-105" /></Link> : null}
                            <CardHeader>
                                <Badge variant="outline" className="w-fit">{post.label}</Badge>
                                <CardTitle className="mt-4 text-2xl leading-tight"><Link href={post.url} className="hover:underline">{post.title}</Link></CardTitle>
                                <p className="mt-2 text-sm font-semibold text-muted">{post.author} · {post.published}</p>
                            </CardHeader>
                            <CardContent>{post.summary ? <p className="leading-7 text-muted">{post.summary}</p> : null}</CardContent>
                            <CardFooter>
                                <Link href={post.url} className="flex items-center gap-2 font-semibold text-ink hover:underline">Read more<ArrowRight aria-hidden /></Link>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="flex w-full max-w-3xl flex-col items-center rounded-lg border border-dashed border-line bg-surface p-10 text-center">
                    <Newspaper className="size-10 text-muted" aria-hidden />
                    <h2 className="mt-5 text-2xl font-bold text-ink">Stories are being prepared.</h2>
                    <p className="mt-3 max-w-xl leading-7 text-muted">{emptyMessage}</p>
                </div>
            )}
        </div>
    </section>
)

export { Blog7 }
