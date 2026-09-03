import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { cn } from '@/lib/utils'

export type TeamMember = {
    id: string
    name: string
    role: string
    avatar?: string
}

const placeholderMembers: TeamMember[] = Array.from({ length: 11 }, (_, index) => ({
    id: `leader-${index + 1}`,
    name: `Leader ${String(index + 1).padStart(2, '0')}`,
    role: 'Position to confirm',
}))

interface Team1Props {
    heading?: string
    description?: string
    members?: TeamMember[]
    className?: string
    emptyMessage?: string
}

const Team1 = ({
    heading = 'Meet the eleven-person leadership team.',
    description = 'The structure is ready for the approved names, positions, portraits, and biographies.',
    members = placeholderMembers,
    className,
    emptyMessage = 'Approved leadership profiles will appear here once they have been added by the UISS team.',
}: Team1Props) => (
    <section id="team" className={cn('py-24 sm:py-32', className)}>
        <div className="container mx-auto px-6">
            <div className="mx-auto max-w-3xl text-center">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-muted">Leadership</p>
                <h2 className="mt-4 text-balance text-4xl font-bold tracking-tight text-ink sm:text-5xl">{heading}</h2>
                <p className="mt-5 text-lg leading-8 text-muted">{description}</p>
            </div>
            {members.length > 0 ? <Carousel className="mt-14" opts={{ align: 'start' }} aria-label="UISS leaders">
                <CarouselContent>
                    {members.map((member) => (
                        <CarouselItem key={member.id} className="sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                            <article className="flex min-h-72 flex-col items-center justify-center rounded-lg border border-line bg-canvas p-6 text-center shadow-soft">
                                <Avatar className="size-24 border border-line">
                                    {member.avatar ? <AvatarImage src={member.avatar} alt="" /> : null}
                                    <AvatarFallback>{member.name.split(' ').map((part) => part[0]).join('').slice(0, 2)}</AvatarFallback>
                                </Avatar>
                                <h3 className="mt-6 text-xl font-bold text-ink">{member.name}</h3>
                                <p className="mt-1 text-muted">{member.role}</p>
                            </article>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <div className="mt-6 flex justify-end gap-3">
                    <CarouselPrevious className="static translate-y-0" />
                    <CarouselNext className="static translate-y-0" />
                </div>
            </Carousel> : (
                <div className="mt-14 rounded-lg border border-dashed border-line bg-surface p-10 text-center">
                    <h3 className="text-2xl font-bold text-ink">Leadership profiles are being prepared.</h3>
                    <p className="mx-auto mt-3 max-w-xl leading-7 text-muted">{emptyMessage}</p>
                </div>
            )}
        </div>
    </section>
)

export { Team1 }
