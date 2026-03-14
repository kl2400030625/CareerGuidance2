import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
const QUIZ_QUESTIONS = [
    {
        id: 1,
        question: 'What energizes you the most?',
        options: ['Building things', 'Analyzing data', 'Leading people', 'Creating designs'],
        category: 'motivation',
    },
    {
        id: 2,
        question: 'Preferred work environment?',
        options: ['Fast-paced startup', 'Large corporation', 'Freelance/Independent', 'Academic/Research'],
        category: 'environment',
    },
    {
        id: 3,
        question: 'Your strongest skills?',
        options: ['Technical/Programming', 'Problem-solving', 'Communication', 'Creativity'],
        category: 'skills',
    },
    {
        id: 4,
        question: 'Career priority?',
        options: ['High income', 'Work-life balance', 'Impact & Purpose', 'Continuous learning'],
        category: 'priority',
    },
    {
        id: 5,
        question: 'Preferred team size?',
        options: ['Small (2-5)', 'Medium (6-20)', 'Large (20+)', 'Solo/Remote'],
        category: 'teamSize',
    },
];
const CAREER_MATCHES = {
    'Building things-Technical/Programming-High income': 'Software Engineer',
    'Analyzing data-Problem-solving-Impact & Purpose': 'Data Scientist',
    'Leading people-Communication-Impact & Purpose': 'Product Manager',
    'Creating designs-Creativity-Work-life balance': 'UX/UI Designer',
};
export default function Quiz() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const navigate = useNavigate();
    const handleAnswer = (option) => {
        const newAnswers = [...answers, option];
        setAnswers(newAnswers);
        if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        }
        else {
            setShowResults(true);
        }
    };
    const getCareerMatch = () => {
        if (answers.length < 3)
            return 'Software Engineer';
        return Object.values(CAREER_MATCHES)[Math.floor(Math.random() * Object.values(CAREER_MATCHES).length)];
    };
    const resetQuiz = () => {
        setCurrentQuestion(0);
        setAnswers([]);
        setShowResults(false);
    };
    const progress = ((currentQuestion + 1) / QUIZ_QUESTIONS.length) * 100;
    return (<div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 pt-20 pb-20 flex items-center justify-center">
      <div className="w-full max-w-2xl px-4">
        <AnimatePresence mode="wait">
          {!showResults ? (<motion.div key="quiz" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="card p-8">
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-semibold text-slate-600">
                    Question {currentQuestion + 1} of {QUIZ_QUESTIONS.length}
                  </span>
                  <span className="text-sm font-semibold text-indigo-600">{Math.round(progress)}%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div className="h-full bg-gradient-to-r from-indigo-600 to-pink-600" initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.5 }}/>
                </div>
              </div>

              <motion.h2 key={`question-${currentQuestion}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-3xl font-bold text-slate-900 mb-8">
                {QUIZ_QUESTIONS[currentQuestion].question}
              </motion.h2>

              <div className="space-y-3">
                {QUIZ_QUESTIONS[currentQuestion].options.map((option, idx) => (<motion.button key={option} onClick={() => handleAnswer(option)} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full p-4 text-left border-2 border-gray-200 rounded-lg hover:border-indigo-600 hover:bg-indigo-50 transition-all font-semibold text-slate-900 group">
                    <span className="flex items-center gap-3">
                      <span className="w-5 h-5 border-2 border-gray-300 rounded group-hover:border-indigo-600 transition-colors"/>
                      {option}
                    </span>
                  </motion.button>))}
              </div>
            </motion.div>) : (<motion.div key="results" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="card p-12 text-center">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: 'spring' }} className="mb-6">
                <CheckCircle className="w-20 h-20 text-green-500 mx-auto"/>
              </motion.div>

              <h2 className="text-3xl font-bold text-slate-900 mb-4">Quiz Complete!</h2>
              <p className="text-gray-600 mb-8">Based on your responses, we recommend:</p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-gradient-to-r from-indigo-600 to-pink-600 rounded-xl p-8 text-white mb-8">
                <p className="text-lg mb-2">Your Ideal Career Match</p>
                <h3 className="text-5xl font-bold">{getCareerMatch()}</h3>
              </motion.div>

              <p className="text-gray-600 mb-8">
                This career aligns perfectly with your skills, preferences, and professional goals.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button onClick={resetQuiz} className="btn-secondary">
                  Retake Quiz
                </button>
                <button className="btn-primary" onClick={() => navigate('/counseling', {
                state: { suggestedCareer: getCareerMatch() },
            })}>
                  Talk to a Counsellor
                </button>
              </div>
            </motion.div>)}
        </AnimatePresence>
      </div>
    </div>);
}
