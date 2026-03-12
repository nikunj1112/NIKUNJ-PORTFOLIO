import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skillsAPI } from '../services/api';

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSkills();
  }, []);

  const loadSkills = async () => {
    try {
      const res = await skillsAPI.getSkills();
      setSkills(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Get unique categories from database skills
  const categories = ['All', ...new Set(skills.map(skill => skill.category))];

  const filteredSkills = filter === 'All' 
    ? skills 
    : skills.filter(skill => skill.category === filter);

  // Get emoji icon based on skill name
  const getSkillIcon = (skillName) => {
    const name = skillName.toLowerCase();
    
    // Frontend
    if (name.includes('react')) return '⚛️';
    if (name.includes('angular')) return '🅰️';
    if (name.includes('vue')) return '💚';
    if (name.includes('next') || name.includes('nextjs')) return '▲';
    if (name.includes('html')) return '🌐';
    if (name.includes('css')) return '🎨';
    if (name.includes('javascript') || name.includes('js')) return '📜';
    if (name.includes('typescript') || name.includes('ts')) return '💠';
    if (name.includes('tailwind')) return '💨';
    if (name.includes('redux')) return '🟣';
    if (name.includes('jquery')) return '🔶';
    if (name.includes('bootstrap')) return '🔷';
    if (name.includes('sass') || name.includes('scss')) return '🧶';
    
    // Backend
    if (name.includes('node')) return '🟢';
    if (name.includes('express')) return '🚀';
    if (name.includes('python')) return '🐍';
    if (name.includes('django')) return '🎻';
    if (name.includes('flask')) return '🌶️';
    if (name.includes('laravel') || name.includes('php')) return '🐘';
    if (name.includes('firebase')) return '🔥';
    if (name.includes('graphql')) return '◼️';
    if (name.includes('rest') || name.includes('api')) return '🔗';
    if (name.includes('jwt')) return '🔐';
    
    // Database
    if (name.includes('mongodb') || name.includes('mongo')) return '🍃';
    if (name.includes('mysql') || name.includes('sql')) return '🗃️';
    if (name.includes('postgresql') || name.includes('postgres')) return '🐘';
    if (name.includes('redis')) return '🔴';
    if (name.includes('firebase')) return '🔥';
    
    // Tools
    if (name.includes('git')) return '📊';
    if (name.includes('docker')) return '🐳';
    if (name.includes('kubernetes') || name.includes('k8s')) return '☸️';
    if (name.includes('postman')) return '📮';
    if (name.includes('vscode')) return '💻';
    if (name.includes('figma')) return '🎯';
    if (name.includes('npm') || name.includes('yarn')) return '📦';
    if (name.includes('webpack')) return '📚';
    if (name.includes('vite')) return '⚡';
    
    // Default
    return '💻';
  };

  // Category badge styles
  const getCategoryBadge = (category) => {
    const styles = {
      'Frontend': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'Backend': 'bg-green-500/20 text-green-400 border-green-500/30',
      'Database': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      'Tools': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    };
    return styles[category] || 'bg-accent/20 text-accent border-accent/30';
  };

  return (
    <section id="skills" className="section-padding relative bg-secondary-dark/30">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            My <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-light-gray/70 max-w-2xl mx-auto">
            Technologies I use to build modern web applications
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-5 py-2 rounded-lg font-medium transition-all duration-300 ${
                filter === category
                  ? 'bg-accent text-white shadow-lg shadow-accent/40'
                  : 'glass hover:bg-accent/20 text-light-gray/70 hover:text-light-gray'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="loader" />
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <AnimatePresence>
              {filteredSkills.map((skill, index) => (
                <motion.div
                  key={skill._id || skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <div className="glass rounded-xl p-5 h-full flex flex-col items-center justify-center text-center border border-light-gray/10 hover:border-accent/50 transition-all duration-300">
                    {/* Icon - Always shows emoji */}
                    <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                      {skill.icon || getSkillIcon(skill.name)}
                    </div>
                    
                    {/* Name */}
                    <h3 className="font-semibold text-light-gray mb-2">
                      {skill.name}
                    </h3>
                    
                    {/* Category Badge */}
                    <span className={`text-xs px-3 py-1 rounded-full border ${getCategoryBadge(skill.category)}`}>
                      {skill.category}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {filteredSkills.length === 0 && !loading && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-light-gray/50 py-12"
          >
            No skills found in this category.
          </motion.p>
        )}
      </div>
    </section>
  );
};

export default Skills;
