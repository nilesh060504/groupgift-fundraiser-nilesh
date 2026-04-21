import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { HiOutlineChartPie, HiOutlineChartBar, HiOutlineUserGroup, HiOutlineTrendingUp, HiOutlineCurrencyDollar } from 'react-icons/hi';
import { useFunds } from '../context/FundContext';
import { formatCurrency } from '../utils/helpers';

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#14b8a6', '#f59e0b', '#ef4444', '#22c55e', '#6366f1'];

export default function Analytics() {
    const { funds, contributions } = useFunds();

    const stats = useMemo(() => {
        const totalRaised = funds.reduce((s, f) => s + f.collected, 0);
        const totalTarget = funds.reduce((s, f) => s + f.target, 0);
        const totalContributors = contributions.length;
        const avgContribution = totalContributors > 0 ? totalRaised / totalContributors : 0;
        return { totalRaised, totalTarget, totalContributors, avgContribution };
    }, [funds, contributions]);

    const pieData = useMemo(() => {
        return funds.map(f => ({ name: f.title.length > 20 ? f.title.substring(0, 20) + '...' : f.title, value: f.collected }));
    }, [funds]);

    const barData = useMemo(() => {
        const months = {};
        contributions.forEach(c => {
            const d = new Date(c.date);
            const key = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            months[key] = (months[key] || 0) + c.amount;
        });
        return Object.entries(months).map(([date, amount]) => ({ date, amount })).slice(-10);
    }, [contributions]);

    const statCards = [
        { icon: <HiOutlineCurrencyDollar className="w-6 h-6" />, label: 'Total Raised', value: formatCurrency(stats.totalRaised), color: 'from-blue-500 to-cyan-500', textColor: 'text-blue-600 dark:text-blue-400' },
        { icon: <HiOutlineTrendingUp className="w-6 h-6" />, label: 'Target Goal', value: formatCurrency(stats.totalTarget), color: 'from-purple-500 to-pink-500', textColor: 'text-purple-600 dark:text-purple-400' },
        { icon: <HiOutlineUserGroup className="w-6 h-6" />, label: 'Total Contributions', value: stats.totalContributors, color: 'from-emerald-500 to-teal-500', textColor: 'text-emerald-600 dark:text-emerald-400' },
        { icon: <HiOutlineChartBar className="w-6 h-6" />, label: 'Avg Contribution', value: formatCurrency(stats.avgContribution), color: 'from-amber-500 to-orange-500', textColor: 'text-amber-600 dark:text-amber-400' },
    ];

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white dark:bg-surface-800 rounded-xl px-4 py-3 shadow-xl border border-surface-200 dark:border-surface-700">
                    <p className="text-sm font-medium text-surface-900 dark:text-white">{label || payload[0].name}</p>
                    <p className="text-sm text-primary-600 dark:text-primary-400 font-semibold">{formatCurrency(payload[0].value)}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="min-h-screen pt-24 pb-12 px-4">
            <div className="max-w-7xl mx-auto">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                    <h1 className="text-3xl font-bold text-surface-900 dark:text-white">Analytics</h1>
                    <p className="text-surface-500 dark:text-surface-400 mt-1">Track contributions and fund performance</p>
                </motion.div>

                {/* Stats */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {statCards.map((s, i) => (
                        <div key={i} className="bg-white dark:bg-surface-800/50 rounded-2xl border border-surface-200 dark:border-surface-700/50 p-6 shadow-sm">
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center text-white mb-4 shadow-lg`}>{s.icon}</div>
                            <p className="text-sm text-surface-500 dark:text-surface-400 mb-1">{s.label}</p>
                            <p className={`text-2xl font-bold ${s.textColor}`}>{s.value}</p>
                        </div>
                    ))}
                </motion.div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white dark:bg-surface-800/50 rounded-2xl border border-surface-200 dark:border-surface-700/50 p-6 shadow-sm">
                        <div className="flex items-center gap-2 mb-6">
                            <HiOutlineChartPie className="w-5 h-5 text-primary-500" />
                            <h2 className="text-lg font-semibold text-surface-900 dark:text-white">Contribution Distribution</h2>
                        </div>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={110} paddingAngle={4} dataKey="value" stroke="none">
                                    {pieData.map((_, i) => (<Cell key={i} fill={COLORS[i % COLORS.length]} />))}
                                </Pie>
                                <Tooltip content={<CustomTooltip />} />
                                <Legend wrapperStyle={{ fontSize: '12px' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white dark:bg-surface-800/50 rounded-2xl border border-surface-200 dark:border-surface-700/50 p-6 shadow-sm">
                        <div className="flex items-center gap-2 mb-6">
                            <HiOutlineChartBar className="w-5 h-5 text-accent-500" />
                            <h2 className="text-lg font-semibold text-surface-900 dark:text-white">Contributions Over Time</h2>
                        </div>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={barData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#94a3b8" />
                                <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" tickFormatter={(v) => `$${v}`} />
                                <Tooltip content={<CustomTooltip />} />
                                <Bar dataKey="amount" fill="url(#barGradient)" radius={[6, 6, 0, 0]} />
                                <defs>
                                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#3b82f6" />
                                        <stop offset="100%" stopColor="#8b5cf6" />
                                    </linearGradient>
                                </defs>
                            </BarChart>
                        </ResponsiveContainer>
                    </motion.div>
                </div>

                {/* Fund-level stats */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mt-6 bg-white dark:bg-surface-800/50 rounded-2xl border border-surface-200 dark:border-surface-700/50 p-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-surface-900 dark:text-white mb-4">Fund Performance</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-surface-200 dark:border-surface-700">
                                    <th className="text-left py-3 px-4 text-surface-500 dark:text-surface-400 font-medium">Fund</th>
                                    <th className="text-right py-3 px-4 text-surface-500 dark:text-surface-400 font-medium">Target</th>
                                    <th className="text-right py-3 px-4 text-surface-500 dark:text-surface-400 font-medium">Raised</th>
                                    <th className="text-right py-3 px-4 text-surface-500 dark:text-surface-400 font-medium">Progress</th>
                                    <th className="text-right py-3 px-4 text-surface-500 dark:text-surface-400 font-medium">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {funds.map(f => {
                                    const pct = Math.min(Math.round((f.collected / f.target) * 100), 100);
                                    return (
                                        <tr key={f.id} className="border-b border-surface-100 dark:border-surface-800 hover:bg-surface-50 dark:hover:bg-surface-800/50">
                                            <td className="py-3 px-4 font-medium text-surface-900 dark:text-white">{f.title}</td>
                                            <td className="py-3 px-4 text-right text-surface-600 dark:text-surface-300">{formatCurrency(f.target)}</td>
                                            <td className="py-3 px-4 text-right text-surface-600 dark:text-surface-300">{formatCurrency(f.collected)}</td>
                                            <td className="py-3 px-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <div className="w-16 h-2 bg-surface-200 dark:bg-surface-700 rounded-full overflow-hidden">
                                                        <div className="h-full rounded-full gradient-bg" style={{ width: `${pct}%` }} />
                                                    </div>
                                                    <span className="text-surface-600 dark:text-surface-300 w-10 text-right">{pct}%</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4 text-right"><span className={`px-2 py-1 rounded-md text-xs font-semibold capitalize ${f.status === 'completed' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400'}`}>{f.status}</span></td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
