import 'server-only'
import { cache } from 'react'
import { createZenblogClient } from 'zenblog'
import type { Post, PostWithContent } from 'zenblog/types'

const blogId = process.env.ZENBLOG_BLOG_ID?.trim()
const client = blogId ? createZenblogClient({ blogId }) : null

export type ZenblogPostsResult = {
    configured: boolean
    posts: Post[]
    unavailable: boolean
}

export async function listZenblogPosts(): Promise<ZenblogPostsResult> {
    if (!client) {
        return { configured: false, posts: [], unavailable: false }
    }

    try {
        const { data } = await client.posts.list({ limit: 50 })
        return {
            configured: true,
            posts: data.toSorted((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime()),
            unavailable: false,
        }
    } catch (error) {
        console.error('[UISS blog] Zenblog posts could not be loaded.', error)
        return { configured: true, posts: [], unavailable: true }
    }
}

export const getZenblogPost = cache(async (slug: string): Promise<PostWithContent | null> => {
    if (!client) return null

    try {
        const { data } = await client.posts.get({ slug })
        return data ?? null
    } catch (error) {
        console.error(`[UISS blog] Zenblog post "${slug}" could not be loaded.`, error)
        return null
    }
})

export function isZenblogConfigured() {
    return Boolean(client)
}
