import React, { useEffect, useState } from 'react';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import HistoryPage from './pages/HistoryPage';
import { isSupabaseConfigured } from './lib/supabaseClient';
import {
  getSession,
  onAuthStateChange,
  signInWithPassword,
  signOut,
  signUpWithPassword,
} from './services/authService';
import { createCheckup, fetchCheckups } from './services/checkupService';
import './App.css';

const INITIAL_PAGE = 'dashboard';

function normalizeCheckup(checkup) {
  return {
    id: checkup.id,
    date: new Date(checkup.created_at).toISOString().split('T')[0],
    symptoms: checkup.symptoms,
    possibleConditions: checkup.possible_conditions,
    severity: checkup.severity,
    recommendation: checkup.recommendation,
  };
}

export default function App() {
  const [currentPage, setCurrentPage] = useState(INITIAL_PAGE);
  const [user, setUser] = useState(null);
  const [checkupHistory, setCheckupHistory] = useState([]);
  const [authError, setAuthError] = useState('');
  const [isBootstrapping, setIsBootstrapping] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setIsBootstrapping(false);
      return undefined;
    }

    let mounted = true;

    const bootstrap = async () => {
      try {
        const session = await getSession();
        if (!mounted) {
          return;
        }
        const sessionUser = session?.user ?? null;
        setUser(sessionUser);
        if (sessionUser) {
          const checkups = await fetchCheckups(sessionUser.id);
          if (!mounted) {
            return;
          }
          setCheckupHistory(checkups.map(normalizeCheckup));
        }
      } catch (error) {
        if (mounted) {
          setAuthError(error.message);
        }
      } finally {
        if (mounted) {
          setIsBootstrapping(false);
        }
      }
    };

    bootstrap();

    const { data: authListener } = onAuthStateChange(async (_event, session) => {
      if (!mounted) {
        return;
      }
      const sessionUser = session?.user ?? null;
      setUser(sessionUser);
      setAuthError('');
      if (!sessionUser) {
        setCheckupHistory([]);
        setCurrentPage('login');
        return;
      }
      setCurrentPage(INITIAL_PAGE);
      try {
        const checkups = await fetchCheckups(sessionUser.id);
        if (mounted) {
          setCheckupHistory(checkups.map(normalizeCheckup));
        }
      } catch (error) {
        if (mounted) {
          setAuthError(error.message);
        }
      }
    });

    return () => {
      mounted = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleSignIn = async ({ email, password }) => {
    setAuthError('');
    await signInWithPassword(email, password);
  };

  const handleSignUp = async ({ email, password }) => {
    setAuthError('');
    const data = await signUpWithPassword(email, password);
    if (!data.session) {
      setAuthError('Account created. Please check your email to confirm before signing in.');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      setAuthError(error.message);
    }
  };

  const addCheckupToHistory = async (checkupData) => {
    if (!user) {
      return;
    }

    const inserted = await createCheckup({
      user_id: user.id,
      symptoms: checkupData.symptoms,
      possible_conditions: checkupData.possibleConditions,
      severity: checkupData.severity,
      recommendation: checkupData.recommendation,
    });

    setCheckupHistory((prevHistory) => [normalizeCheckup(inserted), ...prevHistory]);
  };

  if (!isSupabaseConfigured) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 fade-in flex items-center justify-center px-4">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Supabase Setup Required</h1>
          <p className="text-gray-700 mb-2">Add these variables in `frontend/.env`:</p>
          <pre className="bg-gray-100 rounded-lg p-4 text-sm overflow-auto">
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
          </pre>
        </div>
      </div>
    );
  }

  if (isBootstrapping) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 fade-in flex items-center justify-center">
        <p className="text-gray-700">Loading your account...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 fade-in">
      {!user && (
        <LoginPage
          onSignIn={handleSignIn}
          onSignUp={handleSignUp}
          authError={authError}
        />
      )}
      {user && currentPage === 'dashboard' && (
        <DashboardPage
          user={user}
          onLogout={handleLogout}
          onAddCheckup={addCheckupToHistory}
          onViewHistory={() => setCurrentPage('history')}
        />
      )}
      {user && currentPage === 'history' && (
        <HistoryPage
          user={user}
          checkupHistory={checkupHistory}
          onBack={() => setCurrentPage('dashboard')}
        />
      )}
    </div>
  );
}
