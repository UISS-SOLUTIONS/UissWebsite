export const eventCategories = [
  'Hackathons',
  'AI',
  'Software Development',
  'Cybersecurity',
  'Blockchain',
  'STEM',
  'Workshops',
  'Industry Events',
] as const

export type EventCategory = (typeof eventCategories)[number]

export type ExperienceMedia = {
  src: string
  alt: string
  width?: number | null
  height?: number | null
  credit?: string | null
}

export type Collaborator = {
  name: string
  role?: string
  logo?: string
  href?: string
}

export type ExperienceHighlight = {
  value: string
  label: string
  note?: string
}

export type ExperienceSection = {
  title: string
  introduction?: string
  items: string[]
}

export type ExperienceStep = {
  title: string
  description: string
}

export type EventTiming = 'ongoing' | 'upcoming' | 'past'

export type PublicEvent = {
  id: string
  slug: string
  title: string
  summary: string
  description?: string
  dateLabel: string
  sortDate: string
  timing: EventTiming
  location?: string
  categories: EventCategory[]
  featuredRank?: number
  coverMedia?: ExperienceMedia
  gallery: ExperienceMedia[]
  overview: string[]
  highlights: ExperienceHighlight[]
  sections: ExperienceSection[]
  timeline: ExperienceStep[]
  collaborators: Collaborator[]
  registrationUrl?: string
  registrationStatus: string
}

export type PublicProject = {
  id: string
  slug: string
  title: string
  summary: string
  year: number
  status: 'concept' | 'active' | 'completed'
  statusLabel: string
  typeLabel: string
  problem: string
  solution: string
  impact: string
  overview: string[]
  techStack: string[]
  collaborators: Collaborator[]
  coverMedia?: ExperienceMedia
  gallery: ExperienceMedia[]
  repositoryUrl?: string
  demoUrl?: string
  featured: boolean
}

export const eventCatalog: PublicEvent[] = [
  {
    id: 'catalog:event:building-on-stellar-students-mini-hackathon',
    slug: 'building-on-stellar-students-mini-hackathon',
    title: 'Building on Stellar: Students Mini Hackathon',
    summary: 'A full-day student innovation experience turning blockchain ideas into working prototypes with Stellar technologies.',
    dateLabel: '21 February 2026',
    sortDate: '2026-02-21',
    timing: 'past',
    location: 'CoICT, University of Dar es Salaam',
    categories: ['Hackathons', 'Blockchain'],
    featuredRank: 1,
    gallery: [],
    overview: [
      'UISS Blockchain Club and the Stellar East African Community brought together developers, builders, and blockchain enthusiasts to explore the Stellar ecosystem.',
      'Students worked in teams to transform ideas into prototypes using Stellar technologies, digital assets, payment infrastructure, and Soroban smart contracts. Ecosystem mentors supported the journey from ideation and development to final demonstrations.',
    ],
    highlights: [
      { value: '98+', label: 'Participants' },
      { value: '3-5', label: 'Students per team' },
      { value: '1 day', label: 'Building together' },
      { value: 'TZS 700K', label: 'Planned prize pool', note: 'Planned for the event' },
    ],
    sections: [
      {
        title: 'Event highlights',
        items: [
          'Hands-on blockchain development',
          'Stellar and Soroban workshops',
          'Technical mentorship',
          'Prototype development',
          'Final project presentations',
        ],
      },
    ],
    timeline: [
      { title: 'Learn', description: 'Students were introduced to Stellar technologies, digital assets, payment infrastructure, and Soroban smart contracts.' },
      { title: 'Build', description: 'Teams moved from ideas into working prototypes during a focused day of development.' },
      { title: 'Collaborate', description: 'Participants worked in teams and received technical guidance from ecosystem mentors.' },
      { title: 'Share', description: 'Teams closed the experience by demonstrating their products and explaining what they built.' },
    ],
    collaborators: [
      { name: 'UISS Blockchain Club', role: 'Organiser' },
      { name: 'Stellar East African Community', role: 'Partner' },
    ],
    registrationStatus: 'not_required',
  },
  {
    id: 'catalog:event:capture-the-flag-udsm-cybersecurity-club-launch',
    slug: 'capture-the-flag-udsm-cybersecurity-club-launch',
    title: 'Capture the Flag and UDSM Cybersecurity Club Launch',
    summary: 'A practical cybersecurity competition connecting university learning with industry experience and mentorship.',
    dateLabel: '31 October 2024',
    sortDate: '2024-10-31',
    timing: 'past',
    location: 'CoICT, University of Dar es Salaam',
    categories: ['Cybersecurity', 'Industry Events'],
    featuredRank: 2,
    coverMedia: {
      src: '/ctfWinner.avif',
      alt: 'Students at the UDSM Capture the Flag cybersecurity competition',
      width: 1600,
      height: 1000,
    },
    gallery: [],
    overview: [
      'UISS joined Vodacom Tanzania and the University of Dar es Salaam in an initiative focused on practical cybersecurity capabilities for university students.',
      'The UDSM Cybersecurity Club launch included a hands-on Capture the Flag competition where students solved security challenges across several domains. The collaboration connected academic learning, industry experience, mentorship, and practical training.',
    ],
    highlights: [],
    sections: [
      {
        title: 'Challenge areas',
        items: [
          'Digital Forensics',
          'Open Source Intelligence',
          'Web Security',
          'Cloud Security',
          'Blockchain Security',
          'Cybersecurity problem solving',
        ],
      },
    ],
    timeline: [],
    collaborators: [
      { name: 'Vodacom Tanzania', role: 'Industry collaborator', logo: '/partners/vodacom.svg' },
      { name: 'University of Dar es Salaam', role: 'Academic collaborator', logo: '/brand/udsm-logo.avif' },
      { name: 'UISS', role: 'Student community partner' },
    ],
    registrationStatus: 'not_required',
  },
  {
    id: 'catalog:event:open-source-unleashed-tanzania',
    slug: 'open-source-unleashed-tanzania',
    title: 'Open Source Unleashed Tanzania',
    summary: 'A day of practical open-source learning, collaborative software development, and developer community exchange.',
    dateLabel: '22 June 2024',
    sortDate: '2024-06-22',
    timing: 'past',
    location: 'UDICTI Hub, CoICT',
    categories: ['Software Development', 'Workshops'],
    featuredRank: 3,
    gallery: [],
    overview: [
      'Open Source Unleashed brought together students, developers, technology communities, and industry partners for a day dedicated to open collaboration and software development.',
      'Participants explored how open-source ecosystems work, how to contribute to existing projects, how to launch their own projects, and how tools such as GitHub support collaborative development.',
    ],
    highlights: [],
    sections: [
      {
        title: 'The experience',
        items: [
          'Open-source development sessions',
          'Practical workshops',
          'Community networking',
          'Git and GitHub workflows',
          'Contribution opportunities',
          'Developer ecosystem discussions',
        ],
      },
    ],
    timeline: [],
    collaborators: [
      { name: 'UDICTI' },
      { name: 'FinHub' },
      { name: 'GitHub' },
      { name: 'Postman' },
      { name: 'Oracle Academy' },
      { name: 'Serengeti Bytes' },
      { name: 'Dunia Yetu' },
      { name: 'UISS' },
    ],
    registrationStatus: 'not_required',
  },
  {
    id: 'catalog:event:ai-wizards-udsm',
    slug: 'ai-wizards-udsm',
    title: 'AI Wizards: UDSM',
    summary: 'An ongoing student learning community that turns AI and data science theory into practical experimentation.',
    dateLabel: '2026 - Ongoing program',
    sortDate: '2026-12-31',
    timing: 'ongoing',
    location: 'University of Dar es Salaam',
    categories: ['AI', 'Workshops'],
    gallery: [],
    overview: [
      'AI Wizards is a student-focused Artificial Intelligence and Data Science learning community at the University of Dar es Salaam, delivered by Data Safari in collaboration with UISS.',
      'The program helps students move beyond theory through practical, activity-driven learning that welcomes both technical and non-technical participants.',
    ],
    highlights: [],
    sections: [
      {
        title: 'What students explore',
        items: [
          'Artificial Intelligence fundamentals',
          'Machine Learning',
          'Data Science',
          'Practical experimentation',
          'Data analysis',
          'AI tools and workflows',
          'Collaborative problem solving',
        ],
      },
    ],
    timeline: [],
    collaborators: [
      { name: 'Data Safari', role: 'Program partner' },
      { name: 'UISS', role: 'Community collaborator' },
    ],
    registrationStatus: 'not_required',
  },
  {
    id: 'catalog:event:beyond-campus-opportunities-in-the-age-of-ai',
    slug: 'beyond-campus-opportunities-in-the-age-of-ai',
    title: 'Beyond Campus: Opportunities in the Age of AI',
    summary: 'A conversation about emerging AI opportunities and how students can prepare for a changing digital economy.',
    dateLabel: 'October 2025',
    sortDate: '2025-10-01',
    timing: 'past',
    categories: ['AI', 'Industry Events'],
    gallery: [],
    overview: [
      'University prepares students for a profession. Technology continuously changes what those professions can become.',
      'Beyond Campus brought students into a conversation about opportunities created by Artificial Intelligence and how young technology professionals can position themselves for a rapidly changing digital economy.',
      'AI professional Zephania Reuben explored opportunities beyond traditional career paths and the growing role of AI in technology, entrepreneurship, and innovation.',
    ],
    highlights: [],
    sections: [],
    timeline: [],
    collaborators: [
      { name: 'Zephania Reuben', role: 'Guest speaker' },
      { name: 'UISS', role: 'Organiser' },
    ],
    registrationStatus: 'not_required',
  },
  {
    id: 'catalog:event:api-101-building-testing-apis-with-postman',
    slug: 'api-101-building-testing-apis-with-postman',
    title: 'API 101: Building and Testing APIs with Postman',
    summary: 'A practical introduction to how applications communicate and how development teams build, test, and document APIs.',
    dateLabel: '24 April 2024',
    sortDate: '2024-04-24',
    timing: 'past',
    location: 'CoICT, University of Dar es Salaam',
    categories: ['Software Development', 'Workshops'],
    gallery: [],
    overview: [
      'The session introduced students to one of the foundations of modern software development: Application Programming Interfaces.',
      'Students explored how applications communicate, how APIs are designed and tested, and how development teams use Postman to build, document, test, and collaborate around APIs.',
    ],
    highlights: [],
    sections: [
      {
        title: 'Topics covered',
        items: [
          'Understanding APIs',
          'API requests and responses',
          'API testing',
          'Postman workflows',
          'API documentation',
          'Frontend and backend integration',
          'Developer collaboration',
        ],
      },
    ],
    timeline: [],
    collaborators: [
      { name: 'UISS' },
      { name: 'UDICTI developer ecosystem' },
    ],
    registrationStatus: 'not_required',
  },
  {
    id: 'catalog:event:stem-bootcamp',
    slug: 'stem-bootcamp',
    title: 'STEM Bootcamp',
    summary: 'Four days of practical building across electronics, robotics, digital fabrication, and prototyping.',
    dateLabel: '1-4 December 2022',
    sortDate: '2022-12-01',
    timing: 'past',
    location: 'University of Dar es Salaam',
    categories: ['STEM', 'Workshops'],
    gallery: [],
    overview: [
      'The UISS STEM Bootcamp introduced university students to practical technologies beyond traditional classroom learning.',
      'Working alongside Taifa Technovation Hub, participants received hands-on exposure to electronics, robotics, digital fabrication, and prototyping.',
    ],
    highlights: [],
    sections: [
      {
        title: 'Students explored',
        items: [
          'Arduino',
          'Robotics',
          'Electronics',
          '3D modelling',
          '3D printing',
          'Hardware prototyping',
          'Practical engineering',
        ],
      },
    ],
    timeline: [],
    collaborators: [
      { name: 'Taifa Technovation Hub', role: 'Program partner' },
      { name: 'UISS', role: 'Organiser' },
    ],
    registrationStatus: 'not_required',
  },
]

export const projectCatalog: PublicProject[] = [
  {
    id: 'catalog:project:connecting-sumaye-secondary-school',
    slug: 'connecting-sumaye-secondary-school',
    title: 'Connecting Sumaye Secondary School',
    summary: 'A collaborative digital inclusion initiative expanding access to internet connectivity and digital learning resources in Morogoro.',
    year: 2023,
    status: 'completed',
    statusLabel: 'Completed',
    typeLabel: 'Digital inclusion',
    problem: 'Students need reliable access to connectivity and digital learning resources to take part in technology-supported education and self-directed learning.',
    solution: 'The collaboration supported tablets for students alongside internet antennas and Wi-Fi infrastructure that opened access to online educational content.',
    impact: 'The initiative created practical access to digital learning resources beyond the university community and demonstrated how technology partnerships can support education.',
    overview: [
      'UISS contributed to a collaborative initiative focused on improving access to educational technology for students at Sumaye Secondary School in Morogoro.',
      'The work combined devices, connectivity infrastructure, and partner expertise to help students reach online educational content and pursue self-directed learning.',
    ],
    techStack: [],
    collaborators: [
      { name: 'African Child Projects' },
      { name: 'UISS' },
      { name: 'Vodacom Tanzania Foundation', logo: '/partners/vodacom.svg' },
      { name: 'Basic Internet Foundation' },
      { name: 'Dar es Salaam Institute of Technology' },
      { name: 'UCSAF' },
      { name: 'Arusha Technical College' },
    ],
    gallery: [],
    featured: true,
  },
]

export const collaborationNetwork: Collaborator[] = [
  { name: 'Vodacom Tanzania', role: 'Cybersecurity skills development', logo: '/partners/vodacom.svg' },
  { name: 'Stellar East African Community', role: 'Blockchain education' },
  { name: 'Data Safari', role: 'AI and Data Science learning' },
  { name: 'Taifa Technovation Hub', role: 'STEM and prototyping' },
  { name: 'UDICTI and FinHub', role: 'Developer communities' },
  { name: 'GitHub and Postman ecosystem', role: 'Open-source and API learning' },
  { name: 'Digital inclusion partners', role: 'Technology access beyond campus' },
]

export function categorySlug(category: EventCategory) {
  return category.toLowerCase().replaceAll(' ', '-')
}

export function categoryFromSlug(slug?: string) {
  return eventCategories.find((category) => categorySlug(category) === slug)
}
