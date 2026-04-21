import { createContext, useContext, useState, useCallback } from 'react';
import { mockFunds, mockContributions, mockActivities } from '../services/api';

const FundContext = createContext();

export function FundProvider({ children }) {
    const [funds, setFunds] = useState(mockFunds);
    const [contributions, setContributions] = useState(mockContributions);
    const [activities, setActivities] = useState(mockActivities);
    const [loading, setLoading] = useState(false);

    const getFundById = useCallback((id) => {
        return funds.find(f => f.id === id);
    }, [funds]);

    const getContributionsForFund = useCallback((fundId) => {
        return contributions.filter(c => c.fundId === fundId);
    }, [contributions]);

    const getActivitiesForFund = useCallback((fundId) => {
        return activities.filter(a => a.fundId === fundId);
    }, [activities]);

    const createFund = useCallback((fundData) => {
        const newFund = {
            id: `fund_${Date.now()}`,
            ...fundData,
            collected: 0,
            contributors: 0,
            createdAt: new Date().toISOString(),
            status: 'active',
        };
        setFunds(prev => [newFund, ...prev]);
        return newFund;
    }, []);

    const addContribution = useCallback((fundId, amount, contributorName) => {
        const contribution = {
            id: `contrib_${Date.now()}`,
            fundId,
            name: contributorName,
            amount: parseFloat(amount),
            date: new Date().toISOString(),
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(contributorName)}&background=6366f1&color=fff`,
        };

        setContributions(prev => [contribution, ...prev]);

        const activity = {
            id: `act_${Date.now()}`,
            fundId,
            type: 'contribution',
            message: `${contributorName} contributed $${parseFloat(amount).toFixed(2)}`,
            date: new Date().toISOString(),
        };
        setActivities(prev => [activity, ...prev]);

        setFunds(prev => prev.map(f => {
            if (f.id === fundId) {
                const newCollected = f.collected + parseFloat(amount);
                return {
                    ...f,
                    collected: newCollected,
                    contributors: f.contributors + 1,
                    status: newCollected >= f.target ? 'completed' : 'active',
                };
            }
            return f;
        }));

        return contribution;
    }, []);

    return (
        <FundContext.Provider value={{
            funds,
            contributions,
            activities,
            loading,
            setLoading,
            getFundById,
            getContributionsForFund,
            getActivitiesForFund,
            createFund,
            addContribution,
        }}>
            {children}
        </FundContext.Provider>
    );
}

export const useFunds = () => useContext(FundContext);
