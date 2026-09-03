import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'

const members = [
    { initials: 'PN', name: 'President name', role: 'President' },
    { initials: 'VN', name: 'Vice president name', role: 'Vice President' },
    { initials: 'SN', name: 'Secretary name', role: 'Secretary' },
    { initials: 'TN', name: 'Treasurer name', role: 'Treasurer' },
]

export default function TeamSection() {
    return (
        <section className="bg-surface py-20 sm:py-28">
            <div className="mx-auto max-w-6xl px-6">
                <div className="max-w-2xl">
                    <p className="text-sm font-bold uppercase tracking-[0.18em] text-muted">Leadership</p>
                    <h2 className="mt-4 text-4xl font-bold tracking-tight text-ink sm:text-5xl">A flexible team pattern.</h2>
                    <p className="mt-5 text-lg leading-8 text-muted">Names and portraits remain placeholders until the current leadership record is populated.</p>
                </div>
                <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {members.map((member) => (
                        <HoverCard key={member.role} openDelay={200}>
                            <HoverCardTrigger className="flex cursor-default items-center gap-4 rounded-lg border border-line bg-canvas p-5 text-left">
                                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand font-bold text-[#111111]">{member.initials}</span>
                                <span><span className="block font-bold text-ink">{member.name}</span><span className="block text-sm text-muted">{member.role}</span></span>
                            </HoverCardTrigger>
                            <HoverCardContent align="start"><p className="font-bold">{member.role}</p><p className="mt-2 text-sm leading-6 text-muted">Approved biography and contact links can be added here.</p></HoverCardContent>
                        </HoverCard>
                    ))}
                </div>
            </div>
        </section>
    )
}
