import Link from 'next/link'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const faqs = [
    { question: 'Who can join UISS?', answer: 'Membership guidance and eligibility should follow the approved UISS constitution and the current membership process.' },
    { question: 'What does UISS offer?', answer: 'The site will organize programs, clubs, events, news, and practical learning opportunities in one consistent system.' },
    { question: 'How will impact figures be handled?', answer: 'Only verified figures supplied by the authorized UISS team will be published.' },
    { question: 'Where can I ask another question?', answer: 'Use the contact section or write to the official recipient address shown there.' },
]

export default function FAQs() {
    return (
        <section id="faq" className="py-20 sm:py-28">
            <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[0.75fr_1.25fr]">
                <div>
                    <p className="text-sm font-bold uppercase tracking-[0.18em] text-muted">FAQ</p>
                    <h2 className="mt-4 text-4xl font-bold tracking-tight text-ink sm:text-5xl">Clear answers, without clutter.</h2>
                    <p className="mt-5 text-muted">Still need help? <Link href="#contact" className="font-semibold text-ink underline underline-offset-4">Contact UISS</Link>.</p>
                </div>
                <Accordion type="single" collapsible className="border-t border-line">
                    {faqs.map((faq, index) => (
                        <AccordionItem key={faq.question} value={`item-${index}`}>
                            <AccordionTrigger>{faq.question}</AccordionTrigger>
                            <AccordionContent className="max-w-2xl text-base leading-7 text-muted">{faq.answer}</AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    )
}
