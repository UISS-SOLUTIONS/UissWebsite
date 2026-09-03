'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderIcon, MailIcon } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

const contactFormSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().min(1, 'Email is required').email('Please enter a valid email'),
    subject: z.string().min(1, 'Subject is required'),
    message: z.string().min(1, 'Message is required'),
})

export type ContactFormData = z.infer<typeof contactFormSchema>

interface Contact2Props {
    className?: string
    onSubmit?: (data: ContactFormData) => Promise<void>
}

const Contact2 = ({ className, onSubmit }: Contact2Props) => {
    const form = useForm<ContactFormData>({
        resolver: zodResolver(contactFormSchema),
        defaultValues: { firstName: '', lastName: '', email: '', subject: '', message: '' },
    })

    const handleSubmit = async (data: ContactFormData) => {
        if (!onSubmit) {
            form.setError('root', { message: 'Message delivery will be enabled after the UISS sender domain is verified.' })
            return
        }

        try {
            await onSubmit(data)
            form.reset()
        } catch {
            form.setError('root', { message: 'The message could not be sent. Please try again.' })
        }
    }

    return (
        <section id="contact" className={cn('bg-surface py-24 sm:py-32', className)}>
            <div className="container mx-auto grid gap-14 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
                <div>
                    <p className="text-sm font-bold uppercase tracking-[0.18em] text-muted">Contact us</p>
                    <h2 className="mt-4 text-5xl font-bold tracking-tight text-ink sm:text-6xl">Start with the right conversation.</h2>
                    <p className="mt-5 text-lg leading-8 text-muted">For now, contact UISS through the official recipient address. Website form delivery will be enabled once the sender domain is verified.</p>
                    <a href="mailto:udsmict1@gmail.com" className="mt-8 inline-flex items-center gap-3 font-bold text-ink underline underline-offset-4"><MailIcon aria-hidden />udsmict1@gmail.com</a>
                </div>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="rounded-xl border border-line bg-canvas p-7 shadow-soft sm:p-10">
                    <h3 className="text-2xl font-bold text-ink">Send a message</h3>
                    <p className="mt-2 text-muted">Preview mode until the official sender domain is connected.</p>
                    <FieldGroup className="mt-8 gap-5">
                        <div className="grid gap-5 sm:grid-cols-2">
                            <Controller control={form.control} name="firstName" render={({ field, fieldState }) => <Field data-invalid={fieldState.invalid}><FieldLabel htmlFor={field.name}>First name</FieldLabel><Input {...field} id={field.name} aria-invalid={fieldState.invalid} placeholder="First name" />{fieldState.invalid ? <FieldError errors={[fieldState.error]} /> : null}</Field>} />
                            <Controller control={form.control} name="lastName" render={({ field, fieldState }) => <Field data-invalid={fieldState.invalid}><FieldLabel htmlFor={field.name}>Last name</FieldLabel><Input {...field} id={field.name} aria-invalid={fieldState.invalid} placeholder="Last name" />{fieldState.invalid ? <FieldError errors={[fieldState.error]} /> : null}</Field>} />
                        </div>
                        <Controller control={form.control} name="email" render={({ field, fieldState }) => <Field data-invalid={fieldState.invalid}><FieldLabel htmlFor={field.name}>Email</FieldLabel><Input {...field} id={field.name} type="email" aria-invalid={fieldState.invalid} placeholder="you@example.com" />{fieldState.invalid ? <FieldError errors={[fieldState.error]} /> : null}</Field>} />
                        <Controller control={form.control} name="subject" render={({ field, fieldState }) => <Field data-invalid={fieldState.invalid}><FieldLabel htmlFor={field.name}>Subject</FieldLabel><Input {...field} id={field.name} aria-invalid={fieldState.invalid} placeholder="How can UISS help?" />{fieldState.invalid ? <FieldError errors={[fieldState.error]} /> : null}</Field>} />
                        <Controller control={form.control} name="message" render={({ field, fieldState }) => <Field data-invalid={fieldState.invalid}><FieldLabel htmlFor={field.name}>Message</FieldLabel><Textarea {...field} id={field.name} aria-invalid={fieldState.invalid} placeholder="Write your message" rows={5} />{fieldState.invalid ? <FieldError errors={[fieldState.error]} /> : null}</Field>} />
                        {form.formState.errors.root ? <p role="alert" className="text-sm font-semibold text-danger">{form.formState.errors.root.message}</p> : null}
                        <Button size="lg" type="submit" disabled={form.formState.isSubmitting}>
                            {form.formState.isSubmitting ? <LoaderIcon data-icon="inline-start" className="animate-spin" aria-hidden /> : null}
                            {form.formState.isSubmitting ? 'Sending…' : 'Send message'}
                        </Button>
                    </FieldGroup>
                </form>
            </div>
        </section>
    )
}

export { Contact2 }
