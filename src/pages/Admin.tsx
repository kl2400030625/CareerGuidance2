import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  BarChart2,
  Users,
  BookOpen,
  Activity,
  TrendingUp,
  Calendar,
  Briefcase,
  LogOut,
  Shield,
  Trash2,
} from 'lucide-react'
import {
  getAdminResources,
  getCareers,
  saveAdminResources,
  saveCareers,
  type AdminResource,
  type Career,
} from '../lib/storage'

type Session = {
  id: string
  counselorId: number
  counselorName: string
  studentName: string
  studentEmail: string
  careerInterest: string
  date: string
  time: string
  notes?: string
  createdAt: string
}

type Role = 'user' | 'admin'

type Account = {
  name: string
  email: string
  password: string
}

const SESSIONS_KEY = 'careerGuide_sessions'
const USERS_KEY = 'careerGuide_users'
const ADMINS_KEY = 'careerGuide_admins'
const CURRENT_USER_KEY = 'careerGuide_currentUser'

export default function Admin() {
  const navigate = useNavigate()
  const [sessions, setSessions] = useState<Session[]>([])
  const [resources, setResources] = useState<AdminResource[]>([])
  const [careers, setCareersState] = useState<Career[]>([])
  const [users, setUsers] = useState<Account[]>([])
  const [admins, setAdmins] = useState<Account[]>([])
  const [currentAdmin, setCurrentAdmin] = useState<Account | null>(null)

  const [careerEditingId, setCareerEditingId] = useState<number | null>(null)
  const [careerTitle, setCareerTitle] = useState('')
  const [careerSalary, setCareerSalary] = useState('$100K - $150K')
  const [careerGrowth, setCareerGrowth] = useState('+10%')
  const [careerRating, setCareerRating] = useState('4.5')
  const [careerDescription, setCareerDescription] = useState('')
  const [careerSkillsCsv, setCareerSkillsCsv] = useState('')
  const [careerOverview, setCareerOverview] = useState('')
  const [careerResponsibilitiesText, setCareerResponsibilitiesText] = useState('')
  const [careerEducation, setCareerEducation] = useState('')
  const [careerExperience, setCareerExperience] = useState('')
  const [careerReqSkillsCsv, setCareerReqSkillsCsv] = useState('')
  const [careerPathwaysText, setCareerPathwaysText] = useState('')

  const [resourceEditingId, setResourceEditingId] = useState<number | null>(null)
  const [resourceTitle, setResourceTitle] = useState('')
  const [resourceType, setResourceType] = useState<AdminResource['type']>('Article')
  const [resourceAudience, setResourceAudience] = useState<AdminResource['audience']>('All')
  const [resourceTopic, setResourceTopic] = useState('')
  const [resourceFeatured, setResourceFeatured] = useState(false)
  const [resourceLink, setResourceLink] = useState('https://')
  const [resourceDescription, setResourceDescription] = useState('')

  useEffect(() => {
    if (typeof window === 'undefined') return
    const storedUser = localStorage.getItem(CURRENT_USER_KEY)
    if (!storedUser) {
      navigate('/login', { replace: true, state: { requiredRole: 'admin' } })
      return
    }
    try {
      const parsedUser = JSON.parse(storedUser) as { role?: string; email?: string; name?: string }
      if (parsedUser.role !== 'admin') {
        navigate('/login', { replace: true, state: { requiredRole: 'admin' } })
        return
      }

      setResources(getAdminResources())
      setCareersState(getCareers())

      const rawUsers = localStorage.getItem(USERS_KEY)
      const rawAdmins = localStorage.getItem(ADMINS_KEY)

      if (rawUsers) {
        try {
          setUsers(JSON.parse(rawUsers) as Account[])
        } catch {
          setUsers([])
        }
      }

      if (rawAdmins) {
        try {
          const parsedAdmins = JSON.parse(rawAdmins) as Account[]
          setAdmins(parsedAdmins)
          const found = parsedAdmins.find(
            (a) => a.email.toLowerCase() === (parsedUser.email || '').toLowerCase(),
          )
          setCurrentAdmin(found || null)
        } catch {
          setAdmins([])
          setCurrentAdmin(null)
        }
      }
    } catch {
      navigate('/login', { replace: true, state: { requiredRole: 'admin' } })
    }
  }, [navigate])

  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      const stored = localStorage.getItem(SESSIONS_KEY)
      if (!stored) return
      const parsed = JSON.parse(stored) as Session[]
      setSessions(parsed)
    } catch {
      setSessions([])
    }
  }, [])

  const stats = useMemo(() => {
    if (sessions.length === 0) {
      return {
        totalSessions: 0,
        uniqueStudents: 0,
        topCareer: '—',
        busiestCounselor: '—',
      }
    }

    const studentEmails = new Set(sessions.map((s) => s.studentEmail.toLowerCase()))
    const careerCounts: Record<string, number> = {}
    const counselorCounts: Record<string, number> = {}

    sessions.forEach((session) => {
      careerCounts[session.careerInterest] = (careerCounts[session.careerInterest] || 0) + 1
      counselorCounts[session.counselorName] = (counselorCounts[session.counselorName] || 0) + 1
    })

    const topCareer =
      Object.entries(careerCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || '—'
    const busiestCounselor =
      Object.entries(counselorCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || '—'

    return {
      totalSessions: sessions.length,
      uniqueStudents: studentEmails.size,
      topCareer,
      busiestCounselor,
    }
  }, [sessions])

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(CURRENT_USER_KEY)
    }
    navigate('/login', { replace: true })
  }

  const removeAccount = (role: Role, email: string) => {
    if (typeof window === 'undefined') return

    const key = role === 'admin' ? ADMINS_KEY : USERS_KEY
    const list = role === 'admin' ? admins : users
    const updated = list.filter((acc) => acc.email.toLowerCase() !== email.toLowerCase())

    localStorage.setItem(key, JSON.stringify(updated))

    if (role === 'admin') {
      setAdmins(updated)
    } else {
      setUsers(updated)
    }
  }

  const toggleFeatured = (id: number) => {
    setResources((prev) => {
      const updated = prev.map((resource) =>
        resource.id === id ? { ...resource, featured: !resource.featured } : resource,
      )
      saveAdminResources(updated)
      return updated
    })
  }

  const nextId = (items: { id: number }[]) => (items.length ? Math.max(...items.map((i) => i.id)) + 1 : 1)

  const resetCareerForm = () => {
    setCareerEditingId(null)
    setCareerTitle('')
    setCareerSalary('$100K - $150K')
    setCareerGrowth('+10%')
    setCareerRating('4.5')
    setCareerDescription('')
    setCareerSkillsCsv('')
    setCareerOverview('')
    setCareerResponsibilitiesText('')
    setCareerEducation('')
    setCareerExperience('')
    setCareerReqSkillsCsv('')
    setCareerPathwaysText('')
  }

  const resetResourceForm = () => {
    setResourceEditingId(null)
    setResourceTitle('')
    setResourceType('Article')
    setResourceAudience('All')
    setResourceTopic('')
    setResourceFeatured(false)
    setResourceLink('https://')
    setResourceDescription('')
  }

  const startEditCareer = (career: Career) => {
    setCareerEditingId(career.id)
    setCareerTitle(career.title)
    setCareerSalary(career.salary)
    setCareerGrowth(career.growth)
    setCareerRating(String(career.rating))
    setCareerDescription(career.description)
    setCareerSkillsCsv(career.skills.join(', '))
    setCareerOverview(career.overview)
    setCareerResponsibilitiesText(career.responsibilities.join('\n'))
    setCareerEducation(career.requirements.education)
    setCareerExperience(career.requirements.experience)
    setCareerReqSkillsCsv(career.requirements.skills.join(', '))
    setCareerPathwaysText(
      career.pathways.map((p) => `${p.title} - ${p.description}`).join('\n'),
    )
  }

  const upsertCareer = (event: React.FormEvent) => {
    event.preventDefault()

    const skills = careerSkillsCsv
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
    const responsibilities = careerResponsibilitiesText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean)
    const reqSkills = careerReqSkillsCsv
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
    const pathways = careerPathwaysText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean)
      .map((line) => {
        const idx = line.indexOf('-')
        if (idx === -1) return { title: line, description: '' }
        return {
          title: line.slice(0, idx).trim(),
          description: line.slice(idx + 1).trim(),
        }
      })

    const rating = Number(careerRating)
    const safeRating = Number.isFinite(rating) ? rating : 4.5

    setCareersState((prev) => {
      const id = careerEditingId ?? nextId(prev)
      const newCareer: Career = {
        id,
        title: careerTitle.trim(),
        salary: careerSalary.trim(),
        growth: careerGrowth.trim(),
        description: careerDescription.trim(),
        skills,
        rating: safeRating,
        overview: careerOverview.trim(),
        responsibilities,
        requirements: {
          education: careerEducation.trim(),
          experience: careerExperience.trim(),
          skills: reqSkills,
        },
        pathways,
      }

      const updated = careerEditingId
        ? prev.map((c) => (c.id === id ? newCareer : c))
        : [newCareer, ...prev]

      saveCareers(updated)
      return updated
    })

    resetCareerForm()
  }

  const deleteCareer = (id: number) => {
    setCareersState((prev) => {
      const updated = prev.filter((c) => c.id !== id)
      saveCareers(updated)
      return updated
    })
    if (careerEditingId === id) resetCareerForm()
  }

  const startEditResource = (resource: AdminResource) => {
    setResourceEditingId(resource.id)
    setResourceTitle(resource.title)
    setResourceType(resource.type)
    setResourceAudience(resource.audience)
    setResourceTopic(resource.topic)
    setResourceFeatured(resource.featured)
    setResourceLink(resource.link)
    setResourceDescription(resource.description)
  }

  const upsertResource = (event: React.FormEvent) => {
    event.preventDefault()

    setResources((prev) => {
      const id = resourceEditingId ?? nextId(prev)
      const newResource: AdminResource = {
        id,
        title: resourceTitle.trim(),
        type: resourceType,
        audience: resourceAudience,
        topic: resourceTopic.trim(),
        featured: resourceFeatured,
        link: resourceLink.trim(),
        description: resourceDescription.trim(),
      }

      const updated = resourceEditingId
        ? prev.map((r) => (r.id === id ? newResource : r))
        : [newResource, ...prev]

      saveAdminResources(updated)
      return updated
    })

    resetResourceForm()
  }

  const deleteResource = (id: number) => {
    setResources((prev) => {
      const updated = prev.filter((r) => r.id !== id)
      saveAdminResources(updated)
      return updated
    })
    if (resourceEditingId === id) resetResourceForm()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <h1 className="text-4xl font-bold gradient-text mb-2">Admin Dashboard</h1>
            <p className="text-gray-300 text-sm max-w-xl">
              Monitor student engagement, track counseling sessions, and highlight key career resources for your learners.
            </p>
          </div>
          <div className="flex flex-col items-start sm:items-end gap-2">
            {currentAdmin && (
              <div className="flex items-center gap-2 text-xs text-gray-200">
                <Shield size={14} className="text-indigo-400" />
                <span className="font-semibold">{currentAdmin.name}</span>
                <span className="opacity-80">&lt;{currentAdmin.email}&gt;</span>
              </div>
            )}
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-slate-800 text-gray-100 border border-slate-600 hover:bg-slate-700 transition-colors"
            >
              <LogOut size={14} /> Logout
            </button>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card p-5 flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
              <Users className="text-indigo-600" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500">Total Sessions</p>
              <p className="text-2xl font-bold text-slate-900">{stats.totalSessions}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card p-5 flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
              <Activity className="text-emerald-600" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500">Unique Students</p>
              <p className="text-2xl font-bold text-slate-900">{stats.uniqueStudents}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card p-5 flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
              <TrendingUp className="text-amber-600" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500">Top Career Interest</p>
              <p className="text-sm font-semibold text-slate-900 line-clamp-2">{stats.topCareer}</p>
            </div>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 card p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <BarChart2 className="text-indigo-600" />
                <h2 className="text-lg font-bold text-slate-900">Recent Counseling Sessions</h2>
              </div>
              <span className="text-xs text-gray-500">
                Showing latest {Math.min(sessions.length, 6)} of {sessions.length}
              </span>
            </div>

            {sessions.length === 0 ? (
              <p className="text-sm text-gray-500">
                No sessions have been booked yet. Once students start scheduling sessions, you will see the details here.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="text-left text-gray-500 border-b">
                      <th className="py-2 pr-3">Student</th>
                      <th className="py-2 pr-3">Career Interest</th>
                      <th className="py-2 pr-3">Counsellor</th>
                      <th className="py-2 pr-3">Date</th>
                      <th className="py-2 pr-3">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...sessions]
                      .sort(
                        (a, b) =>
                          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
                      )
                      .slice(0, 6)
                      .map((session) => (
                        <tr key={session.id} className="border-b last:border-0">
                          <td className="py-2 pr-3">
                            <p className="font-semibold text-slate-900">{session.studentName}</p>
                            <p className="text-xs text-gray-500">{session.studentEmail}</p>
                          </td>
                          <td className="py-2 pr-3 max-w-[160px]">
                            <span className="text-xs font-medium text-indigo-700 bg-indigo-50 px-2 py-1 rounded-full inline-block">
                              {session.careerInterest}
                            </span>
                          </td>
                          <td className="py-2 pr-3">
                            <p className="text-xs text-gray-700">{session.counselorName}</p>
                          </td>
                          <td className="py-2 pr-3">
                            <div className="flex items-center gap-1 text-xs text-gray-600">
                              <Calendar size={14} /> {session.date}
                            </div>
                          </td>
                          <td className="py-2 pr-3">
                            <div className="flex items-center gap-1 text-xs text-gray-600">
                              {session.time}
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card p-6 space-y-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="text-indigo-600" />
              <h2 className="text-lg font-bold text-slate-900">Career Resources</h2>
            </div>
            <p className="text-xs text-gray-500 mb-3">
              Create, update, and highlight resources that students will see on the Resources page.
            </p>

            <form onSubmit={upsertResource} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Title</label>
                  <input
                    value={resourceTitle}
                    onChange={(e) => setResourceTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-indigo-500"
                    placeholder="e.g. Resume checklist for internships"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Link</label>
                  <input
                    value={resourceLink}
                    onChange={(e) => setResourceLink(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-indigo-500"
                    placeholder="https://..."
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Description</label>
                <textarea
                  value={resourceDescription}
                  onChange={(e) => setResourceDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-indigo-500"
                  rows={2}
                  placeholder="Short summary students will see"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Topic</label>
                  <input
                    value={resourceTopic}
                    onChange={(e) => setResourceTopic(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-indigo-500"
                    placeholder="e.g. Placements"
                    required
                  />
                </div>
                <div className="flex items-end gap-3">
                  <label className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                    <input
                      type="checkbox"
                      checked={resourceFeatured}
                      onChange={(e) => setResourceFeatured(e.target.checked)}
                      className="h-4 w-4"
                    />
                    Featured
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Type</label>
                  <select
                    value={resourceType}
                    onChange={(e) => setResourceType(e.target.value as AdminResource['type'])}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Article">Article</option>
                    <option value="Video">Video</option>
                    <option value="Checklist">Checklist</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Audience</label>
                  <select
                    value={resourceAudience}
                    onChange={(e) =>
                      setResourceAudience(e.target.value as AdminResource['audience'])
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-indigo-500"
                  >
                    <option value="All">All</option>
                    <option value="First Year">First Year</option>
                    <option value="Final Year">Final Year</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <button type="submit" className="btn-primary text-sm">
                  {resourceEditingId ? 'Update Resource' : 'Add Resource'}
                </button>
                {resourceEditingId && (
                  <button
                    type="button"
                    onClick={resetResourceForm}
                    className="btn-secondary text-sm"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>

            <div className="space-y-3">
              {resources.map((resource) => (
                <div
                  key={resource.id}
                  className="border border-gray-200 rounded-lg p-3 flex items-start justify-between gap-3"
                >
                  <div>
                    <p className="text-sm font-semibold text-slate-900 mb-1">
                      {resource.title}
                    </p>
                    <p className="text-xs text-gray-600 mb-2 line-clamp-2">{resource.description}</p>
                    <div className="flex flex-wrap gap-1 text-[11px] text-gray-500 mb-1">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                        <Briefcase size={12} />
                        {resource.topic}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700">
                        {resource.type}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                        {resource.audience}
                      </span>
                    </div>
                    {resource.featured && (
                      <span className="inline-block text-[11px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full font-medium">
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 items-end">
                    <button
                      type="button"
                      onClick={() => toggleFeatured(resource.id)}
                      className={`text-xs px-3 py-1 rounded-full font-semibold border ${
                        resource.featured
                          ? 'bg-amber-500 text-white border-amber-500'
                          : 'bg-white text-gray-700 border-gray-300'
                      }`}
                    >
                      {resource.featured ? 'Unfeature' : 'Mark Featured'}
                    </button>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => startEditResource(resource)}
                        className="text-xs px-3 py-1 rounded-full font-semibold border bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteResource(resource.id)}
                        className="text-xs px-3 py-1 rounded-full font-semibold border bg-red-50 text-red-600 border-red-200 hover:bg-red-100"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-3 card p-6"
          >
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Briefcase className="text-indigo-600" />
                <h2 className="text-lg font-bold text-slate-900">Careers (CRUD)</h2>
              </div>
              <p className="text-xs text-gray-500">{careers.length} careers</p>
            </div>

            <form onSubmit={upsertCareer} className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Title</label>
                  <input
                    value={careerTitle}
                    onChange={(e) => setCareerTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-indigo-500"
                    placeholder="e.g. Cybersecurity Analyst"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Skills (comma separated)</label>
                  <input
                    value={careerSkillsCsv}
                    onChange={(e) => setCareerSkillsCsv(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-indigo-500"
                    placeholder="e.g. Networking, Linux, SIEM"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Salary</label>
                  <input
                    value={careerSalary}
                    onChange={(e) => setCareerSalary(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-indigo-500"
                    placeholder="$100K - $150K"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Growth</label>
                  <input
                    value={careerGrowth}
                    onChange={(e) => setCareerGrowth(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-indigo-500"
                    placeholder="+15%"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Rating</label>
                  <input
                    value={careerRating}
                    onChange={(e) => setCareerRating(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-indigo-500"
                    placeholder="4.6"
                  />
                </div>
                <div className="md:col-span-1">
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Short description</label>
                  <input
                    value={careerDescription}
                    onChange={(e) => setCareerDescription(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-indigo-500"
                    placeholder="1 line summary"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Overview</label>
                  <textarea
                    value={careerOverview}
                    onChange={(e) => setCareerOverview(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-indigo-500"
                    rows={2}
                    placeholder="What is this career about?"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Responsibilities (one per line)
                  </label>
                  <textarea
                    value={careerResponsibilitiesText}
                    onChange={(e) => setCareerResponsibilitiesText(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-indigo-500"
                    rows={2}
                    placeholder={'e.g.\nMonitor systems\nRespond to incidents'}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Education</label>
                  <input
                    value={careerEducation}
                    onChange={(e) => setCareerEducation(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-indigo-500"
                    placeholder="e.g. Bachelor's in ..."
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Experience</label>
                  <input
                    value={careerExperience}
                    onChange={(e) => setCareerExperience(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-indigo-500"
                    placeholder="e.g. 0-2 years"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Requirement skills (comma separated)
                  </label>
                  <input
                    value={careerReqSkillsCsv}
                    onChange={(e) => setCareerReqSkillsCsv(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-indigo-500"
                    placeholder="e.g. SQL, Python, Git"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Growth pathways (one per line: Title - Description)
                  </label>
                  <textarea
                    value={careerPathwaysText}
                    onChange={(e) => setCareerPathwaysText(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-indigo-500"
                    rows={2}
                    placeholder={'e.g.\nSenior Analyst - Lead projects\nManager - Manage teams'}
                    required
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <button type="submit" className="btn-primary text-sm">
                  {careerEditingId ? 'Update Career' : 'Add Career'}
                </button>
                {careerEditingId && (
                  <button
                    type="button"
                    onClick={resetCareerForm}
                    className="btn-secondary text-sm"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>

            <div className="mt-6 grid md:grid-cols-2 gap-3">
              {careers.map((career) => (
                <div
                  key={career.id}
                  className="border border-gray-200 rounded-lg p-4 flex items-start justify-between gap-3"
                >
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{career.title}</p>
                    <p className="text-xs text-gray-600 line-clamp-2">{career.description}</p>
                    <div className="mt-2 flex flex-wrap gap-2 text-[11px]">
                      <span className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700">
                        {career.salary}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                        {career.growth}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                        ⭐ {career.rating}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 items-end">
                    <button
                      type="button"
                      onClick={() => startEditCareer(career)}
                      className="text-xs px-3 py-1 rounded-full font-semibold border bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteCareer(career.id)}
                      className="text-xs px-3 py-1 rounded-full font-semibold border bg-red-50 text-red-600 border-red-200 hover:bg-red-100"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-3 card p-6 mt-8"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Users className="text-indigo-600" />
                <h2 className="text-lg font-bold text-slate-900">User Management</h2>
              </div>
              <p className="text-xs text-gray-500">
                {users.length} students • {admins.length} admins
              </p>
            </div>

            {users.length === 0 && admins.length === 0 ? (
              <p className="text-sm text-gray-500">
                No accounts have been created yet. As users sign up, you&apos;ll be able to review
                and manage them here.
              </p>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-semibold text-slate-800 mb-2">Students</h3>
                  <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                    {users.length === 0 && (
                      <p className="text-xs text-gray-500">No student accounts yet.</p>
                    )}
                    {users.map((user) => (
                      <div
                        key={user.email}
                        className="flex items-center justify-between gap-3 border border-gray-200 rounded-lg px-3 py-2"
                      >
                        <div>
                          <p className="text-sm font-medium text-slate-900">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeAccount('user', user.email)}
                          className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition-colors"
                        >
                          <Trash2 size={12} /> Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-slate-800 mb-2">Admins</h3>
                  <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                    {admins.length === 0 && (
                      <p className="text-xs text-gray-500">No admin accounts yet.</p>
                    )}
                    {admins.map((admin) => (
                      <div
                        key={admin.email}
                        className="flex items-center justify-between gap-3 border border-gray-200 rounded-lg px-3 py-2"
                      >
                        <div>
                          <p className="text-sm font-medium text-slate-900">{admin.name}</p>
                          <p className="text-xs text-gray-500">{admin.email}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeAccount('admin', admin.email)}
                          className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition-colors disabled:opacity-50"
                          disabled={
                            !!currentAdmin &&
                            admin.email.toLowerCase() === currentAdmin.email.toLowerCase()
                          }
                        >
                          <Trash2 size={12} /> Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

