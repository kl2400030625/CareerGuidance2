import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, User, ArrowRight, Shield } from 'lucide-react'

type Role = 'user' | 'admin'

type Account = {
  name: string
  email: string
  password: string
}

type LocationState = {
  preferredRole?: Role
}

const USERS_KEY = 'careerGuide_users'
const ADMINS_KEY = 'careerGuide_admins'

function loadAccounts(role: Role): Account[] {
  if (typeof window === 'undefined') return []
  const key = role === 'admin' ? ADMINS_KEY : USERS_KEY
  try {
    const stored = localStorage.getItem(key)
    if (!stored) return []
    return JSON.parse(stored) as Account[]
  } catch {
    return []
  }
}

function saveAccounts(role: Role, accounts: Account[]) {
  if (typeof window === 'undefined') return
  const key = role === 'admin' ? ADMINS_KEY : USERS_KEY
  localStorage.setItem(key, JSON.stringify(accounts))
}

export default function Signup() {
  const navigate = useNavigate()
  const location = useLocation()
  const state = (location.state as LocationState | null) || {}

  const [role, setRole] = useState<Role>(state.preferredRole || 'user')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    const accounts = loadAccounts(role)
    const existing = accounts.find((acc) => acc.email.toLowerCase() === email.toLowerCase())
    if (existing) {
      setError('An account with this email already exists for the selected role.')
      return
    }

    const newAccount: Account = {
      name,
      email,
      password,
    }

    const updatedAccounts = [...accounts, newAccount]
    saveAccounts(role, updatedAccounts)

    navigate('/login', {
      replace: true,
      state: { requiredRole: role },
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 pt-20 pb-20 flex items-center justify-center">
      <div className="w-full max-w-md px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 mb-1">Create your account</h1>
              <p className="text-sm text-gray-600">
                Sign up as a student or admin to get started.
              </p>
            </div>
            {role === 'admin' && (
              <div className="flex items-center gap-2 text-xs text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full font-semibold">
                <Shield size={14} /> Admin
              </div>
            )}
          </div>

          <div className="flex mb-6 border border-gray-200 rounded-lg overflow-hidden">
            <button
              type="button"
              onClick={() => setRole('user')}
              className={`flex-1 py-2 text-sm font-semibold ${
                role === 'user' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600'
              }`}
            >
              Student
            </button>
            <button
              type="button"
              onClick={() => setRole('admin')}
              className={`flex-1 py-2 text-sm font-semibold ${
                role === 'admin' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600'
              }`}
            >
              Admin
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 text-gray-400" size={18} />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 text-gray-400" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 text-gray-400" size={18} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a strong password"
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 text-gray-400" size={18} />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter your password"
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="btn-primary w-full flex items-center justify-center gap-2 mt-2"
            >
              Sign Up <ArrowRight size={18} />
            </button>
          </form>

          <p className="mt-4 text-xs text-gray-500 text-center">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/login', { state: { requiredRole: role } })}
              className="text-indigo-600 font-semibold hover:underline"
            >
              Login instead
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  )
}

