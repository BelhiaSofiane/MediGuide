import { useEffect, useRef, useState } from 'react';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import HistoryPage from './pages/HistoryPage';
import { isSupabaseConfigured } from './lib/supabaseClient';
import { createSessionScope } from './lib/sessionScope';
import { createDemoCheckup } from './lib/demoCheckup';
import { onAuthStateChange, signInWithPassword, signOut, signUpWithPassword } from './services/authService';
import { createCheckup, fetchCheckups } from './services/checkupService';
import './App.css';

const PAGE_SIZE = 20;

function normalizeCheckup(checkup) {
  return {
    id: checkup.id,
    createdAt: checkup.created_at,
    date: new Date(checkup.created_at).toISOString().split('T')[0],
    symptoms: checkup.symptoms,
    possibleConditions: checkup.possible_conditions,
    severity: checkup.severity,
    recommendation: checkup.recommendation,
    isSimulated: checkup.is_simulated,
  };
}

function mergeCheckups(existing, incoming) {
  const byId = new Map([...existing, ...incoming].map((item) => [item.id, item]));
  return [...byId.values()].sort((a, b) => b.createdAt.localeCompare(a.createdAt) || b.id.localeCompare(a.id));
}

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [user, setUser] = useState(null);
  const [checkupHistory, setCheckupHistory] = useState([]);
  const [historyCount, setHistoryCount] = useState(0);
  const [historyOffset, setHistoryOffset] = useState(0);
  const [historyStatus, setHistoryStatus] = useState('idle');
  const [historyError, setHistoryError] = useState('');
  const [historyReload, setHistoryReload] = useState(0);
  const [authError, setAuthError] = useState('');
  const [isBootstrapping, setIsBootstrapping] = useState(true);
  const sessionScope = useRef(createSessionScope());
  const loadingMore = useRef(false);

  useEffect(() => {
    if (!isSupabaseConfigured) return undefined;
    const { data: listener } = onAuthStateChange((_event, session) => {
      const nextUser = session?.user ?? null;
      const previous = sessionScope.current.current();
      sessionScope.current.begin(nextUser?.id ?? null);
      if (previous.userId !== (nextUser?.id ?? null)) {
        setCheckupHistory([]);
        setHistoryCount(0);
        setHistoryOffset(0);
        setHistoryStatus(nextUser ? 'loading' : 'idle');
        setHistoryError('');
        setCurrentPage('dashboard');
      }
      setUser(nextUser);
      setAuthError('');
      setIsBootstrapping(false);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!user?.id) return undefined;
    let cancelled = false;
    const ticket = sessionScope.current.current();
    const load = async () => {
      setHistoryStatus('loading');
      setHistoryError('');
      try {
        const result = await fetchCheckups(user.id, { limit: PAGE_SIZE });
        if (cancelled || !sessionScope.current.isCurrent(ticket)) return;
        setCheckupHistory(result.checkups.map(normalizeCheckup));
        setHistoryCount(result.count ?? result.checkups.length);
        setHistoryOffset(result.checkups.length);
        setHistoryStatus('ready');
      } catch {
        if (cancelled || !sessionScope.current.isCurrent(ticket)) return;
        setHistoryError('Could not load your history. Please try again.');
        setHistoryStatus('error');
      }
    };
    load();
    return () => { cancelled = true; };
  }, [user?.id, historyReload]);

  const handleSignIn = async ({ email, password }) => {
    setAuthError('');
    try {
      await signInWithPassword(email, password);
    } catch {
      throw new Error('Could not sign in. Check your email and password and try again.');
    }
  };

  const handleSignUp = async ({ email, password }) => {
    setAuthError('');
    try {
      const data = await signUpWithPassword(email, password);
      if (!data.session) setAuthError('Account created. Please check your email to confirm before signing in.');
    } catch {
      throw new Error('Could not create the account. Please try again.');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
    } catch {
      setHistoryError('Could not sign out. Please try again.');
    }
  };

  const addCheckupToHistory = async (symptoms) => {
    const ticket = sessionScope.current.current();
    if (!ticket.userId) throw new Error('Please sign in again before saving a checkup.');
    try {
      const inserted = await createDemoCheckup(symptoms, ticket.userId, createCheckup);
      if (!sessionScope.current.isCurrent(ticket)) return;
      setCheckupHistory((items) => mergeCheckups(items, [normalizeCheckup(inserted)]));
      setHistoryCount((count) => count + 1);
      setHistoryOffset((offset) => offset + 1);
    } catch {
      if (!sessionScope.current.isCurrent(ticket)) return;
      throw new Error('Could not save the demo checkup. Please try again.');
    }
  };

  const loadMoreHistory = async () => {
    const ticket = sessionScope.current.current();
    if (!ticket.userId || loadingMore.current || historyOffset >= historyCount) return;
    loadingMore.current = true;
    setHistoryStatus('loadingMore');
    setHistoryError('');
    try {
      const result = await fetchCheckups(ticket.userId, { offset: historyOffset, limit: PAGE_SIZE });
      if (!sessionScope.current.isCurrent(ticket)) return;
      setCheckupHistory((items) => mergeCheckups(items, result.checkups.map(normalizeCheckup)));
      setHistoryOffset((offset) => offset + result.checkups.length);
      setHistoryCount(result.count ?? historyCount);
      setHistoryStatus('ready');
    } catch {
      if (!sessionScope.current.isCurrent(ticket)) return;
      setHistoryError('Could not load more history. Please try again.');
      setHistoryStatus('errorMore');
    } finally {
      loadingMore.current = false;
    }
  };

  if (!isSupabaseConfigured) {
    return <main className="min-h-screen flex items-center justify-center p-4"><div className="bg-white p-8 rounded-xl shadow-lg"><h1 className="text-2xl font-bold">Supabase setup required</h1><p>Add the public settings from frontend/.env.example to frontend/.env and restart the dev server.</p></div></main>;
  }
  if (isBootstrapping) return <main className="min-h-screen flex items-center justify-center">Loading your account...</main>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 fade-in">
      {!user && <LoginPage onSignIn={handleSignIn} onSignUp={handleSignUp} authError={authError} />}
      {user && (
        <>
          {historyError && currentPage === 'dashboard' && <p role="alert" className="container mx-auto px-4 pt-4 text-red-700">{historyError}</p>}
          {currentPage === 'dashboard' && <DashboardPage user={user} historyStatus={historyStatus} onLogout={handleLogout} onAddCheckup={addCheckupToHistory} onViewHistory={() => setCurrentPage('history')} />}
          {currentPage === 'history' && <HistoryPage user={user} checkupHistory={checkupHistory} historyCount={historyCount} historyStatus={historyStatus} historyError={historyError} onLoadMore={loadMoreHistory} onRetry={() => setHistoryReload((n) => n + 1)} onBack={() => setCurrentPage('dashboard')} />}
        </>
      )}
    </div>
  );
}
