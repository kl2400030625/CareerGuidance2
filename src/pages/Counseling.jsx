import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, Mail, Phone, User, Briefcase, MessageCircle } from 'lucide-react';
const COUNSELORS = [
    {
        id: 1,
        name: 'Bharat Chandra',
        title: 'Senior Career Counsellor',
        focusAreas: ['Software Engineering', 'Data Science', 'Higher Studies'],
        experienceYears: 10,
        contactEmail: 'bharat.chandra@careerguide.edu',
        contactPhone: '+91-98765-12345',
        availableSlots: ['Mon 4:00 PM', 'Wed 6:00 PM', 'Sat 11:00 AM'],
    },
    {
        id: 2,
        name: 'Sai Bhavesh',
        title: 'Technology Career Coach',
        focusAreas: ['Full Stack Development', 'DevOps', 'Cloud Careers'],
        experienceYears: 7,
        contactEmail: 'sai.bhavesh@careerguide.edu',
        contactPhone: '+91-98765-67890',
        availableSlots: ['Tue 5:00 PM', 'Thu 7:00 PM', 'Sat 3:00 PM'],
    },
    {
        id: 3,
        name: 'Upendra',
        title: 'Design & Product Mentor',
        focusAreas: ['UI/UX Design', 'Product Management', 'Business Analysis'],
        experienceYears: 8,
        contactEmail: 'upendra@careerguide.edu',
        contactPhone: '+91-98765-24680',
        availableSlots: ['Mon 6:00 PM', 'Fri 4:00 PM', 'Sun 10:00 AM'],
    },
];
const SESSIONS_KEY = 'careerGuide_sessions';
function loadSessions() {
    if (typeof window === 'undefined')
        return [];
    try {
        const stored = localStorage.getItem(SESSIONS_KEY);
        if (!stored)
            return [];
        return JSON.parse(stored);
    }
    catch {
        return [];
    }
}
function saveSessions(sessions) {
    if (typeof window === 'undefined')
        return;
    localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
}
export default function Counseling() {
    const location = useLocation();
    const suggestedCareer = location.state?.suggestedCareer;
    const [selectedCounselorId, setSelectedCounselorId] = useState(COUNSELORS[0]?.id ?? 1);
    const [studentName, setStudentName] = useState('');
    const [studentEmail, setStudentEmail] = useState('');
    const [careerInterest, setCareerInterest] = useState(suggestedCareer || '');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [notes, setNotes] = useState('');
    const [sessions, setSessions] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    useEffect(() => {
        setSessions(loadSessions());
    }, []);
    useEffect(() => {
        if (!suggestedCareer)
            return;
        setCareerInterest((current) => current || suggestedCareer);
    }, [suggestedCareer]);
    const selectedCounselor = useMemo(() => COUNSELORS.find((c) => c.id === selectedCounselorId) ?? COUNSELORS[0], [selectedCounselorId]);
    const upcomingSessions = useMemo(() => {
        return [...sessions].sort((a, b) => new Date(a.date + ' ' + a.time).getTime() - new Date(b.date + ' ' + b.time).getTime());
    }, [sessions]);
    const handleSubmit = (event) => {
        event.preventDefault();
        if (!studentName || !studentEmail || !careerInterest || !date || !time) {
            setSuccessMessage('');
            return;
        }
        const newSession = {
            id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
            counselorId: selectedCounselor.id,
            counselorName: selectedCounselor.name,
            studentName,
            studentEmail,
            careerInterest,
            date,
            time,
            notes: notes.trim() || undefined,
            createdAt: new Date().toISOString(),
        };
        const updatedSessions = [...sessions, newSession];
        setSessions(updatedSessions);
        saveSessions(updatedSessions);
        setStudentName('');
        setStudentEmail('');
        setDate('');
        setTime('');
        setNotes('');
        if (!suggestedCareer) {
            setCareerInterest('');
        }
        setSuccessMessage('Your counseling session has been scheduled. Check your email for confirmation.');
        setTimeout(() => setSuccessMessage(''), 5000);
    };
    return (<div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl font-bold gradient-text mb-4">
            Career Counseling & Mentorship
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="text-lg text-gray-300 max-w-2xl mx-auto">
            Connect with experienced career counsellors to clarify your goals, explore options, and plan your next steps.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-1 space-y-4">
            <h2 className="text-xl font-semibold text-white mb-2 flex items-center gap-2">
              <User className="text-indigo-400"/> Our Counsellors
            </h2>
            {COUNSELORS.map((counselor) => (<button key={counselor.id} onClick={() => setSelectedCounselorId(counselor.id)} className={`w-full text-left card p-5 border-2 ${selectedCounselorId === counselor.id ? 'border-indigo-500' : 'border-transparent'}`}>
                <h3 className="text-lg font-bold text-slate-900 mb-1">{counselor.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{counselor.title}</p>
                <p className="text-xs text-gray-500 mb-2">
                  {counselor.experienceYears}+ years experience • Focus on
                </p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {counselor.focusAreas.map((area) => (<span key={area} className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-medium">
                      {area}
                    </span>))}
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Mail size={14}/> {counselor.contactEmail}
                  </span>
                </div>
              </button>))}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-2 card p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-2 flex items-center gap-2">
              <Calendar className="text-indigo-600"/> Book a Counseling Session
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              You are booking a session with <span className="font-semibold">{selectedCounselor.name}</span>. Choose a
              convenient date and time, and share your interests so we can prepare better for you.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 text-gray-400" size={18}/>
                    <input type="text" value={studentName} onChange={(e) => setStudentName(e.target.value)} placeholder="Enter your full name" className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-indigo-500" required/>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 text-gray-400" size={18}/>
                    <input type="email" value={studentEmail} onChange={(e) => setStudentEmail(e.target.value)} placeholder="you@example.com" className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-indigo-500" required/>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Career Interest / Goal</label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-2.5 text-gray-400" size={18}/>
                  <input type="text" value={careerInterest} onChange={(e) => setCareerInterest(e.target.value)} placeholder="e.g. Software Engineer, Data Scientist, Higher Studies in USA" className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-indigo-500" required/>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-2.5 text-gray-400" size={18}/>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-indigo-500" required/>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Time</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-2.5 text-gray-400" size={18}/>
                    <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-indigo-500" required/>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Suggested Slot</label>
                  <select value="" onChange={(e) => {
            if (!e.target.value)
                return;
            const [slotDate, slotTime] = e.target.value.split('|');
            if (slotDate)
                setDate(slotDate);
            if (slotTime)
                setTime(slotTime);
        }} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white focus:outline-none focus:border-indigo-500">
                    <option value="">Choose from counsellor slots</option>
                    {selectedCounselor.availableSlots.map((slot) => (<option key={slot} value={`|${slot.split(' ')[1] || ''}`}>
                        {slot}
                      </option>))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Questions or Context (Optional)</label>
                <div className="relative">
                  <MessageCircle className="absolute left-3 top-2.5 text-gray-400" size={18}/>
                  <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} placeholder="Share anything specific you want to discuss during the session..." className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-indigo-500 resize-none"/>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-4">
                <button type="submit" className="btn-primary flex items-center justify-center gap-2">
                  <Calendar size={18}/> Schedule Session
                </button>
                <p className="text-xs text-gray-500 flex items-center gap-2">
                  <Phone size={14} className="text-indigo-500"/>
                  You will receive joining details on your email before the session.
                </p>
              </div>

              {successMessage && (<p className="mt-3 text-sm font-medium text-green-600 bg-green-50 border border-green-200 rounded-md px-3 py-2">
                  {successMessage}
                </p>)}
            </form>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-4">Upcoming Sessions</h2>
          {upcomingSessions.length === 0 ? (<p className="text-gray-400 text-sm">
              You do not have any scheduled sessions yet. Book your first session using the form above.
            </p>) : (<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {upcomingSessions.map((session) => (<div key={session.id} className="card p-4">
                  <p className="text-xs font-semibold text-indigo-600 mb-1">{session.careerInterest}</p>
                  <p className="text-sm font-bold text-slate-900 mb-1 flex items-center gap-2">
                    <User size={16} className="text-slate-700"/> {session.studentName}
                  </p>
                  <p className="text-xs text-gray-600 mb-2">With {session.counselorName}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-600 mb-1">
                    <Calendar size={14}/> {session.date}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
                    <Clock size={14}/> {session.time}
                  </div>
                  {session.notes && (<p className="text-xs text-gray-500 border-t border-gray-200 mt-2 pt-2 line-clamp-2">
                      {session.notes}
                    </p>)}
                </div>))}
            </div>)}
        </motion.div>
      </div>
    </div>);
}
