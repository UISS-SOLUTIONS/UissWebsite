"use client"

import { ArrowRight, FolderGit2, Plus } from "lucide-react"
import { GitHubActivity, type Contribution, type RepoContribution } from "@/components/ui/github-activity"
import PlugConnectedIcon from "@/components/ui/plug-connected-icon"
import { clubs, CompactSelect, DashboardShell, Metric, MiniSwitch, PageHeading, reviewQueue, SectionTitle, StatusBadge } from "./shared"

const activity: Contribution[] = Array.from({ length: 118 }, (_, index) => {
    const date = new Date("2026-05-10T00:00:00Z")
    date.setUTCDate(date.getUTCDate() + index)
    const count = index % 13 === 0 ? 7 : index % 7 === 0 ? 4 : index % 4 === 0 ? 2 : 0
    return { date: date.toISOString().slice(0, 10), count, level: (count >= 7 ? 4 : count >= 4 ? 3 : count >= 2 ? 2 : 0) as 0 | 1 | 2 | 3 | 4 }
})

const repositories: RepoContribution[] = [
    { name: "campus-navigator", count: 34, logo: <FolderGit2 size={15} /> },
    { name: "network-lab-inventory", count: 21, logo: <FolderGit2 size={15} /> },
    { name: "data-clinic", count: 16, logo: <FolderGit2 size={15} /> },
]

export function CommandCenterVariant() {
    return <DashboardShell>
        <main className="ops-main proto-enter">
            <PageHeading eyebrow="Friday, 4 September" title="Good afternoon, Sifa" copy="Here is what needs the Project Managers’ attention today." action={<button className="ops-button ops-button-primary"><Plus size={14} />New record</button>} />
            <div className="ops-metrics-grid">
                <Metric label="Active members" value="170" note="Across all six clubs" />
                <Metric label="Projects in delivery" value="26" note="5 need a progress update" />
                <Metric label="Awaiting review" value="10" note="Oldest item: 2 days" />
                <Metric label="Upcoming events" value="8" note="3 awaiting publication" />
            </div>
            <div className="ops-dashboard-grid">
                <section className="ops-panel ops-panel-large">
                    <SectionTitle title="Club progress" detail="Evidence-backed review completion" action={<CompactSelect>This semester</CompactSelect>} />
                    <div className="ops-progress-list">
                        {clubs.map((club) => <div className="ops-progress-row" key={club.name}><span>{club.name}</span><div><i style={{ width: `${club.progress}%` }} /></div><strong>{club.progress}%</strong></div>)}
                    </div>
                </section>
                <section className="ops-panel ops-github-panel">
                    <SectionTitle title="GitHub activity" detail="Repository evidence · never a performance score" />
                    <div className="ops-sync-row"><div className="ops-sync-identity"><PlugConnectedIcon size={18} /><div><StatusBadge>Connected</StatusBadge><p>uiss-udsm organization</p></div></div><MiniSwitch /></div>
                    <GitHubActivity className="ops-github-activity" contributions={activity} repos={repositories} year={2026} months={4} cellSize={8} showMonths accent={["#f1f1f1", "#d8d8d8", "#a9a9a9", "#666666", "#222222"]} label="Repositories represented in this evidence window" />
                    <dl className="ops-detail-list"><div><dt>Repositories</dt><dd>18 connected</dd></div><div><dt>Last sync</dt><dd>8 minutes ago</dd></div><div><dt>Needs attention</dt><dd>2 repositories</dd></div></dl>
                    <button className="ops-text-button">Review connections <ArrowRight size={14} /></button>
                </section>
                <section className="ops-panel ops-panel-wide">
                    <SectionTitle title="Review queue" detail="Independent decisions waiting for action" action={<button className="ops-text-button">View all <ArrowRight size={14} /></button>} />
                    <div className="ops-table" role="table" aria-label="Review queue">
                        {reviewQueue.map((item) => <button className="ops-table-row" key={item.title}><span><strong>{item.title}</strong><small>{item.owner}</small></span><StatusBadge tone="neutral">{item.kind}</StatusBadge><time>{item.age}</time><ArrowRight size={14} /></button>)}
                    </div>
                </section>
            </div>
        </main>
    </DashboardShell>
}
