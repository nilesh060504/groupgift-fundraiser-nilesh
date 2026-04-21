import { createContext, useContext, useState, useCallback, useEffect, useMemo } from 'react';
import {
    fetchFunds,
    fetchFundById,
    createFundAPI,
    contributeAPI,
    fetchContributionsForFund,
    fetchActivitiesForFund,
} from '../services/api';

const FundContext = createContext();

export function FundProvider({ children }) {
    const [funds, setFunds] = useState([]);
    const [fundDetails, setFundDetails] = useState({});
    const [contributionsByFund, setContributionsByFund] = useState({});
    const [activitiesByFund, setActivitiesByFund] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const loadFunds = useCallback(async (search = '') => {
        try {
            setLoading(true);
            const response = await fetchFunds({ page: 1, limit: 100, search });
            setFunds(response.data.items);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to load funds');
        } finally {
            setLoading(false);
        }
    }, []);

    const getFundById = useCallback((id) => {
        return fundDetails[id] || funds.find(f => f.id === id);
    }, [fundDetails, funds]);

    const getContributionsForFund = useCallback((fundId) => {
        return contributionsByFund[fundId] || [];
    }, [contributionsByFund]);

    const getActivitiesForFund = useCallback((fundId) => {
        return activitiesByFund[fundId] || [];
    }, [activitiesByFund]);

    const loadFundDetails = useCallback(async (fundId) => {
        try {
            const [fundRes, contribRes, activityRes] = await Promise.all([
                fetchFundById(fundId),
                fetchContributionsForFund(fundId),
                fetchActivitiesForFund(fundId),
            ]);

            setFundDetails(prev => ({ ...prev, [fundId]: fundRes.data }));
            setContributionsByFund(prev => ({ ...prev, [fundId]: contribRes.data }));
            setActivitiesByFund(prev => ({ ...prev, [fundId]: activityRes.data }));

            setFunds(prev => {
                const existing = prev.some(f => f.id === fundRes.data.id);
                if (!existing) return [fundRes.data, ...prev];
                return prev.map(f => (f.id === fundRes.data.id ? fundRes.data : f));
            });
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to load fund details');
            throw err;
        }
    }, []);

    const createFund = useCallback(async (fundData) => {
        const response = await createFundAPI(fundData);
        setFunds(prev => [response.data, ...prev]);
        setFundDetails(prev => ({ ...prev, [response.data.id]: response.data }));
        return response.data;
    }, []);

    const addContribution = useCallback(async (fundId, payload) => {
        const response = await contributeAPI(fundId, payload);
        setContributionsByFund(prev => ({
            ...prev,
            [fundId]: [response.data, ...(prev[fundId] || [])],
        }));
        await loadFundDetails(fundId);
        return response.data;
    }, [loadFundDetails]);

    useEffect(() => {
        loadFunds();
    }, [loadFunds]);

    // Flat list of all contributions across all funds (for Analytics)
    const allContributions = useMemo(() => {
        return Object.values(contributionsByFund).flat();
    }, [contributionsByFund]);

    const value = {
        funds,
        contributions: allContributions,
        loading,
        error,
        setLoading,
        loadFunds,
        loadFundDetails,
        getFundById,
        getContributionsForFund,
        getActivitiesForFund,
        createFund,
        addContribution,
    };

    return (
        <FundContext.Provider value={value}>
            {children}
        </FundContext.Provider>
    );
}

export const useFunds = () => useContext(FundContext);
