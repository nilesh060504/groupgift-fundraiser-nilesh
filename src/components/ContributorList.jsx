import { formatCurrency, timeAgo } from '../utils/helpers';

export default function ContributorList({ contributions }) {
    if (!contributions || contributions.length === 0) {
        return (
            <div className="text-center py-8 text-surface-400 dark:text-surface-500">
                No contributions yet. Be the first to contribute!
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {contributions.map((contrib, index) => (
                <div
                    key={contrib.id}
                    className="flex items-center gap-3 p-3 rounded-xl bg-surface-50 dark:bg-surface-800/50 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
                >
                    <img
                        src={contrib.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(contrib.name || 'Anonymous')}&background=6366f1&color=fff`}
                        alt={contrib.name || 'Anonymous'}
                        className="w-10 h-10 rounded-full ring-2 ring-white dark:ring-surface-700 shadow-sm"
                    />
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-surface-900 dark:text-white truncate">{contrib.name || 'Anonymous'}</p>
                        <p className="text-xs text-surface-400 dark:text-surface-500">{timeAgo(contrib.date)}</p>
                    </div>
                    <span className="text-sm font-semibold text-primary-600 dark:text-primary-400">
                        {formatCurrency(contrib.amount)}
                    </span>
                </div>
            ))}
        </div>
    );
}
