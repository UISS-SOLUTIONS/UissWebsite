'use client'

import type { ComponentProps, ReactNode } from 'react'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

function FieldSet({ className, ...props }: ComponentProps<'fieldset'>) {
    return <fieldset className={cn('flex flex-col gap-6', className)} {...props} />
}

function FieldLegend({ className, ...props }: ComponentProps<'legend'>) {
    return <legend className={cn('mb-3 font-medium text-ink', className)} {...props} />
}

function FieldGroup({ className, ...props }: ComponentProps<'div'>) {
    return <div className={cn('flex w-full flex-col gap-7', className)} {...props} />
}

function Field({ className, ...props }: ComponentProps<'div'>) {
    return <div role="group" className={cn('flex w-full flex-col gap-2 data-[invalid=true]:text-danger', className)} {...props} />
}

function FieldContent({ className, ...props }: ComponentProps<'div'>) {
    return <div className={cn('flex flex-1 flex-col gap-1.5', className)} {...props} />
}

function FieldLabel({ className, ...props }: ComponentProps<typeof Label>) {
    return <Label className={cn('w-fit font-semibold', className)} {...props} />
}

function FieldTitle({ className, ...props }: ComponentProps<'div'>) {
    return <div className={cn('font-semibold text-ink', className)} {...props} />
}

function FieldDescription({ className, ...props }: ComponentProps<'p'>) {
    return <p className={cn('text-sm leading-6 text-muted', className)} {...props} />
}

function FieldSeparator({ children, className, ...props }: ComponentProps<'div'> & { children?: ReactNode }) {
    return (
        <div className={cn('relative flex h-5 items-center text-sm', className)} {...props}>
            <Separator className="absolute inset-x-0" />
            {children ? <span className="relative mx-auto bg-canvas px-2 text-muted">{children}</span> : null}
        </div>
    )
}

function FieldError({ className, children, errors, ...props }: ComponentProps<'div'> & { errors?: Array<{ message?: string } | undefined> }) {
    const messages = errors?.flatMap((error) => error?.message ? [error.message] : []) ?? []
    const content = children ?? (messages.length === 1 ? messages[0] : messages.length > 1 ? <ul className="ml-4 list-disc">{messages.map((message) => <li key={message}>{message}</li>)}</ul> : null)

    if (!content) return null

    return <div role="alert" className={cn('text-sm text-danger', className)} {...props}>{content}</div>
}

export { Field, FieldLabel, FieldDescription, FieldError, FieldGroup, FieldLegend, FieldSeparator, FieldSet, FieldContent, FieldTitle }
