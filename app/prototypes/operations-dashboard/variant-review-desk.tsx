"use client"

import { useState } from "react"
import { Check, FileCheck2, GitBranch, MessageSquareText, X } from "lucide-react"
import { FileTree, type FileTreeElement } from "@/components/unlumen-ui/file-tree"
import PlugConnectedIcon from "@/components/ui/plug-connected-icon"
import { DashboardShell, PageHeading, reviewQueue, SectionTitle, StatusBadge } from "./shared"

const repositoryTree: FileTreeElement[] = [
    {
        id: "campus-navigator",
        name: "campus-navigator",
        type: "folder",
        defaultOpen: true,
        children: [
            { id: "branch", name: "main · 7d9a31c", icon: GitBranch, highlight: true },
            { id: "readme", name: "README.md" },
            { id: "milestone", name: "milestones/week-06.md" },
            { id: "testing", name: "docs/testing-notes.md" },
        ],
    },
]

export function ReviewDeskVariant() {
    const [selected, setSelected] = useState(0)
    const item = reviewQueue[selected]
    return <DashboardShell active="Reviews">
        <main className="ops-main proto-enter">
            <PageHeading eyebrow="Decision workspace" title="Review desk" copy="Evidence, conflicts, and public changes in one focused queue." />
            <div className="ops-review-layout">
                <section className="ops-panel ops-queue-panel">
                    <SectionTitle title="Assigned to you" detail="10 open · 3 due today" />
                    <div className="ops-filter-tabs" role="tablist" aria-label="Review filters"><button data-active>All 10</button><button>Projects 6</button><button>Publishing 4</button></div>
                    <div className="ops-review-items">
                        {reviewQueue.map((queueItem, index) => <button key={queueItem.title} data-active={selected === index || undefined} onClick={() => setSelected(index)}><span><strong>{queueItem.title}</strong><small>{queueItem.owner}</small></span><time>{queueItem.age}</time></button>)}
                    </div>
                </section>
                <section className="ops-panel ops-inspector">
                    <div className="ops-inspector-head"><div><StatusBadge tone="neutral">{item.kind}</StatusBadge><h2>{item.title}</h2><p>Submitted by Amina Juma · 4 September, 10:24</p></div><button className="ops-icon-button" aria-label="More review options">•••</button></div>
                    <div className="ops-callout"><FileCheck2 size={17} /><div><strong>No reviewer conflict detected</strong><p>You did not create, own, or contribute to this submission.</p></div></div>
                    <div className="ops-evidence-grid">
                        <div>
                            <SectionTitle title="Repository evidence" detail="Read-only GitHub snapshot" action={<PlugConnectedIcon size={18} />} />
                            <FileTree elements={repositoryTree} className="ops-review-tree" indentSize={20} />
                        </div>
                        <div><SectionTitle title="Milestone claim" detail="What the team says changed" /><p className="ops-body-copy">Route planning now supports accessibility preferences and offline campus landmarks. The team attached acceptance-test evidence and a peer review.</p><dl className="ops-detail-list"><div><dt>Target</dt><dd>Milestone 2 of 4</dd></div><div><dt>Evidence window</dt><dd>28 Aug–4 Sep</dd></div><div><dt>Template</dt><dd>Project KPI v1.2</dd></div></dl></div>
                    </div>
                    <label className="ops-review-note"><span>Reviewer note</span><textarea placeholder="Explain the decision or request specific changes…" /></label>
                    <div className="ops-action-bar"><button className="ops-button ops-button-secondary"><X size={14} />Request changes</button><button className="ops-button ops-button-secondary"><MessageSquareText size={14} />Save note</button><button className="ops-button ops-button-primary"><Check size={14} />Approve evidence</button></div>
                </section>
            </div>
        </main>
    </DashboardShell>
}
