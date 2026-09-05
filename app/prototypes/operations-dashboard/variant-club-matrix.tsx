"use client"

import { useState } from "react"
import { ArrowRight, CalendarDays, FolderKanban, Users } from "lucide-react"
import { clubs, DashboardShell, PageHeading, SectionTitle, StatusBadge } from "./shared"

export function ClubMatrixVariant() {
    const [selected, setSelected] = useState(0)
    const club = clubs[selected]
    return <DashboardShell>
        <main className="ops-main proto-enter">
            <PageHeading eyebrow="Organization view" title="Club operations" copy="Compare all six clubs without turning progress into a public ranking." action={<button className="ops-button ops-button-secondary">Semester 1 · 2026/27</button>} />
            <section className="ops-panel ops-matrix-panel">
                <SectionTitle title="Six-club matrix" detail="Private operational signals · last updated 12 minutes ago" />
                <div className="ops-matrix" role="table" aria-label="Club operations comparison">
                    <div className="ops-matrix-head" role="row"><span>Club</span><span>Members</span><span>Projects</span><span>Review queue</span><span>Evidence progress</span><span /></div>
                    {clubs.map((row, index) => <button className="ops-matrix-row" data-active={selected === index || undefined} key={row.name} onClick={() => setSelected(index)}><strong>{row.name}</strong><span>{row.members}</span><span>{row.projects}</span><span>{row.reviews ? <StatusBadge tone={row.reviews > 2 ? "warning" : "neutral"}>{row.reviews} waiting</StatusBadge> : <StatusBadge>Clear</StatusBadge>}</span><span><i><b style={{ width: `${row.progress}%` }} /></i>{row.progress}%</span><ArrowRight size={14} /></button>)}
                </div>
            </section>
            <div className="ops-club-detail">
                <section className="ops-panel"><SectionTitle title={club.name} detail="Selected club operational summary" /><div className="ops-club-stats"><div><Users size={16} /><span><strong>{club.members}</strong> members</span></div><div><FolderKanban size={16} /><span><strong>{club.projects}</strong> active projects</span></div><div><CalendarDays size={16} /><span><strong>2</strong> upcoming events</span></div></div><button className="ops-text-button">Open club workspace <ArrowRight size={14} /></button></section>
                <section className="ops-panel"><SectionTitle title="Attention" detail="Recovery before consequences" /><div className="ops-attention"><span>01</span><div><strong>Project update overdue</strong><p>One team has not submitted evidence for 9 days.</p></div><button>Open</button></div><div className="ops-attention"><span>02</span><div><strong>Membership review due</strong><p>Three records await policy-safe review.</p></div><button>Open</button></div></section>
            </div>
        </main>
    </DashboardShell>
}
