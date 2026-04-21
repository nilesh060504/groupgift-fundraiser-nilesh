import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineUsers, HiOutlineClock } from 'react-icons/hi';
import ProgressBar from './ProgressBar';
import { formatCurrency, getDaysRemaining, getStatusColor } from '../utils/helpers';

export default function FundCard({ fund, index = 0 }) {
    const daysLeft = getDaysRemaining(fund.deadline);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="group"
        >
            <Link to={`/fund/${fund.id}`}>
                <div className="bg-white dark:bg-surface-800/50 rounded-2xl border border-surface-200 dark:border-surface-700/50 p-6 shadow-sm hover:shadow-xl hover:shadow-primary-500/5 transition-all duration-300">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-semibold text-surface-900 dark:text-white truncate group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                                {fund.title}
                            </h3>
                            <p className="text-sm text-surface-500 dark:text-surface-400 mt-1 line-clamp-2">
                                {fund.description}
                            </p>
                        </div>
                        <span className={`ml-3 px-2.5 py-1 rounded-lg text-xs font-semibold capitalize shrink-0 ${getStatusColor(fund.status)}`}>
                            {fund.status}
                        </span>
                    </div>

                    {/* Progress */}
                    <div className="mb-4">
                        <ProgressBar collected={fund.collected} target={fund.target} size="sm" />
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-4 text-sm text-surface-500 dark:text-surface-400">
                        <div className="flex items-center gap-1.5">
                            <HiOutlineUsers className="w-4 h-4" />
                            <span>{fund.contributors} contributor{fund.contributors !== 1 ? 's' : ''}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <HiOutlineClock className="w-4 h-4" />
                            <span>{fund.status === 'completed' ? 'Completed' : `${daysLeft} days left`}</span>
                        </div>
                    </div>

                    {/* Amount bar at bottom */}
                    <div className="mt-4 pt-4 border-t border-surface-100 dark:border-surface-700/50 flex items-center justify-between">
                        <div>
                            <span className="text-lg font-bold text-surface-900 dark:text-white">
                                {formatCurrency(fund.collected)}
                            </span>
                            <span className="text-sm text-surface-400 dark:text-surface-500"> raised</span>
                        </div>
                        <span className="text-sm text-surface-400 dark:text-surface-500">
                            Goal: {formatCurrency(fund.target)}
                        </span>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
