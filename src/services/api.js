import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' },
});

const TOKEN_KEY = 'groupgift_token';

const setToken = (token) => {
    if (token) localStorage.setItem(TOKEN_KEY, token);
};

const getToken = () => localStorage.getItem(TOKEN_KEY);
const clearToken = () => localStorage.removeItem(TOKEN_KEY);

api.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

const mapFund = (fund) => ({
    id: fund._id,
    title: fund.title,
    description: fund.description,
    target: fund.targetAmount,
    expectedMembers: fund.expectedMembers || 1,
    groupName: fund.groupName || '',
    members: fund.invitedMembers || fund.members || [],
    selectedContributorEmails: fund.selectedContributorEmails || [],
    shareAmount: fund.shareAmount,
    collected: fund.currentAmount,
    contributors: fund.contributors || 0,
    deadline: fund.deadline,
    createdAt: fund.createdAt,
    status: fund.isCompleted ? 'completed' : 'active',
    creator: fund.createdBy?.name || 'Unknown',
    createdBy: fund.createdBy?._id || fund.createdBy || null,
    upiId: fund.upiId,
    upiLink: fund.upiLink,
    qrCode: fund.qrCode,
    phonePeLink: fund.phonePeLink,
    shareUpiLink: fund.shareUpiLink,
});

const mapContribution = (contribution) => {
    const name =
        contribution.contributorName ||
        contribution.userId?.name ||
        'Anonymous';
    return {
        id: contribution._id,
        fundId: contribution.fundId,
        name,
        amount: contribution.amount,
        date: contribution.createdAt,
        paymentStatus: contribution.paymentStatus,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=6366f1&color=fff`,
    };
};

const mapActivity = (activity) => ({
    id: activity._id,
    fundId: activity.fundId,
    type: 'activity',
    message: activity.message,
    date: activity.createdAt,
});

export const loginAPI = async ({ email, password }) => {
    const res = await api.post('/auth/login', { email, password });
    setToken(res.data.data.token);
    return res.data;
};

export const registerAPI = async ({ name, email, password }) => {
    const res = await api.post('/auth/register', { name, email, password });
    setToken(res.data.data.token);
    return res.data;
};

export const fetchMeAPI = async () => {
    const res = await api.get('/auth/me');
    return res.data;
};

export const logoutAPI = () => {
    clearToken();
};

export const fetchFunds = async (params = {}) => {
    const res = await api.get('/funds', { params });
    return {
        ...res.data,
        data: {
            ...res.data.data,
            items: res.data.data.items.map(mapFund),
        },
    };
};

export const fetchFundById = async (id) => {
    const res = await api.get(`/funds/${id}`);
    return {
        ...res.data,
        data: mapFund(res.data.data),
    };
};

export const createFundAPI = async (fundData) => {
    if (!getToken()) {
        throw new Error('Please login before creating a fund');
    }
    const payload = {
        title: fundData.title,
        description: fundData.description,
        groupName: fundData.groupName,
        members: fundData.members,
        selectedContributorEmails: fundData.selectedContributorEmails,
        targetAmount: fundData.target,
        expectedMembers: fundData.expectedMembers,
        deadline: fundData.deadline,
        upiId: fundData.upiId,
    };
    const res = await api.post('/funds', payload);
    return {
        ...res.data,
        data: mapFund(res.data.data),
    };
};

export const fetchContributionsForFund = async (fundId) => {
    const res = await api.get(`/funds/${fundId}/contributions`);
    return {
        ...res.data,
        data: res.data.data.map(mapContribution),
    };
};

export const fetchActivitiesForFund = async (fundId) => {
    const res = await api.get(`/funds/${fundId}/activities`);
    return {
        ...res.data,
        data: res.data.data.map(mapActivity),
    };
};

export const contributeAPI = async (fundId, data) => {
    const formData = new FormData();
    formData.append('fundId', fundId);
    formData.append('amount', data.amount);
    formData.append('transactionId', data.transactionId);
    formData.append('contributorName', data.contributorName);
    if (data.screenshotFile) formData.append('screenshot', data.screenshotFile);

    const res = await api.post('/contributions', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return {
        ...res.data,
        data: mapContribution(res.data.data),
    };
};

export const sendPaymentEmailAPI = async (fundId) => {
    const res = await api.post(`/funds/${fundId}/send-payment-email`);
    return res.data;
};

export const sendGroupInvitesAPI = async (fundId) => {
    const res = await api.post(`/funds/${fundId}/send-group-invites`);
    return res.data;
};

export default api;
