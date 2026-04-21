import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { fetchMeAPI, loginAPI, logoutAPI, registerAPI } from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const bootstrap = async () => {
            try {
                const res = await fetchMeAPI();
                setUser(res.data.user);
            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        bootstrap();
    }, []);

    const login = async (email, password) => {
        const res = await loginAPI({ email, password });
        setUser(res.data.user);
        return res.data.user;
    };

    const register = async (name, email, password) => {
        const res = await registerAPI({ name, email, password });
        setUser(res.data.user);
        return res.data.user;
    };

    const logout = () => {
        logoutAPI();
        setUser(null);
    };

    const value = useMemo(() => ({
        user,
        loading,
        isAuthenticated: Boolean(user),
        login,
        register,
        logout,
    }), [user, loading]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
