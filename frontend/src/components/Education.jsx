import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { educationAPI } from '../services/api';
import { FaGraduationCap, FaCalendarAlt, FaUniversity } from 'react-icons/fa';

const Education = () => {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEducation();
  }, []);

  const loadEducation = async () => {
    try {
      const res = await educationAPI.getEducation();
      setEducation(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="education" className="section-padding relative bg-secondary-dark/50">
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
            My <span className="gradient-text">Education</span>
          </h2>
          <p className="text-light-gray/70 max-w-2xl mx-auto">
            Academic background and qualifications
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="loader" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {education.map((edu, index) => (
                <motion.div
                  key={edu._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <div className="glass rounded-xl p-6 h-full border border-light-gray/10 hover:border-accent/50 transition-all duration-300">
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center mb-4">
                      <FaGraduationCap className="text-xl" />
                    </div>

                    {/* Degree */}
                    <h3 className="text-xl font-bold text-light-gray mb-2 group-hover:text-white transition-colors">
                      {edu.degree}
                    </h3>

                    {/* Institution */}
                    <div className="flex items-center gap-2 text-light-gray/60 text-sm mb-2">
                      <FaUniversity className="text-xs" />
                      <span>{edu.institution}</span>
                    </div>

                    {/* Duration */}
                    {(edu.startYear || edu.endYear) && (
                      <div className="flex items-center gap-2 text-sm text-light-gray/50 mb-3">
                        <FaCalendarAlt className="text-xs" />
                        <span>
                          {edu.startYear} {edu.startYear && edu.endYear ? '-' : ''} {edu.endYear}
                        </span>
                      </div>
                    )}

                    {/* Description */}
                    {edu.description && (
                      <p className="text-sm text-light-gray/70 mt-3 pt-3 border-t border-light-gray/10">
                        {edu.description}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {education.length === 0 && !loading && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-light-gray/50 py-12"
          >
            No education records added yet.
          </motion.p>
        )}
      </div>
    </section>
  );
};

export default Education;
