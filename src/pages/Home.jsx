import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Users, Brain, Zap } from 'lucide-react';
export default function Home() {
    const features = [
        {
            icon: Brain,
            title: 'Career Quiz',
            description: 'Discover your ideal career path through our intelligent matching system',
        },
        {
            icon: Zap,
            title: 'Career Paths',
            description: 'Explore diverse career options with detailed insights and requirements',
        },
        {
            icon: Users,
            title: 'Expert Guidance',
            description: 'Get personalized recommendations from industry experts',
        },
    ];
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 },
        },
    };
    return (<div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20">
        <motion.div className="text-center" variants={containerVariants} initial="hidden" animate="visible">
          <motion.div variants={itemVariants} className="mb-6 flex justify-center">
            <div className="inline-block bg-gradient-to-r from-indigo-600/10 to-pink-600/10 px-6 py-2 rounded-full border border-indigo-600/20 hover:border-indigo-600/40 transition-colors">
              <span className="text-indigo-400 font-semibold flex items-center gap-2">
                <Sparkles size={16}/> Welcome to Your Career Journey
              </span>
            </div>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold mb-6 gradient-text leading-tight">
            Find Your Perfect Career Path
          </motion.h1>

          <motion.p variants={itemVariants} className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Discover, explore, and navigate your ideal career with our comprehensive guidance platform
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/quiz" className="btn-primary inline-flex items-center justify-center gap-2 group">
              Start Quiz <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20}/>
            </Link>
            <Link to="/careers" className="btn-secondary inline-flex items-center justify-center gap-2">
              Explore Careers
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div className="grid md:grid-cols-3 gap-8" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (<motion.div key={index} variants={itemVariants} className="card p-8 hover:scale-105 transition-transform cursor-pointer group">
                <div className="mb-4 inline-block p-3 bg-gradient-to-r from-indigo-600/10 to-pink-600/10 rounded-lg group-hover:from-indigo-600/20 group-hover:to-pink-600/20 transition-colors">
                  <Icon className="w-6 h-6 text-indigo-600 group-hover:text-pink-600 transition-colors"/>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>);
        })}
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div className="bg-gradient-to-r from-indigo-600 to-pink-600 rounded-2xl p-12 text-center text-white" whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Future?</h2>
          <p className="text-lg mb-8 opacity-90">Take our comprehensive career assessment now</p>
          <Link to="/quiz" className="inline-block bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:scale-105 transition-transform">
            Begin Assessment
          </Link>
        </motion.div>
      </section>
    </div>);
}
