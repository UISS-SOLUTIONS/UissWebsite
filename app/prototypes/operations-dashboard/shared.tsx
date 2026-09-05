"use client"

import Image from "next/image"
import { useState, type ReactNode } from "react"
import {
    Bell,
    CalendarDays,
    ChevronDown,
    CircleGauge,
    ClipboardCheck,
    FolderKanban,
    LayoutDashboard,
    LogOut,
    Search,
    Settings,
    ShieldCheck,
    Users,
} from "lucide-react"
import { FileTree, type FileTreeElement } from "@/components/unlumen-ui/file-tree"
import {
    MotionNavigationMenu,
    MotionNavigationMenuContent,
    MotionNavigationMenuItem,
    MotionNavigationMenuLink,
    MotionNavigationMenuList,
    MotionNavigationMenuTrigger,
} from "@/components/unlumen-ui/motion-navigation-menu"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarMenuBadge,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarRail,
    SidebarTrigger,
} from "@/components/ui/sidebar"

export const clubs = [
    { name: "Artificial Intelligence", projects: 4, members: 28, reviews: 2, progress: 74 },
    { name: "Blockchain", projects: 3, members: 19, reviews: 1, progress: 61 },
    { name: "Data Science", projects: 5, members: 31, reviews: 3, progress: 82 },
    { name: "Networking", projects: 3, members: 24, reviews: 0, progress: 68 },
    { name: "Software Development", projects: 7, members: 42, reviews: 4, progress: 77 },
    { name: "UI/UX & Graphic Design", projects: 4, members: 26, reviews: 1, progress: 71 },
]

export const reviewQueue = [
    { title: "Campus Navigator — milestone 2", owner: "Software Development", kind: "Evidence review", age: "2h" },
    { title: "AI Study Jam", owner: "Artificial Intelligence", kind: "Event approval", age: "5h" },
    { title: "Network Lab Inventory", owner: "Networking", kind: "Project proposal", age: "1d" },
    { title: "Data Clinic — public showcase", owner: "Data Science", kind: "Publish review", age: "2d" },
]

const nav = [
    [LayoutDashboard, "Overview"],
    [Users, "Members"],
    [FolderKanban, "Projects"],
    [ClipboardCheck, "Reviews"],
    [CalendarDays, "Events"],
    [ShieldCheck, "Audit log"],
] as const

const workspaceTree: FileTreeElement[] = [
    {
        id: "clubs",
        name: "Six clubs",
        type: "folder",
        defaultOpen: true,
        children: [
            { id: "ai", name: "Artificial Intelligence" },
            { id: "blockchain", name: "Blockchain" },
            { id: "data", name: "Data Science" },
            { id: "networking", name: "Networking" },
            { id: "software", name: "Software Development" },
            { id: "design", name: "UI/UX & Graphics" },
        ],
    },
    {
        id: "evidence",
        name: "Evidence",
        type: "folder",
        children: [
            { id: "repos", name: "GitHub repositories" },
            { id: "reviews", name: "Review records" },
        ],
    },
]

function ContextNavigation() {
    return (
        <MotionNavigationMenu className="ops-context-nav" viewportClassName="ops-context-viewport">
            <MotionNavigationMenuList className="ops-context-list" highlightClassName="ops-context-highlight">
                <MotionNavigationMenuItem value="operate">
                    <MotionNavigationMenuTrigger className="ops-context-trigger">Operate</MotionNavigationMenuTrigger>
                    <MotionNavigationMenuContent className="ops-context-content" innerClassName="ops-context-links">
                        <MotionNavigationMenuLink href="#members"><strong>People & clubs</strong><span>Membership, roles and club workspaces</span></MotionNavigationMenuLink>
                        <MotionNavigationMenuLink href="#projects"><strong>Project delivery</strong><span>Milestones, evidence and recovery plans</span></MotionNavigationMenuLink>
                    </MotionNavigationMenuContent>
                </MotionNavigationMenuItem>
                <MotionNavigationMenuItem value="govern">
                    <MotionNavigationMenuTrigger className="ops-context-trigger">Govern</MotionNavigationMenuTrigger>
                    <MotionNavigationMenuContent className="ops-context-content" innerClassName="ops-context-links">
                        <MotionNavigationMenuLink href="#reviews"><strong>Independent review</strong><span>Conflicts, decisions and appeals</span></MotionNavigationMenuLink>
                        <MotionNavigationMenuLink href="#audit"><strong>Audit trail</strong><span>Private, role-scoped accountability</span></MotionNavigationMenuLink>
                    </MotionNavigationMenuContent>
                </MotionNavigationMenuItem>
            </MotionNavigationMenuList>
        </MotionNavigationMenu>
    )
}

export function DashboardShell({ children, active = "Overview" }: { children: ReactNode; active?: string }) {
    const [current, setCurrent] = useState(active)

    return (
        <SidebarProvider className="ops-sidebar-provider">
            <Sidebar collapsible="icon" className="ops-shadcn-sidebar">
                <SidebarHeader className="ops-sidebar-header">
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton size="lg" className="ops-brand-button" tooltip="UISS Operations">
                                <Image src="/dashboard/uiss-logo.jpg" alt="UISS official logo" width={40} height={40} priority />
                                <span className="ops-brand-copy"><strong>UISS</strong><small>Operations</small></span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>Operations</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu aria-label="Dashboard navigation">
                                {nav.map(([Icon, label]) => (
                                    <SidebarMenuItem key={label}>
                                        <SidebarMenuButton tooltip={label} isActive={current === label} onClick={() => setCurrent(label)}>
                                            <Icon aria-hidden size={16} /><span>{label}</span>
                                        </SidebarMenuButton>
                                        {label === "Reviews" ? <SidebarMenuBadge>10</SidebarMenuBadge> : null}
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                    <SidebarGroup className="ops-sidebar-tree">
                        <SidebarGroupLabel>Workspace tree</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <FileTree elements={workspaceTree} className="ops-workspace-tree" indentSize={18} />
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarFooter>
                    <SidebarMenu>
                        <SidebarMenuItem><SidebarMenuButton tooltip="Settings"><Settings aria-hidden size={16} /><span>Settings</span></SidebarMenuButton></SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton size="lg" className="ops-user-button" tooltip="Sifa Ramendu · Operations Owner">
                                <span className="ops-user-avatar">SM</span>
                                <span className="ops-user-copy"><strong>Sifa Ramendu</strong><small>Operations Owner</small></span>
                                <LogOut aria-hidden size={15} />
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarFooter>
                <SidebarRail />
            </Sidebar>
            <SidebarInset className="ops-workspace">
                <header className="ops-topbar">
                    <SidebarTrigger className="ops-sidebar-trigger" aria-label="Toggle operations sidebar" />
                    <div className="ops-mobile-brand"><Image src="/dashboard/uiss-logo.jpg" alt="" width={28} height={28} /><span><strong>UISS</strong><small>Operations</small></span></div>
                    <ContextNavigation />
                    <label className="ops-search"><Search aria-hidden size={15} /><input aria-label="Search dashboard" placeholder="Search members, projects…" /></label>
                    <button className="ops-icon-button" aria-label="Notifications"><Bell aria-hidden size={16} /><span /></button>
                    <button className="ops-avatar" aria-label="Open profile">SM</button>
                </header>
                {children}
            </SidebarInset>
        </SidebarProvider>
    )
}

export function PageHeading({ eyebrow, title, copy, action }: { eyebrow: string; title: string; copy: string; action?: ReactNode }) {
    return <div className="ops-page-heading"><div><p>{eyebrow}</p><h1>{title}</h1><span>{copy}</span></div>{action}</div>
}

export function StatusBadge({ children, tone = "positive" }: { children: ReactNode; tone?: "positive" | "neutral" | "warning" }) {
    return <span className="ops-badge" data-tone={tone}>{children}</span>
}

export function MiniSwitch() {
    const [enabled, setEnabled] = useState(true)
    return <button className="ops-switch" role="switch" aria-checked={enabled} aria-label="Toggle live synchronization" onClick={() => setEnabled(!enabled)}><span /></button>
}

export function Metric({ label, value, note }: { label: string; value: string; note: string }) {
    return <article className="ops-metric"><div><span>{label}</span><CircleGauge aria-hidden size={16} /></div><strong>{value}</strong><small>{note}</small></article>
}

export function SectionTitle({ title, detail, action }: { title: string; detail?: string; action?: ReactNode }) {
    return <div className="ops-section-title"><div><h2>{title}</h2>{detail ? <p>{detail}</p> : null}</div>{action}</div>
}

export function CompactSelect({ children }: { children: ReactNode }) {
    return <button className="ops-button ops-button-secondary">{children}<ChevronDown aria-hidden size={14} /></button>
}
