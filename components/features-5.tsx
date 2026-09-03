import { Code2, Network, Rocket, Users } from 'lucide-react'

const features = [
    { icon: Code2, title: 'Practical learning', body: 'Workshops and peer-led sessions turn classroom knowledge into applied skills.' },
    { icon: Network, title: 'Connected community', body: 'Meet students, alumni, educators, and professionals across the ICT ecosystem.' },
    { icon: Rocket, title: 'Projects and programs', body: 'Build useful work through clubs, challenges, events, and collaborative programs.' },
    { icon: Users, title: 'Student leadership', body: 'Develop the confidence and experience to lead teams and serve the community.' },
]

export default function Features() {
    return (
        <section id="programs" className="bg-surface py-20 sm:py-28">
            <div className="mx-auto max-w-6xl px-6">
                <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
                    <div>
                        <p className="text-sm font-bold uppercase tracking-[0.18em] text-muted">What members gain</p>
                        <h2 className="mt-4 text-balance text-4xl font-bold tracking-tight text-ink sm:text-5xl">A community built around doing the work.</h2>
                    </div>
                    <div className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
                        {features.map(({ icon: Icon, title, body }) => (
                            <article key={title} className="bg-canvas p-7">
                                <div className="mb-8 flex h-11 w-11 items-center justify-center rounded-md bg-brand text-[#111111]"><Icon /></div>
                                <h3 className="text-xl font-bold text-ink">{title}</h3>
                                <p className="mt-3 leading-7 text-muted">{body}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
