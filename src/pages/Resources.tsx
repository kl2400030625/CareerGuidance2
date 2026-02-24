import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Video, FileText, Link2, Award } from 'lucide-react'
import { getAdminResources, type AdminResource } from '../lib/storage'

const RESOURCES = [
  {
    category: 'Learning Platforms',
    icon: BookOpen,
    items: [
      { name: 'Coursera', description: 'Access university-level courses', link: '#' },
      { name: 'Udemy', description: 'Affordable online course library', link: '#' },
      { name: 'LinkedIn Learning', description: 'Professional skill development', link: '#' },
    ],
  },
  {
    category: 'Video Resources',
    icon: Video,
    items: [
      { name: 'YouTube Channels', description: 'Industry expert tutorials', link: '#' },
      { name: 'Skillshare', description: 'Creative skill courses', link: '#' },
      { name: 'Masterclass', description: 'Expert-led masterclasses', link: '#' },
    ],
  },
  {
    category: 'Certifications',
    icon: Award,
    items: [
      { name: 'AWS Certification', description: 'Cloud computing expertise', link: '#' },
      { name: 'Google Cloud', description: 'Cloud platform skills', link: '#' },
      { name: 'Microsoft Azure', description: 'Enterprise cloud solutions', link: '#' },
    ],
  },
  {
    category: 'Documentation',
    icon: FileText,
    items: [
      { name: 'Technical Docs', description: 'Programming language references', link: '#' },
      { name: 'API Documentation', description: 'Integration guides', link: '#' },
      { name: 'Best Practices', description: 'Industry standards', link: '#' },
    ],
  },
  {
    category: 'Communities',
    icon: Link2,
    items: [
      { name: 'GitHub', description: 'Open source collaboration', link: '#' },
      { name: 'Stack Overflow', description: 'Q&A for developers', link: '#' },
      { name: 'Reddit Communities', description: 'Industry discussions', link: '#' },
    ],
  },
  {
    category: 'Job Boards',
    icon: Link2,
    items: [
      { name: 'LinkedIn Jobs', description: 'Professional opportunities', link: '#' },
      { name: 'Indeed', description: 'Comprehensive job search', link: '#' },
      { name: 'Glassdoor', description: 'Company reviews & salaries', link: '#' },
    ],
  },
]

export default function Resources() {
  const [adminResources, setAdminResources] = useState<AdminResource[]>([])

  useEffect(() => {
    setAdminResources(getAdminResources())
  }, [])

  const featured = adminResources.filter((r) => r.featured)

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
          className="mb-16 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl font-bold gradient-text mb-4">Resources</h1>
          <p className="text-xl text-gray-400">Everything you need to advance your career</p>
        </motion.div>

        {adminResources.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <div className="flex items-end justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white">Admin Picks</h2>
                <p className="text-sm text-gray-400">
                  Curated resources added by your admin to help you prepare faster.
                </p>
              </div>
              <div className="text-xs text-gray-400">
                {featured.length} featured • {adminResources.length} total
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(featured.length > 0 ? featured : adminResources).slice(0, 6).map((r) => (
                <a
                  key={r.id}
                  href={r.link}
                  className="card p-6 block hover:shadow-xl transition-all"
                  target={r.link.startsWith('http') ? '_blank' : undefined}
                  rel={r.link.startsWith('http') ? 'noreferrer' : undefined}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="text-lg font-bold text-slate-900">{r.title}</h3>
                    {r.featured && (
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-3">{r.description}</p>
                  <div className="flex flex-wrap gap-2 text-[11px]">
                    <span className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700">
                      {r.type}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                      {r.audience}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {r.topic}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        )}

        {/* Resources Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {RESOURCES.map((category, catIdx) => {
            const Icon = category.icon
            return (
              <motion.div
                key={catIdx}
                variants={itemVariants}
                className="space-y-4"
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-r from-indigo-600/20 to-pink-600/20 rounded-lg">
                    <Icon className="w-6 h-6 text-indigo-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">{category.category}</h2>
                </div>

                {/* Category Items */}
                <div className="space-y-3">
                  {category.items.map((item, idx) => (
                    <motion.a
                      key={idx}
                      href={item.link}
                      whileHover={{ x: 5 }}
                      className="card p-5 block hover:shadow-xl transition-all cursor-pointer group"
                    >
                      <h3 className="font-bold text-slate-900 grup-hover:text-indigo-600 transition-colors mb-1 flex items-center gap-2">
                        {item.name}
                        <span className="text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                      </h3>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Tips Section */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-white mb-8">Career Development Tips</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: 'Build Your Portfolio',
                description: 'Showcase your best work with real projects and achievements',
              },
              {
                title: 'Network Actively',
                description: 'Connect with professionals in your desired field',
              },
              {
                title: 'Keep Learning',
                description: 'Stay updated with industry trends and new technologies',
              },
              {
                title: 'Gain Experience',
                description: 'Take internships and side projects to build practical skills',
              },
            ].map((tip, idx) => (
              <motion.div
                key={idx}
                className="card p-6"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-pink-600 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-lg">{idx + 1}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{tip.title}</h3>
                <p className="text-gray-600">{tip.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="mt-20 bg-gradient-to-r from-indigo-600 to-pink-600 rounded-2xl p-12 text-center text-white"
          whileHover={{ scale: 1.02 }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-4">Get Personalized Learning Path</h2>
          <p className="text-lg mb-8 opacity-90">Based on your career choice, we'll create a custom roadmap</p>
          <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:scale-105 transition-transform">
            Create Your Path
          </button>
        </motion.div>
      </div>
    </div>
  )
}
