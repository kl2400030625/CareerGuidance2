import { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, Briefcase, BookOpen, Users } from 'lucide-react';
import { getCareers } from '../lib/storage';
export default function CareerDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [careers, setCareers] = useState([]);
    useEffect(() => {
        setCareers(getCareers());
    }, []);
    const career = useMemo(() => {
        const numericId = Number(id);
        if (!Number.isFinite(numericId))
            return null;
        return careers.find((c) => c.id === numericId) || null;
    }, [careers, id]);
    if (!career) {
        return <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">Career not found</div>;
    }
    return (<div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 pt-20 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.button onClick={() => navigate('/careers')} className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 mb-8" whileHover={{ x: -5 }}>
          <ArrowLeft size={20}/> Back to Careers
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
            <Briefcase className="text-indigo-600" size={28}/>
            Key Responsibilities
          </h2>
          <ul className="space-y-3">
            {career.responsibilities.map((resp, idx) => (<li key={idx} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 flex-shrink-0"/>
                <span className="text-gray-700">{resp}</span>
              </li>))}
          </ul>
        </motion.div>

        <motion.div className="card p-8 mb-8" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}>
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <BookOpen className="text-pink-600" size={28}/>
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
                {career.requirements.skills.map((skill, idx) => (<span key={idx} className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                    {skill}
                  </span>))}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div className="card p-8 mb-8" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}>
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <Users className="text-yellow-600" size={28}/>
            Career Growth Pathways
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {career.pathways.map((pathway, idx) => (<motion.div key={idx} className="border-2 border-indigo-200 rounded-xl p-4 hover:bg-indigo-50" whileHover={{ y: -5 }}>
                <p className="font-semibold text-slate-900 mb-2">{pathway.title}</p>
                <p className="text-sm text-gray-600">{pathway.description}</p>
              </motion.div>))}
          </div>
        </motion.div>

        <motion.div className="flex flex-col sm:flex-row gap-4" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
          <button className="btn-primary flex items-center justify-center gap-2">
            <Download size={20}/> Download Guide
          </button>
          <button className="btn-secondary" onClick={() => navigate('/counseling', {
            state: { suggestedCareer: career.title },
        })}>
            Talk to a Counsellor
          </button>
          <button className="btn-secondary" onClick={() => navigate('/quiz')}>
            Take Career Quiz
          </button>
        </motion.div>
      </div>
    </div>);
}
