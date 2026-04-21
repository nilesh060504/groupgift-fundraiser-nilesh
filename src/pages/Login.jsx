import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { HiOutlineMail, HiOutlineLockClosed } from 'react-icons/hi';
import { useAuth } from '../context/AuthContext';

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const redirectTo = location.state?.from || '/dashboard';

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            toast.error('Email and password are required');
            return;
        }

        try {
            setLoading(true);
            await login(email, password);
            toast.success('Logged in successfully');
            navigate(redirectTo, { replace: true });
        } catch (err) {
            toast.error(err.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 flex items-center justify-center">
            <motion.form
                onSubmit={onSubmit}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-white dark:bg-surface-800/50 rounded-2xl border border-surface-200 dark:border-surface-700/50 p-6 sm:p-8 shadow-sm space-y-5"
            >
                <div>
                    <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Sign in</h1>
                    <p className="text-surface-500 dark:text-surface-400 mt-1">Use your email and password to continue.</p>
                </div>

                <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        <HiOutlineMail className="w-4 h-4" />
                        Email
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 bg-surface-50 dark:bg-surface-900 border border-surface-200 dark:border-surface-700 rounded-xl text-surface-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                    />
                </div>

                <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        <HiOutlineLockClosed className="w-4 h-4" />
                        Password
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                        className="w-full px-4 py-3 bg-surface-50 dark:bg-surface-900 border border-surface-200 dark:border-surface-700 rounded-xl text-surface-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 gradient-bg text-white font-semibold rounded-xl disabled:opacity-60"
                >
                    {loading ? 'Signing in...' : 'Sign in'}
                </button>
                <p className="text-sm text-surface-500 dark:text-surface-400 text-center">
                    New user? <Link className="text-primary-600 dark:text-primary-400" to="/register">Create account</Link>
                </p>
            </motion.form>
        </div>
    );
}
