import type { Metadata } from 'next'
import { PlannedPage } from '@/components/planned-page'

export const metadata: Metadata = { title: 'Events | UISS', description: 'Explore upcoming UISS events.' }

export default function EventsPage() {
    return <PlannedPage kind="events" />
}
