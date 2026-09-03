const testimonials = [
    { quote: 'An approved member story will appear here once the speaker and wording are confirmed.', name: 'Member name', role: 'Program or role' },
    { quote: 'Use this space for a concise, specific outcome instead of a generic endorsement.', name: 'Alumni name', role: 'Graduation year' },
    { quote: 'Partner testimonials must be verified before publication.', name: 'Partner name', role: 'Organization' },
]

export default function TestimonialSection() {
    return (
        <section className="bg-surface py-20 sm:py-28">
            <div className="mx-auto max-w-6xl px-6">
                <div className="max-w-2xl">
                    <p className="text-sm font-bold uppercase tracking-[0.18em] text-muted">Community voices</p>
                    <h2 className="mt-4 text-4xl font-bold tracking-tight text-ink sm:text-5xl">A structure ready for real stories.</h2>
                    <p className="mt-5 text-lg leading-8 text-muted">The gallery uses explicit placeholders so no endorsement is implied before approval.</p>
                </div>
                <div className="mt-12 grid gap-6 lg:grid-cols-3">
                    {testimonials.map((testimonial) => (
                        <figure key={testimonial.name} className="flex min-h-64 flex-col justify-between rounded-lg border border-line bg-canvas p-7 shadow-soft">
                            <blockquote className="text-xl leading-8 text-ink">“{testimonial.quote}”</blockquote>
                            <figcaption className="mt-8 border-t border-line pt-5">
                                <p className="font-bold text-ink">{testimonial.name}</p>
                                <p className="text-sm text-muted">{testimonial.role}</p>
                            </figcaption>
                        </figure>
                    ))}
                </div>
            </div>
        </section>
    )
}
