import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

export default function ContactSection() {
    return (
        <section id="contact" className="bg-surface py-20 sm:py-28">
            <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[0.75fr_1.25fr]">
                <div>
                    <p className="text-sm font-bold uppercase tracking-[0.18em] text-muted">Contact</p>
                    <h2 className="mt-4 text-4xl font-bold tracking-tight text-ink sm:text-5xl">Start with the right conversation.</h2>
                    <p className="mt-5 text-lg leading-8 text-muted">Membership notifications currently route to the authorized UISS recipient.</p>
                    <Link href="mailto:udsmict1@gmail.com" className="mt-8 inline-block font-bold text-ink underline underline-offset-4">udsmict1@gmail.com</Link>
                </div>
                <Card className="p-7 sm:p-10">
                    <h3 className="text-2xl font-bold">Contact form pattern</h3>
                    <p className="mt-2 text-muted">Preview only. Delivery will be enabled after the sender domain is verified.</p>
                    <div className="mt-8 grid gap-5 sm:grid-cols-2">
                        <div><Label htmlFor="preview-name">Full name</Label><Input id="preview-name" className="mt-2" placeholder="Your name" /></div>
                        <div><Label htmlFor="preview-email">Email address</Label><Input id="preview-email" type="email" className="mt-2" placeholder="you@example.com" /></div>
                        <div className="sm:col-span-2"><Label htmlFor="preview-topic">Topic</Label><Select><SelectTrigger id="preview-topic" className="mt-2"><SelectValue placeholder="Choose a topic" /></SelectTrigger><SelectContent><SelectItem value="membership">Membership</SelectItem><SelectItem value="programs">Programs</SelectItem><SelectItem value="partnership">Partnership</SelectItem></SelectContent></Select></div>
                        <div className="sm:col-span-2"><Label htmlFor="preview-message">Message</Label><Textarea id="preview-message" className="mt-2" placeholder="How can UISS help?" /></div>
                        <div className="sm:col-span-2"><Button type="button" variant="secondary">Submit preview</Button></div>
                    </div>
                </Card>
            </div>
        </section>
    )
}
