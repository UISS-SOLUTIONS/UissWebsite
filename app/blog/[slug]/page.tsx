import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BlogArticleTwo } from '@/components/blog-article-two'
import { BlogReadingProgress } from '@/components/blog-reading-progress'
import { getZenblogPost } from '@/lib/zenblog'

type BlogPostPageProps = { params: Promise<{ slug: string }> }

export const revalidate = 3600
export const dynamicParams = true

const dateFormatter = new Intl.DateTimeFormat('en-TZ', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Africa/Dar_es_Salaam',
})

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const { slug } = await params
    const post = await getZenblogPost(slug)

    if (!post) return { title: 'Article not found | UISS' }

    return {
        title: `${post.title} | UISS`,
        description: post.excerpt,
    }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params
    const post = await getZenblogPost(slug)

    if (!post) notFound()

    return (
        <main id="article-introduction" className="bg-canvas">
            <BlogReadingProgress />
            <BlogArticleTwo
                title={post.title}
                description={post.excerpt}
                category={post.category?.name}
                authors={post.authors.length ? post.authors.map((author) => ({ name: author.name, image: author.image_url })) : [{ name: 'UISS' }]}
                image={post.cover_image}
                published={dateFormatter.format(new Date(post.published_at))}
            >
                <div dangerouslySetInnerHTML={{ __html: post.html_content }} />
            </BlogArticleTwo>
        </main>
    )
}
