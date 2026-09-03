import Link from 'next/link'
import Footer from '@/components/footer-2'
import { HeroHeader } from '@/components/header'
import { getClubs } from '@/lib/public-data'
export const metadata = { title: 'Clubs | UISS' }
export default async function ClubsPage() { const items = await getClubs(); return <div className="min-h-screen bg-canvas text-ink"><HeroHeader/><main className="mx-auto max-w-6xl px-6 py-20"><h1 className="text-5xl font-bold">UISS clubs</h1><p className="mt-4 text-lg text-muted">Find a community to learn and build with.</p>{items.length ? <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{items.map(c => <Link className="rounded-lg border border-line p-6 hover:bg-surface" href={`/clubs/${c.slug}`} key={c.id}><h2 className="text-2xl font-bold">{c.title}</h2><p className="mt-3 text-muted">{c.summary}</p></Link>)}</div> : <p className="mt-12 rounded border border-dashed border-line p-10 text-muted">No active clubs have been published yet.</p>}</main><Footer/></div> }
