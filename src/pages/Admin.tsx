import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { BarChart2, Users, BookOpen, Activity, TrendingUp, Calendar, Briefcase } from 'lucide-react'

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

type AdminResource = {
  id: number
  title: string
  type: 'Article' | 'Video' | 'Checklist'
  audience: 'All' | 'First Year' | 'Final Year'
  topic: string
  featured: boolean
}

const SESSIONS_KEY = 'careerGuide_sessions'

const INITIAL_RESOURCES: AdminResource[] = [
  {
    id: 1,
    title: 'Roadmap: Becoming a Software Engineer',
    type: 'Article',
    audience: 'Final Year',
    topic: 'Software Engineering',
    featured: true,
  },
  {
    id: 2,
    title: 'How to Choose a Specialization in CSE',
    type: 'Video',
    audience: 'First Year',
    topic: 'Career Planning',
    featured: false,
  },
  {
    id: 3,
    title: 'Checklist: Preparing for Campus Placements',
    type: 'Checklist',
    audience: 'Final Year',
    topic: 'Placements',
    featured: true,
  },
]

export default function Admin() {
  const [sessions, setSessions] = useState<Session[]>([])
  const [resources, setResources] = useState<AdminResource[]>(INITIAL_RESOURCES)

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

  const toggleFeatured = (id: number) => {
    setResources((prev) =>
      prev.map((resource) =>
        resource.id === id ? { ...resource, featured: !resource.featured } : resource,
      ),
    )
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
              Toggle which resources should be highlighted for students on the Resources page or in announcements.
            </p>

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
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

