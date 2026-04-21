import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

export default function Register() {
    const { register } = useAuth();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!name || !email || !password) {
            toast.error('All fields are required');
            return;
        }
        try {
            setLoading(true);
            await register(name, email, password);
            toast.success('Account created');
            navigate('/dashboard', { replace: true });
        } catch (err) {
            toast.error(err.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 flex items-center justify-center">
            <form
                onSubmit={onSubmit}
                className="w-full max-w-md bg-white dark:bg-surface-800/50 rounded-2xl border border-surface-200 dark:border-surface-700/50 p-6 sm:p-8 shadow-sm space-y-5"
            >
                <div>
                    <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Create account</h1>
                    <p className="text-surface-500 dark:text-surface-400 mt-1">Register first to use all services.</p>
                </div>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full name"
                    className="w-full px-4 py-3 bg-surface-50 dark:bg-surface-900 border border-surface-200 dark:border-surface-700 rounded-xl text-surface-900 dark:text-white"
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full px-4 py-3 bg-surface-50 dark:bg-surface-900 border border-surface-200 dark:border-surface-700 rounded-xl text-surface-900 dark:text-white"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full px-4 py-3 bg-surface-50 dark:bg-surface-900 border border-surface-200 dark:border-surface-700 rounded-xl text-surface-900 dark:text-white"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 gradient-bg text-white font-semibold rounded-xl disabled:opacity-60"
                >
                    {loading ? 'Creating account...' : 'Register'}
                </button>
                <p className="text-sm text-surface-500 dark:text-surface-400 text-center">
                    Already registered? <Link className="text-primary-600 dark:text-primary-400" to="/login">Sign in</Link>
                </p>
            </form>
        </div>
    );
}
