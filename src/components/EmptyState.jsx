import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiOutlinePlusCircle } from 'react-icons/hi';

export default function EmptyState({
    title = "No funds yet",
    description = "Create your first group gift fund and start collecting contributions.",
    actionLabel = "Create Fund",
    actionPath = "/create",
    icon = null
}) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center justify-center py-16 px-4"
        >
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/30 dark:to-accent-900/30 flex items-center justify-center mb-6">
                {icon || (
                    <svg className="w-10 h-10 text-primary-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                    </svg>
                )}
            </div>
            <h3 className="text-xl font-semibold text-surface-900 dark:text-white mb-2">{title}</h3>
            <p className="text-surface-500 dark:text-surface-400 text-center max-w-md mb-8">{description}</p>
            <Link
                to={actionPath}
                className="inline-flex items-center gap-2 px-6 py-3 gradient-bg text-white font-semibold rounded-xl shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-all duration-200"
            >
                <HiOutlinePlusCircle className="w-5 h-5" />
                {actionLabel}
            </Link>
        </motion.div>
    );
}
