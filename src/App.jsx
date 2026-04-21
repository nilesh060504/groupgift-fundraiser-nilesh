import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext';
import { FundProvider } from './context/FundContext';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import CreateFund from './pages/CreateFund';
import FundDetails from './pages/FundDetails';
import Contribute from './pages/Contribute';
import Analytics from './pages/Analytics';

export default function App() {
  return (
    <ThemeProvider>
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
              <Route path="/" element={<LandingPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/create" element={<CreateFund />} />
              <Route path="/fund/:id" element={<FundDetails />} />
              <Route path="/contribute/:id" element={<Contribute />} />
              <Route path="/analytics" element={<Analytics />} />
            </Routes>
          </div>
        </Router>
      </FundProvider>
    </ThemeProvider>
  );
}
