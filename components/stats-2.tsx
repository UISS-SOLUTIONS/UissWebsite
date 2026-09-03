const stats = [
    { value: '—', label: 'Active members' },
    { value: '—', label: 'Programs delivered' },
    { value: '—', label: 'Student projects' },
    { value: '—', label: 'Community partners' },
]

export default function StatsSection() {
    return (
        <section id="impact" className="uiss-proof bg-canvas py-20 text-ink sm:py-28">
            <div className="mx-auto max-w-6xl px-6">
                <div className="max-w-2xl">
                    <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand">Verified impact</p>
                    <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">Proof belongs in focused, dark sections.</h2>
                    <p className="mt-5 text-lg leading-8 text-muted">Figures remain deliberately blank until the UISS team supplies verified data.</p>
                </div>
                <dl className="mt-14 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat) => (
                        <div key={stat.label} className="bg-surface p-7">
                            <dt className="text-sm font-semibold text-muted">{stat.label}</dt>
                            <dd className="mt-3 text-5xl font-bold text-ink">{stat.value}</dd>
                        </div>
                    ))}
                </dl>
            </div>
        </section>
    )
}
