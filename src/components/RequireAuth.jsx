import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RequireAuth({ children }) {
    const { isAuthenticated, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="min-h-screen pt-24 pb-12 px-4 flex items-center justify-center">
                <p className="text-surface-500">Checking session...</p>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/register" replace state={{ from: location.pathname }} />;
    }

    return children;
}
