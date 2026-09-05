import { ClubShowcase, type ClubPreview } from "@/components/home/club-showcase"
import { clubMediaBySlug } from "@/lib/club-media"

const previewClubs: ClubPreview[] = [
    {
        id: "artificial-intelligence",
        title: "Artificial Intelligence",
        summary: "Build practical AI systems and explore machine learning with responsible, human-centred thinking.",
        disciplines: ["Machine learning", "Computer vision", "Responsible AI"],
        url: "/clubs/artificial-intelligence",
        ...clubMediaBySlug["artificial-intelligence"],
    },
    {
        id: "blockchain",
        title: "Blockchain",
        summary: "Understand decentralized systems by designing transparent, secure applications and protocols together.",
        disciplines: ["Smart contracts", "Web3", "Cryptography"],
        url: "/clubs/blockchain",
        ...clubMediaBySlug.blockchain,
    },
    {
        id: "data-science",
        title: "Data Science",
        summary: "Turn real data into useful evidence through analysis, visualization, statistics, and collaborative projects.",
        disciplines: ["Analytics", "Visualization", "Statistics"],
        url: "/clubs/data-science",
        ...clubMediaBySlug["data-science"],
    },
    {
        id: "networking",
        title: "Networking",
        summary: "Learn how connected systems work by configuring, securing, and troubleshooting modern networks together.",
        disciplines: ["Infrastructure", "Security", "Cloud"],
        url: "/clubs/networking",
        ...clubMediaBySlug.networking,
    },
    {
        id: "software-development",
        title: "Software Development / Programming",
        summary: "Grow from ideas to reliable software through programming practice, teamwork, reviews, and real products.",
        disciplines: ["Web development", "Mobile", "Open source"],
        url: "/clubs/software-development",
        ...clubMediaBySlug["software-development"],
    },
    {
        id: "ui-ux-graphic-design",
        title: "UI/UX & Graphic Design",
        summary: "Design useful, inclusive digital experiences through research, interface craft, and visual communication.",
        disciplines: ["UX research", "Interfaces", "Visual design"],
        url: "/clubs/ui-ux-graphic-design",
        ...clubMediaBySlug["ui-ux-graphic-design"],
    },
]

export default function HomepageClubsPrototypePage() {
    return (
        <main className="min-h-screen bg-surface">
            <ClubShowcase clubs={previewClubs} />
        </main>
    )
}
