import type { Metadata } from 'next'
import { PlannedPage } from '@/components/planned-page'

export const metadata: Metadata = { title: 'Clubs | UISS', description: 'Explore UISS student clubs.' }

export default function ClubsPage() {
    return <PlannedPage kind="clubs" />
}
