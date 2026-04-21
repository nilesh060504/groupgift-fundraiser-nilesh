import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { HiOutlineSun, HiOutlineMoon, HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import { HiGift } from 'react-icons/hi2';

export default function Navbar() {
    const { darkMode, toggleDarkMode } = useTheme();
    const { user, logout } = useAuth();
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();

    const links = [
        { path: '/', label: 'Home' },
        { path: '/dashboard', label: 'Dashboard' },
        { path: '/create', label: 'Create Fund' },
        { path: '/analytics', label: 'Analytics' },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="w-9 h-9 gradient-bg rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/25 group-hover:shadow-primary-500/40 transition-shadow">
                            <HiGift className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-lg font-bold gradient-text hidden sm:block">GroupGift</span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-1">
                        {links.map(link => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${isActive(link.path)
                                        ? 'bg-primary-500/10 text-primary-600 dark:text-primary-400'
                                        : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-white hover:bg-surface-100 dark:hover:bg-surface-800'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Right side */}
                    <div className="flex items-center gap-2">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={toggleDarkMode}
                            className="p-2.5 rounded-xl bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400 hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors"
                            aria-label="Toggle dark mode"
                        >
                            {darkMode ? <HiOutlineSun className="w-5 h-5" /> : <HiOutlineMoon className="w-5 h-5" />}
                        </motion.button>

                        <Link
                            to={user ? "/create" : "/login"}
                            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 gradient-bg text-white text-sm font-semibold rounded-xl shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-all duration-200"
                        >
                            {user ? 'Create Fund' : 'Login'}
                        </Link>
                        {user && (
                            <button
                                onClick={logout}
                                className="hidden sm:inline-flex items-center px-3 py-2 bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300 text-sm font-medium rounded-xl"
                            >
                                Logout
                            </button>
                        )}

                        {/* Mobile menu button */}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="md:hidden p-2.5 rounded-xl bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400"
                        >
                            {mobileOpen ? <HiOutlineX className="w-5 h-5" /> : <HiOutlineMenu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden border-t border-surface-200 dark:border-surface-800"
                    >
                        <div className="px-4 py-3 space-y-1">
                            {links.map(link => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setMobileOpen(false)}
                                    className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${isActive(link.path)
                                            ? 'bg-primary-500/10 text-primary-600 dark:text-primary-400'
                                            : 'text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800'
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <Link
                                to={user ? "/create" : "/login"}
                                onClick={() => setMobileOpen(false)}
                                className="block text-center px-4 py-2.5 gradient-bg text-white text-sm font-semibold rounded-xl mt-2"
                            >
                                {user ? 'Create Fund' : 'Login'}
                            </Link>
                            {user && (
                                <button
                                    onClick={() => {
                                        logout();
                                        setMobileOpen(false);
                                    }}
                                    className="block w-full text-center px-4 py-2.5 bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300 text-sm font-semibold rounded-xl mt-2"
                                >
                                    Logout
                                </button>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
