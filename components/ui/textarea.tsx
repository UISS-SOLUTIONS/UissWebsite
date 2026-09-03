import * as React from 'react'
import { cn } from '@/lib/utils'

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
    return (
        <textarea
            data-slot="textarea"
            className={cn('flex min-h-28 w-full rounded-md border border-line bg-canvas px-3 py-2 text-base text-ink placeholder:text-muted disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-danger', className)}
            {...props}
        />
    )
}

export { Textarea }
