import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Download, Briefcase, BookOpen, Users } from 'lucide-react'

const CAREERS_DATA: Record<string, any> = {
  '1': {
    title: 'Software Engineer',
    salary: '$120K - $180K',
    growth: '+22%',
    description: 'Design and develop software applications that power modern businesses',
    overview: 'Software engineers are responsible for designing, developing, and maintaining software systems.',
    responsibilities: [
      'Design and develop software applications',
      'Write clean, efficient code',
      'Collaborate with teams',
      'Participate in code reviews',
      'Debug and optimize applications',
      'Stay updated with technologies',
    ],
    requirements: {
      education: 'Bachelor\'s in CS or related field',
      experience: '2-5 years professional experience',
      skills: ['Java/Python/JavaScript', 'Databases', 'Git', 'REST APIs', 'Problem Solving'],
    },
    pathways: [
      { title: 'Full Stack Developer', description: 'Frontend & backend expertise' },
      { title: 'DevOps Engineer', description: 'Infrastructure & deployment' },
      { title: 'Tech Lead', description: 'Engineering leadership' },
    ],
  },
  '2': {
    title: 'Data Scientist',
    salary: '$110K - $170K',
    growth: '+36%',
    description: 'Transform data into actionable business insights',
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
      education: 'Master\'s in Data Science or Statistics',
      experience: '3+ years in data analysis',
      skills: ['Python/R', 'SQL', 'ML', 'Statistics', 'Tableau/Power BI'],
    },
    pathways: [
      { title: 'ML Engineer', description: 'ML systems focus' },
      { title: 'Analytics Manager', description: 'Lead teams' },
      { title: 'AI Specialist', description: 'AI systems' },
    ],
  },
  '3': {
    title: 'Product Manager',
    salary: '$130K - $190K',
    growth: '+18%',
    description: 'Define and deliver successful products',
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
      education: 'Bachelor\'s degree any field',
      experience: '5+ years product/business roles',
      skills: ['Leadership', 'Strategy', 'Communication', 'Data Analysis', 'Empathy'],
    },
    pathways: [
      { title: 'Senior PM', description: 'Multiple products' },
      { title: 'VP Product', description: 'Executive leadership' },
      { title: 'Founder', description: 'Start your company' },
    ],
  },
  '4': {
    title: 'UX/UI Designer',
    salary: '$100K - $150K',
    growth: '+28%',
    description: 'Create beautiful user experiences',
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
      education: 'Bachelor\'s in Design or portfolio',
      experience: '2-4 years design experience',
      skills: ['Figma/Adobe XD', 'Prototyping', 'Research', 'Visual Design', 'CSS'],
    },
    pathways: [
      { title: 'Design Lead', description: 'Lead teams' },
      { title: 'UX Researcher', description: 'Research focus' },
      { title: 'Design Systems', description: 'Scalable systems' },
    ],
  },
  '5': {
    title: 'DevOps Engineer',
    salary: '$115K - $175K',
    growth: '+25%',
    description: 'Streamline development and operations',
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
      education: 'Bachelor\'s in CS or related',
      experience: '3-5 years ops/DevOps',
      skills: ['Docker/Kubernetes', 'AWS/Azure', 'CI/CD', 'Scripting', 'Linux'],
    },
    pathways: [
      { title: 'SRE Engineer', description: 'System reliability' },
      { title: 'Cloud Architect', description: 'Cloud solutions' },
      { title: 'Ops Manager', description: 'Operations teams' },
    ],
  },
  '6': {
    title: 'Business Analyst',
    salary: '$90K - $140K',
    growth: '+15%',
    description: 'Bridge business and technology',
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
      education: 'Bachelor\'s in Business or IT',
      experience: '2-4 years in analysis',
      skills: ['SQL', 'Analysis', 'Communication', 'Problem Solving', 'JIRA'],
    },
    pathways: [
      { title: 'Senior BA', description: 'Lead teams' },
      { title: 'Solutions Architect', description: 'Design solutions' },
      { title: 'Manager', description: 'Management role' },
    ],
  },
}

export default function CareerDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const career = CAREERS_DATA[id || '1']

  if (!career) {
    return <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">Career not found</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 pt-20 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.button
          onClick={() => navigate('/careers')}
          className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 mb-8"
          whileHover={{ x: -5 }}
        >
          <ArrowLeft size={20} /> Back to Careers
        </motion.button>

        <motion.div className="mb-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h1 className="text-5xl font-bold gradient-text mb-4">{career.title}</h1>
          <p className="text-xl text-gray-300 mb-6">{career.description}</p>
          <div className="flex flex-wrap gap-4">
            <div className="card px-6 py-3">
              <p className="text-gray-600 text-sm">Salary Range</p>
              <p className="text-2xl font-bold text-indigo-600">{career.salary}</p>
            </div>
            <div className="card px-6 py-3">
              <p className="text-gray-600 text-sm">Growth Rate</p>
              <p className="text-2xl font-bold text-green-600">{career.growth}</p>
            </div>
          </div>
        </motion.div>

        <motion.div className="card p-8 mb-8" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Overview</h2>
          <p className="text-gray-700">{career.overview}</p>
        </motion.div>

        <motion.div className="card p-8 mb-8" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}>
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <Briefcase className="text-indigo-600" size={28} />
            Key Responsibilities
          </h2>
          <ul className="space-y-3">
            {career.responsibilities.map((resp: string, idx: number) => (
              <li key={idx} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 flex-shrink-0" />
                <span className="text-gray-700">{resp}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div className="card p-8 mb-8" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}>
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <BookOpen className="text-pink-600" size={28} />
            Requirements
          </h2>
          <div className="space-y-4">
            <div>
              <p className="font-semibold text-slate-900 mb-2">Education</p>
              <p className="text-gray-700">{career.requirements.education}</p>
            </div>
            <div>
              <p className="font-semibold text-slate-900 mb-2">Experience</p>
              <p className="text-gray-700">{career.requirements.experience}</p>
            </div>
            <div>
              <p className="font-semibold text-slate-900 mb-3">Key Skills</p>
              <div className="flex flex-wrap gap-2">
                {career.requirements.skills.map((skill: string, idx: number) => (
                  <span key={idx} className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div className="card p-8 mb-8" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}>
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <Users className="text-yellow-600" size={28} />
            Career Growth Pathways
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {career.pathways.map((pathway: any, idx: number) => (
              <motion.div key={idx} className="border-2 border-indigo-200 rounded-xl p-4 hover:bg-indigo-50" whileHover={{ y: -5 }}>
                <p className="font-semibold text-slate-900 mb-2">{pathway.title}</p>
                <p className="text-sm text-gray-600">{pathway.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div className="flex flex-col sm:flex-row gap-4" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
          <button className="btn-primary flex items-center justify-center gap-2">
            <Download size={20} /> Download Guide
          </button>
          <button className="btn-secondary" onClick={() => navigate('/quiz')}>
            Take Career Quiz
          </button>
        </motion.div>
      </div>
    </div>
  )
}
