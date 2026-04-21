import { motion } from 'framer-motion';

export default function ProgressBar({ collected, target, size = 'md', showLabel = true, animated = true }) {
    const percentage = Math.min(Math.round((collected / target) * 100), 100);

    const heights = {
        sm: 'h-2',
        md: 'h-3',
        lg: 'h-4',
        xl: 'h-6',
    };

    return (
        <div className="w-full">
            {showLabel && (
                <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-surface-600 dark:text-surface-400">
                        {percentage}% funded
                    </span>
                    <span className="text-xs text-surface-400 dark:text-surface-500">
                        ${collected.toLocaleString()} / ${target.toLocaleString()}
                    </span>
                </div>
            )}
            <div className={`w-full ${heights[size]} bg-surface-200 dark:bg-surface-700 rounded-full overflow-hidden`}>
                <motion.div
                    className="h-full rounded-full gradient-bg relative overflow-hidden"
                    initial={animated ? { width: 0 } : { width: `${percentage}%` }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
                >
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-[shimmer_2s_infinite]"
                        style={{ backgroundSize: '200% 100%' }} />
                </motion.div>
            </div>
        </div>
    );
}
