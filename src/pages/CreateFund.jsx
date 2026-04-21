import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { HiOutlineGift, HiOutlineCalendar, HiOutlineCurrencyDollar, HiOutlineDocumentText, HiOutlineClipboard, HiOutlineLink } from 'react-icons/hi';
import { useFunds } from '../context/FundContext';
import { copyToClipboard, generateShareLink } from '../utils/helpers';

export default function CreateFund() {
    const navigate = useNavigate();
    const { createFund } = useFunds();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        target: '',
        deadline: '',
    });

    const [errors, setErrors] = useState({});
    const [created, setCreated] = useState(null);

    const validate = () => {
        const newErrors = {};
        if (!formData.title.trim()) newErrors.title = 'Fund title is required';
        if (!formData.description.trim()) newErrors.description = 'Description is required';
        if (!formData.target || parseFloat(formData.target) <= 0) newErrors.target = 'Enter a valid target amount';
        if (!formData.deadline) newErrors.deadline = 'Deadline is required';
        else if (new Date(formData.deadline) <= new Date()) newErrors.deadline = 'Deadline must be in the future';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: null }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;

        const fund = createFund({
            ...formData,
            target: parseFloat(formData.target),
        });

        setCreated(fund);
        toast.success('Fund created successfully! 🎉');
    };

    const handleCopyLink = () => {
        const link = generateShareLink(created.id);
        copyToClipboard(link);
        toast.success('Link copied to clipboard!');
    };

    if (created) {
        return (
            <div className="min-h-screen pt-24 pb-12 px-4">
                <div className="max-w-lg mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white dark:bg-surface-800/50 rounded-2xl border border-surface-200 dark:border-surface-700/50 p-8 text-center shadow-xl"
                    >
                        <div className="w-16 h-16 gradient-bg rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary-500/25">
                            <HiOutlineGift className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-surface-900 dark:text-white mb-2">
                            Fund Created! 🎉
                        </h2>
                        <p className="text-surface-500 dark:text-surface-400 mb-6">
                            Share the link below with friends and family to start collecting contributions.
                        </p>

                        {/* Share link */}
                        <div className="flex items-center gap-2 p-3 bg-surface-50 dark:bg-surface-900 rounded-xl mb-6">
                            <HiOutlineLink className="w-5 h-5 text-surface-400 shrink-0" />
                            <span className="text-sm text-surface-600 dark:text-surface-300 truncate flex-1 text-left">
                                {generateShareLink(created.id)}
                            </span>
                            <button
                                onClick={handleCopyLink}
                                className="shrink-0 px-3 py-1.5 bg-primary-500 text-white text-sm font-medium rounded-lg hover:bg-primary-600 transition-colors"
                            >
                                <HiOutlineClipboard className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                            <button
                                onClick={() => navigate(`/fund/${created.id}`)}
                                className="flex-1 px-5 py-3 gradient-bg text-white font-semibold rounded-xl shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-all"
                            >
                                View Fund
                            </button>
                            <button
                                onClick={() => {
                                    setCreated(null);
                                    setFormData({ title: '', description: '', target: '', deadline: '' });
                                }}
                                className="flex-1 px-5 py-3 bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300 font-semibold rounded-xl hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors"
                            >
                                Create Another
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-12 px-4">
            <div className="max-w-2xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-3xl font-bold text-surface-900 dark:text-white">
                        Create a New Fund
                    </h1>
                    <p className="text-surface-500 dark:text-surface-400 mt-2">
                        Set up a gift fund and share it with contributors.
                    </p>
                </motion.div>

                <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    onSubmit={handleSubmit}
                    className="bg-white dark:bg-surface-800/50 rounded-2xl border border-surface-200 dark:border-surface-700/50 p-6 sm:p-8 shadow-sm space-y-6"
                >
                    {/* Title */}
                    <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                            <HiOutlineGift className="w-4 h-4" />
                            Gift Title
                        </label>
                        <input
                            type="text"
                            placeholder="e.g., Sarah's Birthday Surprise"
                            value={formData.title}
                            onChange={(e) => handleChange('title', e.target.value)}
                            className={`w-full px-4 py-3 bg-surface-50 dark:bg-surface-900 border rounded-xl text-surface-900 dark:text-white placeholder-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all ${errors.title ? 'border-red-400 dark:border-red-500' : 'border-surface-200 dark:border-surface-700 focus:border-primary-500'
                                }`}
                        />
                        {errors.title && (
                            <p className="text-red-500 text-sm mt-1.5">{errors.title}</p>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                            <HiOutlineDocumentText className="w-4 h-4" />
                            Description
                        </label>
                        <textarea
                            placeholder="Tell people what this gift fund is for..."
                            rows={4}
                            value={formData.description}
                            onChange={(e) => handleChange('description', e.target.value)}
                            className={`w-full px-4 py-3 bg-surface-50 dark:bg-surface-900 border rounded-xl text-surface-900 dark:text-white placeholder-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all resize-none ${errors.description ? 'border-red-400 dark:border-red-500' : 'border-surface-200 dark:border-surface-700 focus:border-primary-500'
                                }`}
                        />
                        {errors.description && (
                            <p className="text-red-500 text-sm mt-1.5">{errors.description}</p>
                        )}
                    </div>

                    {/* Target & Deadline */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="flex items-center gap-2 text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                                <HiOutlineCurrencyDollar className="w-4 h-4" />
                                Target Amount ($)
                            </label>
                            <input
                                type="number"
                                placeholder="500"
                                min="1"
                                step="0.01"
                                value={formData.target}
                                onChange={(e) => handleChange('target', e.target.value)}
                                className={`w-full px-4 py-3 bg-surface-50 dark:bg-surface-900 border rounded-xl text-surface-900 dark:text-white placeholder-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all ${errors.target ? 'border-red-400 dark:border-red-500' : 'border-surface-200 dark:border-surface-700 focus:border-primary-500'
                                    }`}
                            />
                            {errors.target && (
                                <p className="text-red-500 text-sm mt-1.5">{errors.target}</p>
                            )}
                        </div>

                        <div>
                            <label className="flex items-center gap-2 text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                                <HiOutlineCalendar className="w-4 h-4" />
                                Deadline
                            </label>
                            <input
                                type="date"
                                value={formData.deadline}
                                onChange={(e) => handleChange('deadline', e.target.value)}
                                className={`w-full px-4 py-3 bg-surface-50 dark:bg-surface-900 border rounded-xl text-surface-900 dark:text-white placeholder-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all ${errors.deadline ? 'border-red-400 dark:border-red-500' : 'border-surface-200 dark:border-surface-700 focus:border-primary-500'
                                    }`}
                            />
                            {errors.deadline && (
                                <p className="text-red-500 text-sm mt-1.5">{errors.deadline}</p>
                            )}
                        </div>
                    </div>

                    {/* Submit */}
                    <motion.button
                        type="submit"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className="w-full py-4 gradient-bg text-white font-semibold rounded-xl shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-all duration-200 text-lg"
                    >
                        Create Gift Fund
                    </motion.button>
                </motion.form>
            </div>
        </div>
    );
}
