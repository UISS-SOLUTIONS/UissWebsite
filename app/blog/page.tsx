import type { Metadata } from 'next'
import { Blog7, type Blog7Post } from '@/components/blog7'
import { listZenblogPosts } from '@/lib/zenblog'

export const metadata: Metadata = {
    title: 'Blog | UISS',
    description: 'Ideas, updates, and stories from the UISS community.',
}

export const revalidate = 3600

const dateFormatter = new Intl.DateTimeFormat('en-TZ', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Africa/Dar_es_Salaam',
})

export default async function BlogPage() {
    const result = await listZenblogPosts()
    const posts: Blog7Post[] = result.posts.map((post) => ({
        id: post.slug,
        title: post.title,
        summary: post.excerpt,
        label: post.category?.name ?? 'UISS',
        author: post.authors.map((author) => author.name).join(', ') || 'UISS',
        published: dateFormatter.format(new Date(post.published_at)),
        url: `/blog/${post.slug}`,
        image: post.cover_image,
    }))

    const emptyMessage = result.unavailable
        ? 'The Zenblog publication is connected, but articles could not be loaded right now. Please try again later.'
        : result.configured
            ? 'The Zenblog publication is connected. Your first published article will appear here automatically, with new publications checked hourly.'
            : 'The blog route is ready and will display published Zenblog articles after the blog ID is connected.'

    return (
        <main>
            <Blog7
                heading="Ideas and stories from our community."
                posts={posts}
                emptyMessage={emptyMessage}
            />
        </main>
    )
}
