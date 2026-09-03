import { ArrowRight, BookOpen, Lightbulb, Trophy } from 'lucide-react'

const paths = [
    { icon: BookOpen, title: 'Learn together', body: 'Join focused sessions that supplement coursework with practical context.' },
    { icon: Lightbulb, title: 'Build together', body: 'Move from an idea to a working project with peers who can help.' },
    { icon: Trophy, title: 'Grow together', body: 'Take part in challenges, leadership, and career-building opportunities.' },
]

export default function ContentSection() {
    return (
        <section id="about" className="py-20 sm:py-28">
            <div className="mx-auto max-w-6xl px-6">
                <div className="max-w-3xl">
                    <p className="text-sm font-bold uppercase tracking-[0.18em] text-muted">The UISS path</p>
                    <h2 className="mt-4 text-balance text-4xl font-bold tracking-tight text-ink sm:text-5xl">From curious student to capable contributor.</h2>
                    <p className="mt-5 max-w-2xl text-xl leading-8 text-muted">The component system gives every UISS program a consistent way to explain its purpose, evidence, and next step.</p>
                </div>
                <div className="mt-14 grid gap-8 border-t border-line pt-10 md:grid-cols-3">
                    {paths.map(({ icon: Icon, title, body }) => (
                        <article key={title}>
                            <Icon className="h-6 w-6 text-ink" />
                            <h3 className="mt-6 text-xl font-bold text-ink">{title}</h3>
                            <p className="mt-3 leading-7 text-muted">{body}</p>
                            <ArrowRight className="mt-6 h-5 w-5 text-muted" aria-hidden="true" />
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}
