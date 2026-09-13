import { listZenblogPosts } from '@/lib/zenblog'

export const revalidate = 3600

const channelDescription = 'Ideas, updates, and stories from the UISS community.'

function escapeXml(value: string) {
    return value.replace(/[<>&'\"]/g, (character) => ({
        '<': '&lt;',
        '>': '&gt;',
        '&': '&amp;',
        "'": '&apos;',
        '"': '&quot;',
    })[character] ?? character)
}

export async function GET(request: Request) {
    const result = await listZenblogPosts()
    const origin = new URL(request.url).origin
    const blogUrl = new URL('/blog', origin).toString()
    const items = result.posts.map((post) => {
        const articleUrl = new URL(`/blog/${encodeURIComponent(post.slug)}`, origin).toString()
        return `<item><title>${escapeXml(post.title)}</title><description>${escapeXml(post.excerpt ?? '')}</description><link>${escapeXml(articleUrl)}</link><pubDate>${new Date(post.published_at).toUTCString()}</pubDate><guid isPermaLink="true">${escapeXml(articleUrl)}</guid></item>`
    }).join('')

    const xml = `<?xml version="1.0" encoding="UTF-8" ?><rss version="2.0"><channel><title>UISS Blog</title><description>${escapeXml(channelDescription)}</description><link>${escapeXml(blogUrl)}</link>${items}</channel></rss>`

    return new Response(xml, {
        headers: {
            'Content-Type': 'application/rss+xml; charset=utf-8',
        },
    })
}
