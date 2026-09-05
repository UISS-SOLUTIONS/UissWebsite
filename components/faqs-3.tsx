import Link from 'next/link'
import { MotionAccordion, type MotionAccordionItem } from '@/components/unlumen-ui/motion-faqs-accordion'

const faqs: MotionAccordionItem[] = [
    { question: 'Who can join UISS?', answer: 'Membership guidance and eligibility should follow the approved UISS constitution and the current membership process.' },
    { question: 'Do I need technical experience to participate?', answer: 'No. UISS is a learning community, so curiosity and a willingness to take part matter more than arriving with advanced experience.' },
    { question: 'Which technical clubs can I explore?', answer: 'UISS currently brings together Networking, Artificial Intelligence, Software Development, UI/UX and Graphics Design, Data Science, and Blockchain clubs.' },
    { question: 'Where can I find upcoming activities?', answer: 'Published workshops, meetups, and society activities appear on the Events page, while announcements and community stories appear on the Blog.' },
    { question: 'How can I contact UISS?', answer: 'Use the official contact details in the website footer if your question is not answered here.' },
]

export default function FAQs() {
    return (
        <section id="faq" className="bg-canvas py-20 sm:py-28">
            <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
                <div>
                    <p className="text-sm font-bold uppercase tracking-[0.18em] text-muted">FAQ</p>
                    <h2 className="mt-4 text-4xl font-bold tracking-tight text-ink sm:text-5xl">Questions students often ask.</h2>
                    <p className="mt-5 max-w-sm leading-7 text-muted">A quick guide to joining, finding a club, and keeping up with UISS. Still need help? <Link href="mailto:udsmict1@gmail.com" className="font-semibold text-ink underline underline-offset-4">Contact UISS</Link>.</p>
                </div>
                <MotionAccordion items={faqs} gap={12} className="-mx-3 -my-3" />
            </div>
        </section>
    )
}
