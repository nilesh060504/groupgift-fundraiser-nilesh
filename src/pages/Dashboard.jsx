import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineSearch, HiOutlinePlusCircle, HiOutlineFilter } from 'react-icons/hi';
import { useFunds } from '../context/FundContext';
import FundCard from '../components/FundCard';
import { CardSkeleton } from '../components/Skeleton';
import EmptyState from '../components/EmptyState';
import { formatCurrency } from '../utils/helpers';

export default function Dashboard() {
    const { funds, loading } = useFunds();
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState('all');

    const filteredFunds = useMemo(() => {
        return funds.filter(fund => {
            const matchesSearch = fund.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                fund.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesFilter = filter === 'all' || fund.status === filter;
            return matchesSearch && matchesFilter;
        });
    }, [funds, searchQuery, filter]);

    const filters = [
        { value: 'all', label: 'All Funds' },
        { value: 'active', label: 'Active' },
        { value: 'completed', label: 'Completed' },
    ];

    return (
        <div className="min-h-screen pt-24 pb-12 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8"
                >
                    <div>
                        <h1 className="text-3xl font-bold text-surface-900 dark:text-white">
                            My Funds
                        </h1>
                        <p className="text-surface-500 dark:text-surface-400 mt-1">
                            Manage and track all your group gift funds
                        </p>
                    </div>
                    <Link
                        to="/create"
                        className="inline-flex items-center gap-2 px-5 py-2.5 gradient-bg text-white font-semibold rounded-xl shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-all duration-200"
                    >
                        <HiOutlinePlusCircle className="w-5 h-5" />
                        Create New Fund
                    </Link>
                </motion.div>

                {/* Search & Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex flex-col sm:flex-row gap-4 mb-8"
                >
                    {/* Search */}
                    <div className="relative flex-1">
                        <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-400" />
                        <input
                            type="text"
                            placeholder="Search funds..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-white dark:bg-surface-800/50 border border-surface-200 dark:border-surface-700 rounded-xl text-surface-900 dark:text-white placeholder-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all"
                        />
                    </div>

                    {/* Filter tabs */}
                    <div className="flex items-center gap-1 p-1 bg-surface-100 dark:bg-surface-800 rounded-xl">
                        {filters.map(f => (
                            <button
                                key={f.value}
                                onClick={() => setFilter(f.value)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${filter === f.value
                                        ? 'bg-white dark:bg-surface-700 text-surface-900 dark:text-white shadow-sm'
                                        : 'text-surface-500 dark:text-surface-400 hover:text-surface-700 dark:hover:text-surface-200'
                                    }`}
                            >
                                {f.label}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Stats bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8"
                >
                    {[
                        { label: 'Total Funds', value: funds.length, color: 'text-primary-600 dark:text-primary-400' },
                        { label: 'Active', value: funds.filter(f => f.status === 'active').length, color: 'text-emerald-600 dark:text-emerald-400' },
                        { label: 'Completed', value: funds.filter(f => f.status === 'completed').length, color: 'text-accent-600 dark:text-accent-400' },
                        { label: 'Total Raised', value: formatCurrency(funds.reduce((sum, f) => sum + f.collected, 0)), color: 'text-amber-600 dark:text-amber-400' },
                    ].map((stat, i) => (
                        <div key={i} className="bg-white dark:bg-surface-800/50 rounded-xl border border-surface-200 dark:border-surface-700/50 p-4">
                            <p className="text-xs text-surface-500 dark:text-surface-400 mb-1">{stat.label}</p>
                            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                        </div>
                    ))}
                </motion.div>

                {/* Funds Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => <CardSkeleton key={i} />)}
                    </div>
                ) : filteredFunds.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredFunds.map((fund, i) => (
                            <FundCard key={fund.id} fund={fund} index={i} />
                        ))}
                    </div>
                ) : (
                    <EmptyState
                        title={searchQuery ? 'No matching funds' : 'No funds yet'}
                        description={searchQuery ? 'Try adjusting your search query or filter.' : 'Create your first group gift fund and start collecting contributions.'}
                    />
                )}
            </div>
        </div>
    );
}
