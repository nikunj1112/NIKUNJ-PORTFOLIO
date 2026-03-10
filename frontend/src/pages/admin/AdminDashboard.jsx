import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { logout } = useAuth();
  const location = useLocation();

  const menuItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/admin/profile', label: 'Profile', icon: '👤' },
    { path: '/admin/skills', label: 'Skills', icon: '💼' },
    { path: '/admin/projects', label: 'Projects', icon: '🚀' },
    { path: '/admin/messages', label: 'Messages', icon: '💬' },
  ];

  return (
    <div className="min-h-screen bg-primary-dark flex">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? 280 : 80 }}
        className="glass-dark flex flex-col"
      >
        {/* Logo */}
        <div className="p-6 border-b border-soft-blue/20">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent to-soft-blue flex items-center justify-center">
              <span className="text-xl font-bold text-primary-dark">NR</span>
            </div>
            <AnimatePresence>
              {sidebarOpen && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  className="font-bold text-lg overflow-hidden whitespace-nowrap"
                >
                  Admin Panel
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                location.pathname === item.path
                  ? 'bg-accent text-white'
                  : 'text-light-gray hover:bg-accent/20'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <AnimatePresence>
                {sidebarOpen && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    className="overflow-hidden whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          ))}
        </nav>

        {/* Bottom Section */}
        <div className="p-4 border-t border-soft-blue/20">
          <Link
            to="/"
            className="flex items-center gap-3 p-3 rounded-lg text-light-gray hover:bg-accent/20 transition-all mb-2"
          >
            <span className="text-xl">🌐</span>
            <AnimatePresence>
              {sidebarOpen && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  className="overflow-hidden whitespace-nowrap"
                >
                  View Site
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
          <button
            onClick={logout}
            className="flex items-center gap-3 p-3 rounded-lg text-red-400 hover:bg-red-400/20 transition-all w-full"
          >
            <span className="text-xl">🚪</span>
            <AnimatePresence>
              {sidebarOpen && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  className="overflow-hidden whitespace-nowrap"
                >
                  Logout
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-accent text-white flex items-center justify-center"
        >
          <svg
            className={`w-4 h-4 transition-transform ${sidebarOpen ? '' : 'rotate-180'}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;

