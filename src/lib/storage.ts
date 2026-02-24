export type Role = 'user' | 'admin'

export type CareerPathway = {
  title: string
  description: string
}

export type CareerRequirements = {
  education: string
  experience: string
  skills: string[]
}

export type Career = {
  id: number
  title: string
  salary: string
  growth: string
  description: string
  skills: string[]
  rating: number
  overview: string
  responsibilities: string[]
  requirements: CareerRequirements
  pathways: CareerPathway[]
}

export type AdminResource = {
  id: number
  title: string
  type: 'Article' | 'Video' | 'Checklist'
  audience: 'All' | 'First Year' | 'Final Year'
  topic: string
  featured: boolean
  link: string
  description: string
}

const CAREERS_KEY = 'careerGuide_careers'
const ADMIN_RESOURCES_KEY = 'careerGuide_adminResources'

function safeParse<T>(value: string | null): T | null {
  if (!value) return null
  try {
    return JSON.parse(value) as T
  } catch {
    return null
  }
}

function loadOrSeed<T>(key: string, defaults: T): T {
  if (typeof window === 'undefined') return defaults
  const parsed = safeParse<T>(localStorage.getItem(key))
  if (parsed) return parsed
  localStorage.setItem(key, JSON.stringify(defaults))
  return defaults
}

function save<T>(key: string, value: T) {
  if (typeof window === 'undefined') return
  localStorage.setItem(key, JSON.stringify(value))
}

const DEFAULT_CAREERS: Career[] = [
  {
    id: 1,
    title: 'Software Engineer',
    salary: '$120K - $180K',
    growth: '+22%',
    description: 'Design and develop software applications that power modern businesses',
    skills: ['Programming', 'Problem Solving', 'Team Collaboration'],
    rating: 4.8,
    overview:
      'Software engineers are responsible for designing, developing, and maintaining software systems.',
    responsibilities: [
      'Design and develop software applications',
      'Write clean, efficient code',
      'Collaborate with teams',
      'Participate in code reviews',
      'Debug and optimize applications',
      'Stay updated with technologies',
    ],
    requirements: {
      education: "Bachelor's in CS or related field",
      experience: '2-5 years professional experience',
      skills: ['Java/Python/JavaScript', 'Databases', 'Git', 'REST APIs', 'Problem Solving'],
    },
    pathways: [
      { title: 'Full Stack Developer', description: 'Frontend & backend expertise' },
      { title: 'DevOps Engineer', description: 'Infrastructure & deployment' },
      { title: 'Tech Lead', description: 'Engineering leadership' },
    ],
  },
  {
    id: 2,
    title: 'Data Scientist',
    salary: '$110K - $170K',
    growth: '+36%',
    description: 'Transform data into actionable business insights',
    skills: ['Python', 'Machine Learning', 'Statistics'],
    rating: 4.7,
    overview: 'Extract insights using statistical analysis and machine learning techniques.',
    responsibilities: [
      'Collect and clean datasets',
      'Perform statistical analysis',
      'Build predictive models',
      'Visualize data insights',
      'Present findings',
      'Implement ML solutions',
    ],
    requirements: {
      education: "Master's in Data Science or Statistics",
      experience: '3+ years in data analysis',
      skills: ['Python/R', 'SQL', 'ML', 'Statistics', 'Tableau/Power BI'],
    },
    pathways: [
      { title: 'ML Engineer', description: 'ML systems focus' },
      { title: 'Analytics Manager', description: 'Lead teams' },
      { title: 'AI Specialist', description: 'AI systems' },
    ],
  },
  {
    id: 3,
    title: 'Product Manager',
    salary: '$130K - $190K',
    growth: '+18%',
    description: 'Define and deliver successful products',
    skills: ['Leadership', 'Strategy', 'Communication'],
    rating: 4.6,
    overview: 'Guide product success and lead cross-functional development teams.',
    responsibilities: [
      'Define product strategy',
      'Gather requirements',
      'Lead development cycles',
      'Analyze market trends',
      'Communicate with stakeholders',
      'Track metrics',
    ],
    requirements: {
      education: "Bachelor's degree any field",
      experience: '5+ years product/business roles',
      skills: ['Leadership', 'Strategy', 'Communication', 'Data Analysis', 'Empathy'],
    },
    pathways: [
      { title: 'Senior PM', description: 'Multiple products' },
      { title: 'VP Product', description: 'Executive leadership' },
      { title: 'Founder', description: 'Start your company' },
    ],
  },
  {
    id: 4,
    title: 'UX/UI Designer',
    salary: '$100K - $150K',
    growth: '+28%',
    description: 'Create beautiful user experiences',
    skills: ['Design', 'User Research', 'Prototyping'],
    rating: 4.7,
    overview: 'Design visual and interactive digital product elements focusing on UX.',
    responsibilities: [
      'Conduct user research',
      'Create wireframes',
      'Design interfaces',
      'Usability testing',
      'Iterate on feedback',
      'Collaborate with devs',
    ],
    requirements: {
      education: "Bachelor's in Design or portfolio",
      experience: '2-4 years design experience',
      skills: ['Figma/Adobe XD', 'Prototyping', 'Research', 'Visual Design', 'CSS'],
    },
    pathways: [
      { title: 'Design Lead', description: 'Lead teams' },
      { title: 'UX Researcher', description: 'Research focus' },
      { title: 'Design Systems', description: 'Scalable systems' },
    ],
  },
  {
    id: 5,
    title: 'DevOps Engineer',
    salary: '$115K - $175K',
    growth: '+25%',
    description: 'Streamline development and operations',
    skills: ['Cloud Computing', 'Docker', 'CI/CD'],
    rating: 4.6,
    overview: 'Bridge dev and ops by automating software delivery processes.',
    responsibilities: [
      'Manage infrastructure',
      'Automate deployments',
      'Monitor systems',
      'Ensure security',
      'Create recovery plans',
      'Optimize costs',
    ],
    requirements: {
      education: "Bachelor's in CS or related",
      experience: '3-5 years ops/DevOps',
      skills: ['Docker/Kubernetes', 'AWS/Azure', 'CI/CD', 'Scripting', 'Linux'],
    },
    pathways: [
      { title: 'SRE Engineer', description: 'System reliability' },
      { title: 'Cloud Architect', description: 'Cloud solutions' },
      { title: 'Ops Manager', description: 'Operations teams' },
    ],
  },
  {
    id: 6,
    title: 'Business Analyst',
    salary: '$90K - $140K',
    growth: '+15%',
    description: 'Bridge business and technology',
    skills: ['Analysis', 'SQL', 'Communication'],
    rating: 4.5,
    overview: 'Identify business needs and propose effective technology solutions.',
    responsibilities: [
      'Gather requirements',
      'Analyze processes',
      'Create specifications',
      'Manage stakeholders',
      'Test solutions',
      'Document and train',
    ],
    requirements: {
      education: "Bachelor's in Business or IT",
      experience: '2-4 years in analysis',
      skills: ['SQL', 'Analysis', 'Communication', 'Problem Solving', 'JIRA'],
    },
    pathways: [
      { title: 'Senior BA', description: 'Lead teams' },
      { title: 'Solutions Architect', description: 'Design solutions' },
      { title: 'Manager', description: 'Management role' },
    ],
  },
]

const DEFAULT_ADMIN_RESOURCES: AdminResource[] = [
  {
    id: 1,
    title: 'Roadmap: Becoming a Software Engineer',
    type: 'Article',
    audience: 'Final Year',
    topic: 'Software Engineering',
    featured: true,
    link: '#',
    description: 'A step-by-step roadmap to go from basics to job-ready software engineering.',
  },
  {
    id: 2,
    title: 'How to Choose a Specialization in CSE',
    type: 'Video',
    audience: 'First Year',
    topic: 'Career Planning',
    featured: false,
    link: '#',
    description: 'Guidance on selecting a track based on interests, strengths, and market demand.',
  },
  {
    id: 3,
    title: 'Checklist: Preparing for Campus Placements',
    type: 'Checklist',
    audience: 'Final Year',
    topic: 'Placements',
    featured: true,
    link: '#',
    description: 'A quick checklist to prepare your resume, projects, and interview readiness.',
  },
]

export function getCareers(): Career[] {
  return loadOrSeed<Career[]>(CAREERS_KEY, DEFAULT_CAREERS)
}

export function saveCareers(careers: Career[]) {
  save(CAREERS_KEY, careers)
}

export function getAdminResources(): AdminResource[] {
  return loadOrSeed<AdminResource[]>(ADMIN_RESOURCES_KEY, DEFAULT_ADMIN_RESOURCES)
}

export function saveAdminResources(resources: AdminResource[]) {
  save(ADMIN_RESOURCES_KEY, resources)
}

