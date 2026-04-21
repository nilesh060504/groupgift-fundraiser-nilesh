export function CardSkeleton() {
    return (
        <div className="bg-white dark:bg-surface-800/50 rounded-2xl border border-surface-200 dark:border-surface-700/50 p-6">
            <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                    <div className="skeleton h-5 w-3/4 rounded-lg mb-2" />
                    <div className="skeleton h-4 w-full rounded-lg" />
                </div>
                <div className="skeleton h-6 w-16 rounded-lg ml-3" />
            </div>
            <div className="skeleton h-3 w-full rounded-full mb-4" />
            <div className="flex items-center gap-4">
                <div className="skeleton h-4 w-28 rounded-lg" />
                <div className="skeleton h-4 w-24 rounded-lg" />
            </div>
            <div className="mt-4 pt-4 border-t border-surface-100 dark:border-surface-700/50 flex items-center justify-between">
                <div className="skeleton h-6 w-24 rounded-lg" />
                <div className="skeleton h-4 w-20 rounded-lg" />
            </div>
        </div>
    );
}

export function DetailSkeleton() {
    return (
        <div className="space-y-6">
            <div className="bg-white dark:bg-surface-800/50 rounded-2xl border border-surface-200 dark:border-surface-700/50 p-8">
                <div className="skeleton h-8 w-2/3 rounded-lg mb-4" />
                <div className="skeleton h-4 w-full rounded-lg mb-2" />
                <div className="skeleton h-4 w-3/4 rounded-lg mb-6" />
                <div className="skeleton h-5 w-full rounded-full mb-6" />
                <div className="grid grid-cols-3 gap-4">
                    <div className="skeleton h-20 rounded-xl" />
                    <div className="skeleton h-20 rounded-xl" />
                    <div className="skeleton h-20 rounded-xl" />
                </div>
            </div>
        </div>
    );
}

export function ChartSkeleton() {
    return (
        <div className="bg-white dark:bg-surface-800/50 rounded-2xl border border-surface-200 dark:border-surface-700/50 p-6">
            <div className="skeleton h-6 w-40 rounded-lg mb-4" />
            <div className="skeleton h-64 w-full rounded-xl" />
        </div>
    );
}
