'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

export type TestimonialItem = {
    text: string
    image: string
    name: string
    role: string
}

interface TestimonialsColumnProps {
    className?: string
    testimonials: TestimonialItem[]
    duration?: number
}

export const TestimonialsColumn = ({ className, testimonials, duration = 10 }: TestimonialsColumnProps) => (
    <div className={cn('overflow-hidden', className)}>
        <motion.div
            animate={{ translateY: '-50%' }}
            transition={{ duration, repeat: Infinity, ease: 'linear', repeatType: 'loop' }}
            className="flex flex-col gap-6 bg-canvas pb-6"
        >
            {[0, 1].map((copy) => testimonials.map((testimonial) => (
                <article className="w-full max-w-xs rounded-3xl border border-line bg-canvas p-8 shadow-soft" key={`${copy}-${testimonial.name}`} aria-hidden={copy === 1}>
                    <p className="leading-7 text-ink">{testimonial.text}</p>
                    <div className="mt-5 flex items-center gap-3">
                        <Image width={40} height={40} src={testimonial.image} alt="" className="size-10 rounded-full object-cover" />
                        <div>
                            <p className="font-semibold leading-5 text-ink">{testimonial.name}</p>
                            <p className="text-sm leading-5 text-muted">{testimonial.role}</p>
                        </div>
                    </div>
                </article>
            )))}
        </motion.div>
    </div>
)
