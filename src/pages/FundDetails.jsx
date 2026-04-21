import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';
import { QRCodeSVG } from 'qrcode.react';
import { useEffect, useState } from 'react';
import { HiOutlineClipboard, HiOutlineUserGroup, HiOutlineCurrencyDollar, HiOutlineClock, HiOutlineLink, HiOutlineArrowLeft } from 'react-icons/hi';
import { useFunds } from '../context/FundContext';
import { useAuth } from '../context/AuthContext';
import { sendGroupInvitesAPI } from '../services/api';
import ProgressBar from '../components/ProgressBar';
import ContributorList from '../components/ContributorList';
import { DetailSkeleton } from '../components/Skeleton';
import { formatCurrency, timeAgo, getDaysRemaining, copyToClipboard, generateShareLink, getStatusColor } from '../utils/helpers';

export default function FundDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getFundById, getContributionsForFund, getActivitiesForFund, loadFundDetails } = useFunds();
    const { user } = useAuth();
    const [showQR, setShowQR] = useState(false);
    const [sendingInvites, setSendingInvites] = useState(false);
    const [loading, setLoading] = useState(true);
    const fund = getFundById(id);
    const contribs = getContributionsForFund(id);
    const activities = getActivitiesForFund(id);

    useEffect(() => {
        loadFundDetails(id).finally(() => setLoading(false));
    }, [id, loadFundDetails]);

    useEffect(() => {
        if (fund && fund.status === 'completed') {
            setTimeout(() => confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } }), 500);
        }
    }, [fund]);

    if (loading && !fund) {
        return <div className="min-h-screen pt-24 pb-12 px-4"><div className="max-w-4xl mx-auto"><DetailSkeleton /></div></div>;
    }

    if (!fund) {
        return <div className="min-h-screen pt-24 pb-12 px-4"><div className="max-w-4xl mx-auto"><DetailSkeleton /></div></div>;
    }

    const remaining = Math.max(0, fund.target - fund.collected);
    const daysLeft = getDaysRemaining(fund.deadline);
    const shareLink = generateShareLink(fund.id);
    const qrValue = fund.upiLink || shareLink;
    const handleCopyLink = () => { copyToClipboard(shareLink); toast.success('Invite link copied!'); };
    const isOwner = user && fund && user.id === fund.createdBy;

    const handleSendGroupInvites = async () => {
        try {
            setSendingInvites(true);
            const res = await sendGroupInvitesAPI(fund.id);
            toast.success(`Sent payment links to ${res.data?.sentTo?.length || 0} members`);
            await loadFundDetails(fund.id);
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to send group invites');
        } finally {
            setSendingInvites(false);
        }
    };

    const stats = [
        { icon: <HiOutlineCurrencyDollar className="w-5 h-5" />, label: 'Raised', value: formatCurrency(fund.collected), color: 'text-primary-600 dark:text-primary-400' },
        { icon: <HiOutlineCurrencyDollar className="w-5 h-5" />, label: 'Remaining', value: formatCurrency(remaining), color: 'text-amber-600 dark:text-amber-400' },
        { icon: <HiOutlineUserGroup className="w-5 h-5" />, label: 'Contributors', value: fund.contributors, color: 'text-emerald-600 dark:text-emerald-400' },
        { icon: <HiOutlineClock className="w-5 h-5" />, label: 'Days Left', value: fund.status === 'completed' ? '✅' : daysLeft, color: 'text-accent-600 dark:text-accent-400' },
    ];

    return (
        <div className="min-h-screen pt-24 pb-12 px-4">
            <div className="max-w-4xl mx-auto">
                <motion.button initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-surface-500 hover:text-surface-700 dark:text-surface-400 dark:hover:text-surface-200 mb-6 transition-colors">
                    <HiOutlineArrowLeft className="w-4 h-4" /><span className="text-sm">Back to Dashboard</span>
                </motion.button>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-surface-800/50 rounded-2xl border border-surface-200 dark:border-surface-700/50 p-6 sm:p-8 shadow-sm mb-6">
                    <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-2xl sm:text-3xl font-bold text-surface-900 dark:text-white">{fund.title}</h1>
                        <span className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize ${getStatusColor(fund.status)}`}>{fund.status}</span>
                    </div>
                    <p className="text-surface-500 dark:text-surface-400 leading-relaxed mb-6">{fund.description}</p>

                    <div className="mb-8"><ProgressBar collected={fund.collected} target={fund.target} size="lg" /></div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                        {stats.map((s, i) => (
                            <div key={i} className="bg-surface-50 dark:bg-surface-900/50 rounded-xl p-4 text-center">
                                <div className={`w-10 h-10 mx-auto rounded-lg bg-white dark:bg-surface-800 flex items-center justify-center mb-2 ${s.color}`}>{s.icon}</div>
                                <p className="text-xs text-surface-400 mb-1">{s.label}</p>
                                <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <Link to={`/contribute/${fund.id}`} className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 gradient-bg text-white font-semibold rounded-xl shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-all">
                            <HiOutlineCurrencyDollar className="w-5 h-5" />Contribute Now
                        </Link>
                        <button onClick={handleCopyLink} className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300 font-semibold rounded-xl hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors">
                            <HiOutlineClipboard className="w-5 h-5" />Copy Invite Link
                        </button>
                        <button onClick={() => setShowQR(!showQR)} className="px-4 py-3 bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300 rounded-xl hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors">
                            <HiOutlineLink className="w-5 h-5" />
                        </button>
                    </div>

                    {fund.upiId && (
                        <p className="mt-4 text-sm text-surface-500 dark:text-surface-400">
                            UPI ID: <span className="font-medium text-surface-700 dark:text-surface-200">{fund.upiId}</span>
                        </p>
                    )}
                    {fund.members?.length > 0 && (
                        <div className="mt-4 text-sm text-surface-500 dark:text-surface-400">
                            <p className="font-medium text-surface-700 dark:text-surface-200 mb-1">Fund group members: {fund.members.length}</p>
                            <p>Selected contributors: {fund.selectedContributorEmails?.length || 0}</p>
                        </div>
                    )}
                    {isOwner && (
                        <button
                            onClick={handleSendGroupInvites}
                            disabled={sendingInvites}
                            className="mt-4 w-full sm:w-auto px-5 py-2.5 bg-primary-600 text-white rounded-xl font-semibold disabled:opacity-60"
                        >
                            {sendingInvites ? 'Sending payment links...' : 'Send Payment Links to Selected Members'}
                        </button>
                    )}

                    {showQR && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-6 flex flex-col items-center p-6 bg-surface-50 dark:bg-surface-900/50 rounded-xl">
                            <div className="bg-white p-4 rounded-xl shadow-sm mb-3"><QRCodeSVG value={qrValue} size={160} level="H" /></div>
                            <p className="text-sm text-surface-500">Scan to pay via UPI</p>
                        </motion.div>
                    )}
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white dark:bg-surface-800/50 rounded-2xl border border-surface-200 dark:border-surface-700/50 p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-surface-900 dark:text-white mb-4">Contributors ({contribs.length})</h2>
                        <div className="max-h-96 overflow-y-auto pr-1"><ContributorList contributions={contribs} /></div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white dark:bg-surface-800/50 rounded-2xl border border-surface-200 dark:border-surface-700/50 p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-surface-900 dark:text-white mb-4">Activity Timeline</h2>
                        <div className="max-h-96 overflow-y-auto pr-1 space-y-4">
                            {activities.length > 0 ? activities.map((a, i) => (
                                <div key={a.id} className="flex gap-3">
                                    <div className="flex flex-col items-center">
                                        <div className={`w-2.5 h-2.5 rounded-full mt-1.5 ${a.type === 'contribution' ? 'bg-primary-500' : a.type === 'milestone' ? 'bg-amber-500' : a.type === 'completed' ? 'bg-emerald-500' : 'bg-surface-400'}`} />
                                        {i < activities.length - 1 && <div className="w-px flex-1 bg-surface-200 dark:bg-surface-700 mt-1" />}
                                    </div>
                                    <div className="pb-4"><p className="text-sm text-surface-700 dark:text-surface-300">{a.message}</p><p className="text-xs text-surface-400 mt-1">{timeAgo(a.date)}</p></div>
                                </div>
                            )) : <p className="text-surface-400 text-center py-8">No activity yet</p>}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
