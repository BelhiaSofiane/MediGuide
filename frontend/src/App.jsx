import React, { useState } from 'react';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import HistoryPage from './pages/HistoryPage';
import dummyHistoryData from './assets/dummyHistoryData';
import './App.css';

export default function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [user, setUser] = useState(null);
  const [checkupHistory, setCheckupHistory] = useState([]);

  const handleLogin = (userData) => {
    setUser(userData);
    setCheckupHistory(dummyHistoryData);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCheckupHistory([]);
    setCurrentPage('login');
  };

  const addCheckupToHistory = (checkupData) => {
    const newCheckup = {
      id: checkupHistory.length + 1,
      date: new Date().toISOString().split('T')[0],
      ...checkupData
    };
    setCheckupHistory([newCheckup, ...checkupHistory]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 fade-in">
      {currentPage === 'login' && <LoginPage onLogin={handleLogin} />}
      {currentPage === 'dashboard' && (
        <DashboardPage
          user={user}
          onLogout={handleLogout}
          onAddCheckup={addCheckupToHistory}
          onViewHistory={() => setCurrentPage('history')}
        />
      )}
      {currentPage === 'history' && (
        <HistoryPage
          user={user}
          checkupHistory={checkupHistory}
          onBack={() => setCurrentPage('dashboard')}
        />
      )}
    </div>
  );
}
