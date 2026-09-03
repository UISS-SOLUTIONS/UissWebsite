import type { Metadata } from 'next'
import { About3 } from '@/components/about3'
import { Blog7, type Blog7Post } from '@/components/blog7'
import { Community1 } from '@/components/community1'
import { Cta4 } from '@/components/cta4'
import Footer from '@/components/footer-2'
import { HeroHeader } from '@/components/header'
import { ClubShowcase, type ClubPreview } from '@/components/home/club-showcase'
import { EventShowcase, type EventPreview } from '@/components/home/event-showcase'
import { Hero12 } from '@/components/hero12'
import { Projects5, type ProjectPreview } from '@/components/projects5'
import { Team1, type TeamMember } from '@/components/team1'
import { getHomepageData } from '@/lib/homepage-data'

export const metadata: Metadata = {
    title: 'UISS | Learn, build, and lead',
    description: 'The University of Dar es Salaam ICT Students’ Society connects students through practical learning, projects, events, and technical communities.',
}

export const revalidate = 3600

const dateFormatter = new Intl.DateTimeFormat('en-TZ', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Africa/Dar_es_Salaam',
})

export default async function Home() {
    const data = await getHomepageData()
    const hero = data.hero.data

    const clubPreviews: ClubPreview[] = data.clubs.data.map((club) => ({
        id: String(club.id),
        title: club.title,
        summary: club.summary,
        disciplines: club.disciplines,
        url: '/clubs',
    }))

    const eventPreviews: EventPreview[] = data.events.data.map((event) => ({
        id: String(event.id),
        title: event.title,
        summary: event.summary,
        date: dateFormatter.format(event.startsAt),
        location: event.location ?? undefined,
        registrationStatus: event.registrationStatus,
        url: '/events',
    }))

    const projectPreviews: ProjectPreview[] = data.projects.data.map((project) => ({
        id: String(project.id),
        title: project.title,
        image: project.coverMedia?.url,
        status: project.status,
        type: project.techStack.slice(0, 2).join(' · ') || `UISS project · ${project.year}`,
        url: '/projects',
    }))

    const teamMembers: TeamMember[] = data.leaders.data.map((leader) => ({
        id: String(leader.id),
        name: `${leader.firstName} ${leader.lastName}`,
        role: leader.position.title,
        avatar: leader.imageURL || undefined,
    }))

    const blogPosts: Blog7Post[] = data.blog.posts.slice(0, 3).map((post) => ({
        id: post.slug,
        title: post.title,
        summary: post.excerpt,
        label: post.category?.name ?? 'UISS',
        author: post.authors.map((author) => author.name).join(', ') || 'UISS',
        published: dateFormatter.format(new Date(post.published_at)),
        url: `/blog/${post.slug}`,
        image: post.cover_image,
    }))

    const blogEmptyMessage = data.blog.unavailable
        ? 'The UISS blog is connected, but articles could not be loaded right now. Please try again later.'
        : data.blog.configured
            ? 'The UISS blog is connected. The first published article will appear here automatically, with new publications checked hourly.'
            : 'Published UISS stories will appear here after the blog connection is configured.'

    return (
        <div className="min-h-screen bg-canvas text-ink">
            <HeroHeader />
            <main>
                <Hero12
                    eyebrow={hero?.section === 'homepage' ? 'University of Dar es Salaam' : undefined}
                    heading={hero?.heading}
                    highlightedHeading={hero?.subheading}
                    description={hero?.description}
                />
                <About3
                    stats={[]}
                    sections={[
                        { title: 'Our purpose', content: 'UISS brings ICT students together around practical learning, technical collaboration, leadership, and professional growth.' },
                        { title: 'Our community', content: 'Students can discover clubs, take part in events, share useful ideas, and turn classroom knowledge into practical work.' },
                    ]}
                />
                <ClubShowcase clubs={clubPreviews} unavailable={data.clubs.unavailable} />
                <Projects5
                    heading="Work built by UISS students."
                    description="Explore practical projects created by students across the UISS community."
                    projects={projectPreviews}
                    emptyMessage={data.projects.unavailable ? 'Project information could not be loaded right now. Please try again later.' : undefined}
                />
                <EventShowcase events={eventPreviews} unavailable={data.events.unavailable} />
                <Team1
                    heading="Meet the UISS leadership team."
                    description="The student leaders coordinating the society, its programs, and its community."
                    members={teamMembers}
                    emptyMessage={data.leaders.unavailable ? 'Leadership information could not be loaded right now. Please try again later.' : undefined}
                />
                <Blog7
                    headingLevel="h2"
                    heading="Ideas and stories from our community."
                    posts={blogPosts}
                    emptyMessage={blogEmptyMessage}
                    className="bg-surface"
                />
                <Community1 />
                <Cta4 />
            </main>
            <Footer />
        </div>
    )
}
