import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineSparkles, HiOutlineEye, HiOutlineChartBar, HiOutlineHeart, HiOutlineArrowRight } from 'react-icons/hi';
import { HiGift } from 'react-icons/hi2';
import Footer from '../components/Footer';

const fadeUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
};

const stagger = {
    animate: { transition: { staggerChildren: 0.1 } },
};

const features = [
    {
        icon: <HiOutlineEye className="w-6 h-6" />,
        title: 'Full Transparency',
        description: 'Everyone sees who contributed and how much. No hidden fees, no surprises.',
        color: 'from-blue-500 to-cyan-500',
    },
    {
        icon: <HiOutlineChartBar className="w-6 h-6" />,
        title: 'Easy Tracking',
        description: 'Real-time progress bars, analytics, and activity timelines keep everyone in the loop.',
        color: 'from-purple-500 to-pink-500',
    },
    {
        icon: <HiOutlineHeart className="w-6 h-6" />,
        title: 'No Awkwardness',
        description: 'No more chasing people for money. Share a link and let them contribute at their pace.',
        color: 'from-orange-500 to-red-500',
    },
    {
        icon: <HiOutlineSparkles className="w-6 h-6" />,
        title: 'Beautiful Experience',
        description: 'A delightful gifting experience with animations, confetti, and celebration moments.',
        color: 'from-emerald-500 to-teal-500',
    },
];

const steps = [
    { number: '01', title: 'Create a Fund', description: 'Set up a gift fund with a title, description, and target amount in seconds.' },
    { number: '02', title: 'Share the Link', description: 'Send the unique link or QR code to friends, family, or teammates.' },
    { number: '03', title: 'Collect & Celebrate', description: 'Watch contributions roll in and celebrate when the goal is reached!' },
];

const testimonials = [
    {
        name: 'Sarah Mitchell',
        role: 'Marketing Manager',
        avatar: 'https://ui-avatars.com/api/?name=Sarah+Mitchell&background=6366f1&color=fff&size=80',
        text: "GroupGift made organizing our boss's farewell gift so easy! No awkward conversations, just a link and everyone contributed happily.",
    },
    {
        name: 'David Park',
        role: 'Software Engineer',
        avatar: 'https://ui-avatars.com/api/?name=David+Park&background=8b5cf6&color=fff&size=80',
        text: 'The transparency and progress tracking are fantastic. Our team uses it for every birthday now. The analytics are a nice bonus!',
    },
    {
        name: 'Emma Rodriguez',
        role: 'Teacher',
        avatar: 'https://ui-avatars.com/api/?name=Emma+Rodriguez&background=ec4899&color=fff&size=80',
        text: "As a parent coordinator, this tool has been a game-changer for teacher appreciation gifts. Clean, simple, and beautiful!",
    },
];

export default function LandingPage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-4 overflow-hidden">
                {/* Background decorations */}
                <div className="absolute inset-0 -z-10">
                    <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl" />
                    <div className="absolute top-40 right-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-1/2 w-80 h-80 bg-pink-500/5 rounded-full blur-3xl" />
                </div>

                <div className="max-w-7xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 text-primary-700 dark:text-primary-300 text-sm font-medium mb-8"
                    >
                        <HiOutlineSparkles className="w-4 h-4" />
                        The smart way to organize group gifts
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6"
                    >
                        <span className="text-surface-900 dark:text-white">Make Group Gifting</span>
                        <br />
                        <span className="gradient-text">Effortless</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-lg sm:text-xl text-surface-500 dark:text-surface-400 max-w-2xl mx-auto mb-10 leading-relaxed"
                    >
                        Create a fund, share the link, and let everyone contribute transparently.
                        No more awkward conversations about money — just pure gifting joy.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Link
                            to="/create"
                            className="inline-flex items-center gap-2 px-8 py-4 gradient-bg text-white font-semibold rounded-2xl shadow-xl shadow-primary-500/25 hover:shadow-primary-500/40 hover:scale-105 transition-all duration-200 text-lg"
                        >
                            <HiGift className="w-5 h-5" />
                            Create Fund
                        </Link>
                        <Link
                            to="/dashboard"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-white dark:bg-surface-800 text-surface-700 dark:text-surface-300 font-semibold rounded-2xl border border-surface-200 dark:border-surface-700 hover:border-primary-300 dark:hover:border-primary-700 hover:scale-105 transition-all duration-200 text-lg shadow-sm"
                        >
                            Join Fund
                            <HiOutlineArrowRight className="w-5 h-5" />
                        </Link>
                    </motion.div>

                    {/* Animated preview cards */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="mt-20 max-w-4xl mx-auto"
                    >
                        <div className="relative">
                            <div className="absolute inset-0 gradient-bg rounded-3xl blur-2xl opacity-20" />
                            <div className="relative glass rounded-3xl p-4 sm:p-8 shadow-2xl">
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    {[
                                        { label: "Sarah's Birthday", amount: '₹1,125', target: '₹1,500', pct: 75 },
                                        { label: "Team Farewell", amount: '₹500', target: '₹500', pct: 100 },
                                        { label: "Wedding Gift", amount: '₹780', target: '₹2,000', pct: 39 },
                                    ].map((card, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.7 + i * 0.15 }}
                                            className="bg-white/80 dark:bg-surface-800/80 rounded-2xl p-4 border border-surface-100 dark:border-surface-700/50"
                                        >
                                            <p className="text-sm font-medium text-surface-900 dark:text-white mb-1">{card.label}</p>
                                            <p className="text-xs text-surface-400 dark:text-surface-500 mb-3">{card.amount} of {card.target}</p>
                                            <div className="w-full h-2 bg-surface-200 dark:bg-surface-700 rounded-full overflow-hidden">
                                                <motion.div
                                                    className="h-full rounded-full gradient-bg"
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${card.pct}%` }}
                                                    transition={{ duration: 1.5, delay: 1 + i * 0.2 }}
                                                />
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-20 px-4 bg-surface-50/50 dark:bg-surface-900/50">
                <div className="max-w-7xl mx-auto">
                    <motion.div {...fadeUp} className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-surface-900 dark:text-white mb-4">
                            How It Works
                        </h2>
                        <p className="text-surface-500 dark:text-surface-400 max-w-xl mx-auto">
                            Get started in three simple steps. It's that easy.
                        </p>
                    </motion.div>

                    <motion.div variants={stagger} initial="initial" whileInView="animate" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {steps.map((step, i) => (
                            <motion.div
                                key={i}
                                variants={fadeUp}
                                className="relative text-center p-8"
                            >
                                <div className="text-6xl font-extrabold text-primary-500/10 dark:text-primary-400/10 mb-4">
                                    {step.number}
                                </div>
                                <h3 className="text-xl font-semibold text-surface-900 dark:text-white mb-3">
                                    {step.title}
                                </h3>
                                <p className="text-surface-500 dark:text-surface-400 leading-relaxed">
                                    {step.description}
                                </p>
                                {i < steps.length - 1 && (
                                    <div className="hidden md:block absolute top-1/3 -right-4 w-8 text-surface-300 dark:text-surface-600">
                                        <HiOutlineArrowRight className="w-6 h-6" />
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Features */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <motion.div {...fadeUp} className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-surface-900 dark:text-white mb-4">
                            Why Choose <span className="gradient-text">GroupGift</span>?
                        </h2>
                        <p className="text-surface-500 dark:text-surface-400 max-w-xl mx-auto">
                            Everything you need to make group gifting a breeze.
                        </p>
                    </motion.div>

                    <motion.div variants={stagger} initial="initial" whileInView="animate" viewport={{ once: true }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, i) => (
                            <motion.div
                                key={i}
                                variants={fadeUp}
                                whileHover={{ y: -4 }}
                                className="bg-white dark:bg-surface-800/50 rounded-2xl p-6 border border-surface-200 dark:border-surface-700/50 hover:shadow-xl hover:shadow-primary-500/5 transition-all duration-300"
                            >
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-4 shadow-lg`}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-sm text-surface-500 dark:text-surface-400 leading-relaxed">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 px-4 bg-surface-50/50 dark:bg-surface-900/50">
                <div className="max-w-7xl mx-auto">
                    <motion.div {...fadeUp} className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-surface-900 dark:text-white mb-4">
                            Loved by Teams & Families
                        </h2>
                        <p className="text-surface-500 dark:text-surface-400 max-w-xl mx-auto">
                            See what our users have to say about their experience.
                        </p>
                    </motion.div>

                    <motion.div variants={stagger} initial="initial" whileInView="animate" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {testimonials.map((t, i) => (
                            <motion.div
                                key={i}
                                variants={fadeUp}
                                className="bg-white dark:bg-surface-800/50 rounded-2xl p-6 border border-surface-200 dark:border-surface-700/50"
                            >
                                <div className="flex items-center gap-1 mb-4">
                                    {[...Array(5)].map((_, s) => (
                                        <svg key={s} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <p className="text-surface-600 dark:text-surface-300 leading-relaxed mb-4 text-sm">
                                    "{t.text}"
                                </p>
                                <div className="flex items-center gap-3">
                                    <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full" />
                                    <div>
                                        <p className="text-sm font-semibold text-surface-900 dark:text-white">{t.name}</p>
                                        <p className="text-xs text-surface-400 dark:text-surface-500">{t.role}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="gradient-bg rounded-3xl p-12 sm:p-16 shadow-2xl shadow-primary-500/20 relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iYSIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIxIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjYSkiLz48L3N2Zz4=')] opacity-50" />
                        <div className="relative">
                            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                                Ready to Start Your Group Gift?
                            </h2>
                            <p className="text-white/80 text-lg max-w-xl mx-auto mb-8">
                                Create a fund in seconds and make someone's day special. It's free, fast, and fun!
                            </p>
                            <Link
                                to="/create"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-700 font-bold rounded-2xl hover:bg-white/90 hover:scale-105 transition-all duration-200 text-lg shadow-xl"
                            >
                                <HiGift className="w-5 h-5" />
                                Get Started Free
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
