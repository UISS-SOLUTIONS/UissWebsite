import type { Metadata } from 'next'

import { BlogGridTwo, type BlogIndexPost } from '@/components/blog-grid-two'
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
    const posts: BlogIndexPost[] = result.posts.map((post) => ({
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        category: post.category?.name,
        published: dateFormatter.format(new Date(post.published_at)),
        coverImage: post.cover_image,
        authors: post.authors.length
            ? post.authors.map((author) => ({ name: author.name, image: author.image_url }))
            : [{ name: 'UISS' }],
    }))

    const emptyMessage = result.unavailable
        ? 'The Zenblog publication is connected, but articles could not be loaded right now. Please try again later.'
        : result.configured
            ? 'The Zenblog publication is connected. Your first published article will appear here automatically, with new publications checked hourly.'
            : 'The blog route is ready and will display published Zenblog articles after the blog ID is connected.'

    return <BlogGridTwo posts={posts} emptyMessage={emptyMessage} />
}
