import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';
import { HiOutlineCurrencyDollar, HiOutlineUser, HiOutlineCreditCard, HiOutlineArrowLeft, HiOutlineCheck } from 'react-icons/hi';
import { useFunds } from '../context/FundContext';
import { formatCurrency, calculateProgress } from '../utils/helpers';

export default function Contribute() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getFundById, addContribution } = useFunds();

    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [processing, setProcessing] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errors, setErrors] = useState({});

    const fund = getFundById(id);

    if (!fund) {
        return (
            <div className="min-h-screen pt-24 pb-12 px-4 flex items-center justify-center">
                <p className="text-surface-500">Fund not found</p>
            </div>
        );
    }

    const remaining = Math.max(0, fund.target - fund.collected);
    const progress = calculateProgress(fund.collected, fund.target);

    const presetAmounts = [10, 25, 50, 100];

    const validate = () => {
        const newErrors = {};
        if (!name.trim()) newErrors.name = 'Name is required';
        if (!amount || parseFloat(amount) <= 0) newErrors.amount = 'Enter a valid amount';
        if (parseFloat(amount) > remaining) newErrors.amount = `Maximum contribution is ${formatCurrency(remaining)}`;
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setProcessing(true);
        // Simulate payment processing
        await new Promise(resolve => setTimeout(resolve, 1500));

        addContribution(id, amount, name);
        setProcessing(false);
        setSuccess(true);

        toast.success('Contribution successful! 🎉');
        confetti({ particleCount: 80, spread: 60, origin: { y: 0.7 } });
    };

    const paymentMethods = [
        { id: 'card', label: 'Credit Card', icon: '💳' },
        { id: 'paypal', label: 'PayPal', icon: '🅿️' },
        { id: 'applepay', label: 'Apple Pay', icon: '🍎' },
    ];

    if (success) {
        return (
            <div className="min-h-screen pt-24 pb-12 px-4 flex items-center justify-center">
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', damping: 15 }} className="max-w-md w-full bg-white dark:bg-surface-800/50 rounded-2xl border border-surface-200 dark:border-surface-700/50 p-8 text-center shadow-xl">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring' }} className="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                        <HiOutlineCheck className="w-10 h-10 text-emerald-500" />
                    </motion.div>
                    <h2 className="text-2xl font-bold text-surface-900 dark:text-white mb-2">Thank You! 🎉</h2>
                    <p className="text-surface-500 dark:text-surface-400 mb-2">Your contribution of <span className="font-semibold text-primary-600 dark:text-primary-400">{formatCurrency(parseFloat(amount))}</span> has been received.</p>
                    <p className="text-sm text-surface-400 dark:text-surface-500 mb-8">The gift fund "{fund.title}" is now {calculateProgress(fund.collected, fund.target)}% funded!</p>
                    <div className="flex flex-col gap-3">
                        <button onClick={() => navigate(`/fund/${fund.id}`)} className="w-full py-3 gradient-bg text-white font-semibold rounded-xl shadow-lg shadow-primary-500/25">View Fund</button>
                        <button onClick={() => navigate('/dashboard')} className="w-full py-3 bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300 font-semibold rounded-xl">Go to Dashboard</button>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-12 px-4">
            <div className="max-w-lg mx-auto">
                <motion.button initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} onClick={() => navigate(`/fund/${id}`)} className="flex items-center gap-2 text-surface-500 hover:text-surface-700 dark:text-surface-400 dark:hover:text-surface-200 mb-6 transition-colors">
                    <HiOutlineArrowLeft className="w-4 h-4" /><span className="text-sm">Back to Fund</span>
                </motion.button>

                {/* Fund summary */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-surface-800/50 rounded-2xl border border-surface-200 dark:border-surface-700/50 p-6 mb-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-surface-900 dark:text-white mb-1">{fund.title}</h2>
                    <p className="text-sm text-surface-500 dark:text-surface-400 mb-4">{formatCurrency(fund.collected)} raised of {formatCurrency(fund.target)} goal</p>
                    <div className="w-full h-3 bg-surface-200 dark:bg-surface-700 rounded-full overflow-hidden">
                        <div className="h-full rounded-full gradient-bg transition-all duration-500" style={{ width: `${progress}%` }} />
                    </div>
                    <p className="text-sm text-surface-400 mt-2">{formatCurrency(remaining)} remaining</p>
                </motion.div>

                {/* Contribution form */}
                <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} onSubmit={handleSubmit} className="bg-white dark:bg-surface-800/50 rounded-2xl border border-surface-200 dark:border-surface-700/50 p-6 sm:p-8 shadow-sm space-y-6">
                    <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-surface-700 dark:text-surface-300 mb-2"><HiOutlineUser className="w-4 h-4" />Your Name</label>
                        <input type="text" placeholder="John Doe" value={name} onChange={(e) => { setName(e.target.value); setErrors(p => ({ ...p, name: null })); }} className={`w-full px-4 py-3 bg-surface-50 dark:bg-surface-900 border rounded-xl text-surface-900 dark:text-white placeholder-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all ${errors.name ? 'border-red-400' : 'border-surface-200 dark:border-surface-700'}`} />
                        {errors.name && <p className="text-red-500 text-sm mt-1.5">{errors.name}</p>}
                    </div>

                    <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-surface-700 dark:text-surface-300 mb-2"><HiOutlineCurrencyDollar className="w-4 h-4" />Amount</label>
                        <div className="flex gap-2 mb-3">
                            {presetAmounts.map(pa => (
                                <button key={pa} type="button" onClick={() => { setAmount(String(pa)); setErrors(p => ({ ...p, amount: null })); }} className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${String(pa) === amount ? 'gradient-bg text-white shadow-md' : 'bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400 hover:bg-surface-200 dark:hover:bg-surface-700'}`}>${pa}</button>
                            ))}
                        </div>
                        <input type="number" placeholder="Custom amount" min="1" step="0.01" value={amount} onChange={(e) => { setAmount(e.target.value); setErrors(p => ({ ...p, amount: null })); }} className={`w-full px-4 py-3 bg-surface-50 dark:bg-surface-900 border rounded-xl text-surface-900 dark:text-white placeholder-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all ${errors.amount ? 'border-red-400' : 'border-surface-200 dark:border-surface-700'}`} />
                        {errors.amount && <p className="text-red-500 text-sm mt-1.5">{errors.amount}</p>}
                    </div>

                    <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-surface-700 dark:text-surface-300 mb-2"><HiOutlineCreditCard className="w-4 h-4" />Payment Method</label>
                        <div className="grid grid-cols-3 gap-2">
                            {paymentMethods.map(pm => (
                                <button key={pm.id} type="button" onClick={() => setPaymentMethod(pm.id)} className={`p-3 rounded-xl text-center transition-all ${paymentMethod === pm.id ? 'bg-primary-50 dark:bg-primary-900/20 border-2 border-primary-500' : 'bg-surface-50 dark:bg-surface-900 border border-surface-200 dark:border-surface-700 hover:border-primary-300'}`}>
                                    <span className="text-xl block mb-1">{pm.icon}</span>
                                    <span className="text-xs text-surface-600 dark:text-surface-400">{pm.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <motion.button type="submit" disabled={processing} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} className="w-full py-4 gradient-bg text-white font-semibold rounded-xl shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-all duration-200 text-lg disabled:opacity-50">
                        {processing ? (
                            <span className="flex items-center justify-center gap-2"><svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Processing...</span>
                        ) : `Contribute ${amount ? formatCurrency(parseFloat(amount)) : ''}`}
                    </motion.button>
                </motion.form>
            </div>
        </div>
    );
}
