import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext';
import { FundProvider } from './context/FundContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import CreateFund from './pages/CreateFund';
import FundDetails from './pages/FundDetails';
import Contribute from './pages/Contribute';
import Analytics from './pages/Analytics';
import Login from './pages/Login';
import Register from './pages/Register';
import RequireAuth from './components/RequireAuth';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <FundProvider>
          <Router>
            <div className="min-h-screen bg-white dark:bg-surface-950 text-surface-900 dark:text-surface-100 transition-colors duration-300">
              <Navbar />
              <Toaster
                position="top-right"
                toastOptions={{
                  duration: 3000,
                  style: {
                    borderRadius: '12px',
                    background: 'var(--color-surface-800)',
                    color: '#fff',
                    fontSize: '14px',
                  },
                  success: {
                    iconTheme: { primary: '#22c55e', secondary: '#fff' },
                  },
                  error: {
                    iconTheme: { primary: '#ef4444', secondary: '#fff' },
                  },
                }}
              />
              <Routes>
                <Route path="/" element={<Navigate to="/register" replace />} />
                <Route path="/landing" element={<LandingPage />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
                <Route path="/create" element={<RequireAuth><CreateFund /></RequireAuth>} />
                <Route path="/fund/:id" element={<RequireAuth><FundDetails /></RequireAuth>} />
                <Route path="/contribute/:id" element={<RequireAuth><Contribute /></RequireAuth>} />
                <Route path="/analytics" element={<RequireAuth><Analytics /></RequireAuth>} />
              </Routes>
            </div>
          </Router>
        </FundProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
