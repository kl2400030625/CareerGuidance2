import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, Star, TrendingUp } from 'lucide-react'

const CAREERS_DATA = [
  {
    id: 1,
    title: 'Software Engineer',
    salary: '$120K - $180K',
    growth: '+22%',
    description: 'Design and develop software applications',
    skills: ['Programming', 'Problem Solving', 'Team Collaboration'],
    rating: 4.8,
  },
  {
    id: 2,
    title: 'Data Scientist',
    salary: '$110K - $170K',
    growth: '+36%',
    description: 'Analyze and visualize complex data sets',
    skills: ['Python', 'Machine Learning', 'Statistics'],
    rating: 4.7,
  },
  {
    id: 3,
    title: 'Product Manager',
    salary: '$130K - $190K',
    growth: '+18%',
    description: 'Lead product strategy and development',
    skills: ['Leadership', 'Strategy', 'Communication'],
    rating: 4.6,
  },
  {
    id: 4,
    title: 'UX/UI Designer',
    salary: '$100K - $150K',
    growth: '+28%',
    description: 'Create intuitive and beautiful user experiences',
    skills: ['Design', 'User Research', 'Prototyping'],
    rating: 4.7,
  },
  {
    id: 5,
    title: 'DevOps Engineer',
    salary: '$115K - $175K',
    growth: '+25%',
    description: 'Manage infrastructure and deployment',
    skills: ['Cloud Computing', 'Docker', 'CI/CD'],
    rating: 4.6,
  },
  {
    id: 6,
    title: 'Business Analyst',
    salary: '$90K - $140K',
    growth: '+15%',
    description: 'Analyze business requirements and solutions',
    skills: ['Analysis', 'SQL', 'Communication'],
    rating: 4.5,
  },
]

export default function Careers() {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('featured')

  const filteredCareers = CAREERS_DATA.filter((career) =>
    career.title.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => {
    if (sortBy === 'salary') return parseInt(b.salary.split('$')[1]) - parseInt(a.salary.split('$')[1])
    if (sortBy === 'growth') return parseInt(b.growth) - parseInt(a.growth)
    return 0
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl font-bold gradient-text mb-4">Explore Careers</h1>
          <p className="text-xl text-gray-400">Discover opportunities in growing fields</p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          className="mb-8 flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search careers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-indigo-500"
          >
            <option value="featured">Featured</option>
            <option value="salary">Highest Salary</option>
            <option value="growth">Fastest Growth</option>
          </select>
        </motion.div>

        {/* Careers Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredCareers.map((career) => (
            <motion.div
              key={career.id}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="card p-6 cursor-pointer group"
            >
              <Link to={`/career/${career.id}`} className="block h-full">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {career.title}
                  </h3>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-semibold text-slate-700">{career.rating}</span>
                  </div>
                </div>

                <p className="text-gray-600 mb-4">{career.description}</p>

                <div className="mb-4 space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Salary Range:</span>
                    <span className="font-semibold text-indigo-600">{career.salary}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Growth:</span>
                    <span className="font-semibold text-green-600 flex items-center gap-1">
                      <TrendingUp size={16} /> {career.growth}
                    </span>
                  </div>
                </div>

                <div className="mb-6 pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500 mb-2 font-semibold">KEY SKILLS</p>
                  <div className="flex flex-wrap gap-2">
                    {career.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <button className="w-full btn-primary text-sm">View Details</button>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
