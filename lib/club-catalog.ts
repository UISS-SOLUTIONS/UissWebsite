export type ClubCatalogItem = {
    id: string
    slug: string
    title: string
    summary: string
    description: string
    disciplines: string[]
    skillLevels: string[]
    schedule?: string
    location?: string
    eligibility?: string
    vision?: string
    mission?: string
    image: string
    imageAlt: string
}

export const clubCatalog: ClubCatalogItem[] = [
    {
        id: 'artificial-intelligence',
        slug: 'artificial-intelligence',
        title: 'Artificial Intelligence',
        summary: 'Build practical AI systems and explore machine learning with responsible, human-centred thinking.',
        description: 'Learn how intelligent systems are designed, trained, evaluated, and applied through collaborative exploration and practical projects.',
        disciplines: ['Machine learning', 'Computer vision', 'Responsible AI'],
        skillLevels: ['Beginner', 'Intermediate', 'Advanced'],
        eligibility: 'Open to interested UISS members at every experience level.',
        image: '/clubs/artificial-intelligence.jpg',
        imageAlt: 'A three-dimensional neural network forming the shape of a human brain',
    },
    {
        id: 'blockchain',
        slug: 'blockchain',
        title: 'Blockchain',
        summary: 'Understand decentralized systems by designing transparent, secure applications and protocols together.',
        description: 'Explore distributed ledgers, smart contracts, cryptography, and the responsible use of decentralized technologies.',
        disciplines: ['Smart contracts', 'Web3', 'Cryptography'],
        skillLevels: ['Beginner', 'Intermediate', 'Advanced'],
        eligibility: 'Open to interested UISS members at every experience level.',
        image: '/clubs/blockchain.jpg',
        imageAlt: 'Bitcoin and Ethereum coins in front of a digital market chart',
    },
    {
        id: 'data-science',
        slug: 'data-science',
        title: 'Data Science',
        summary: 'Turn real data into useful evidence through analysis, visualization, statistics, and collaborative projects.',
        description: 'Develop the skills to collect, understand, visualize, and communicate data while working on questions that matter.',
        disciplines: ['Analytics', 'Visualization', 'Statistics'],
        skillLevels: ['Beginner', 'Intermediate', 'Advanced'],
        eligibility: 'Open to interested UISS members at every experience level.',
        image: '/clubs/data-science.jpg',
        imageAlt: 'A green data chart displayed on a laptop screen',
    },
    {
        id: 'networking',
        slug: 'networking',
        title: 'Networking',
        summary: 'Learn how connected systems work by configuring, securing, and troubleshooting modern networks together.',
        description: 'Build practical knowledge of network infrastructure, cloud connectivity, security, and reliable communication systems.',
        disciplines: ['Infrastructure', 'Security', 'Cloud'],
        skillLevels: ['Beginner', 'Intermediate', 'Advanced'],
        eligibility: 'Open to interested UISS members at every experience level.',
        image: '/clubs/networking.jpg',
        imageAlt: 'Ethernet cables connected to a network patch panel',
    },
    {
        id: 'software-development',
        slug: 'software-development',
        title: 'Software Development / Programming',
        summary: 'Grow from ideas to reliable software through programming practice, teamwork, reviews, and real products.',
        description: 'Practice designing and building useful software across web, mobile, and open-source projects with other student developers.',
        disciplines: ['Web development', 'Mobile', 'Open source'],
        skillLevels: ['Beginner', 'Intermediate', 'Advanced'],
        eligibility: 'Open to interested UISS members at every experience level.',
        image: '/clubs/software-development.jpg',
        imageAlt: 'Source code open on a laptop at a software development workspace',
    },
    {
        id: 'ui-ux-graphic-design',
        slug: 'ui-ux-graphic-design',
        title: 'UI/UX & Graphic Design',
        summary: 'Design useful, inclusive digital experiences through research, interface craft, and visual communication.',
        description: 'Explore user research, interaction design, interface systems, prototyping, and visual storytelling through hands-on work.',
        disciplines: ['UX research', 'Interfaces', 'Visual design'],
        skillLevels: ['Beginner', 'Intermediate', 'Advanced'],
        eligibility: 'Open to interested UISS members at every experience level.',
        image: '/clubs/ui-ux-graphic-design.jpg',
        imageAlt: 'A designer sketching mobile interface wireframes on paper',
    },
]

export function getCatalogClub(slug: string) {
    return clubCatalog.find((club) => club.slug === slug)
}
