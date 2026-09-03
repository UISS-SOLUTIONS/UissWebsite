'use client'

import { motion } from 'motion/react'
import { Badge } from '@/components/ui/badge'
import { TestimonialsColumn, type TestimonialItem } from '@/components/ui/testimonials-columns-1'

const testimonials: TestimonialItem[] = [
    { text: 'Member story placeholder: describe a practical skill, collaboration, or opportunity gained through UISS.', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80', name: 'Member story 01', role: 'Details to confirm' },
    { text: 'Member story placeholder: share how a club, workshop, or project supported personal and professional growth.', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80', name: 'Member story 02', role: 'Details to confirm' },
    { text: 'Member story placeholder: explain the value of learning and building alongside other ICT students.', image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=160&q=80', name: 'Member story 03', role: 'Details to confirm' },
    { text: 'Partner story placeholder: describe an approved collaboration and the outcome it created for students.', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80', name: 'Partner story 01', role: 'Details to confirm' },
    { text: 'Alumni story placeholder: share a verified path from university involvement to professional work.', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&q=80', name: 'Alumni story 01', role: 'Details to confirm' },
    { text: 'Leader story placeholder: explain how serving the student community helped develop leadership skills.', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=160&q=80', name: 'Leader story 01', role: 'Details to confirm' },
]

const columns = [testimonials.slice(0, 2), testimonials.slice(2, 4), testimonials.slice(4, 6)]

export default function TestimonialsColumnsDemo() {
    return (
        <section className="relative overflow-hidden bg-canvas py-24 sm:py-32">
            <div className="container relative z-10 mx-auto px-6">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }} className="mx-auto flex max-w-2xl flex-col items-center text-center">
                    <Badge variant="secondary">Testimonials</Badge>
                    <h2 className="mt-5 text-balance text-4xl font-bold tracking-tight text-ink sm:text-5xl">Stories from the UISS community.</h2>
                    <p className="mt-5 text-lg leading-8 text-muted">The layout is ready for real, approved member, partner, alumni, and leadership stories.</p>
                </motion.div>
                <div className="mt-12 flex max-h-[680px] justify-center gap-6 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]">
                    <TestimonialsColumn testimonials={columns[0]} duration={16} />
                    <TestimonialsColumn testimonials={columns[1]} className="hidden md:block" duration={20} />
                    <TestimonialsColumn testimonials={columns[2]} className="hidden lg:block" duration={18} />
                </div>
            </div>
        </section>
    )
}
