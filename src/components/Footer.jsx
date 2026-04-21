import { Link } from 'react-router-dom';
import { HiGift } from 'react-icons/hi2';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="bg-surface-50 dark:bg-surface-900 border-t border-surface-200 dark:border-surface-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <Link to="/" className="flex items-center gap-2 mb-4">
                            <div className="w-9 h-9 gradient-bg rounded-xl flex items-center justify-center">
                                <HiGift className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-lg font-bold gradient-text">GroupGift</span>
                        </Link>
                        <p className="text-sm text-surface-500 dark:text-surface-400 leading-relaxed">
                            Making group gifting effortless, transparent, and joyful. No more awkward conversations about money.
                        </p>
                    </div>

                    {/* Product */}
                    <div>
                        <h3 className="text-sm font-semibold text-surface-900 dark:text-white mb-4">Product</h3>
                        <ul className="space-y-2.5">
                            {['How it Works', 'Features', 'Pricing', 'FAQ'].map(item => (
                                <li key={item}>
                                    <a href="#" className="text-sm text-surface-500 dark:text-surface-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="text-sm font-semibold text-surface-900 dark:text-white mb-4">Company</h3>
                        <ul className="space-y-2.5">
                            {['About', 'Blog', 'Careers', 'Contact'].map(item => (
                                <li key={item}>
                                    <a href="#" className="text-sm text-surface-500 dark:text-surface-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="text-sm font-semibold text-surface-900 dark:text-white mb-4">Legal</h3>
                        <ul className="space-y-2.5">
                            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(item => (
                                <li key={item}>
                                    <a href="#" className="text-sm text-surface-500 dark:text-surface-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-10 pt-8 border-t border-surface-200 dark:border-surface-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-surface-500 dark:text-surface-400">
                        © 2026 GroupGift. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4">
                        <a href="#" className="text-surface-400 hover:text-surface-600 dark:hover:text-surface-300 transition-colors">
                            <FaTwitter className="w-5 h-5" />
                        </a>
                        <a href="#" className="text-surface-400 hover:text-surface-600 dark:hover:text-surface-300 transition-colors">
                            <FaGithub className="w-5 h-5" />
                        </a>
                        <a href="#" className="text-surface-400 hover:text-surface-600 dark:hover:text-surface-300 transition-colors">
                            <FaLinkedin className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
