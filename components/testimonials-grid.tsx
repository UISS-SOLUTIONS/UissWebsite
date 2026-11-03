export function TestimonialsGrid({
  items,
}: {
  items: {
    id: number;
    text: string;
    firstName: string;
    lastName: string;
    publishedAt: Date | null;
  }[];
}) {
  if (!items.length) return null;

  return (
    <section className="uiss-section bg-canvas">
      <div className="uiss-container">
        <h2 className="uiss-section-title">What members say</h2>
        <div className="mt-8 grid sm:mt-10 gap-5 md:grid-cols-3">
          {items.map((x) => (
            <figure className="rounded-lg bg-panel shadow-border p-6" key={x.id}>
              <blockquote className="leading-7 text-muted">“{x.text}”</blockquote>
              <figcaption className="mt-6 font-semibold">
                {x.firstName} {x.lastName}
                <span className="block text-sm font-normal text-muted">UISS member</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
