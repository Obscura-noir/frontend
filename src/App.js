import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, useLocation, Navigate, useNavigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import CreateTransactionPage from './pages/CreateTransactionPage';
import TransactionDetailsPage from './pages/TransactionDetailsPage';
import ProfilePage from './pages/ProfilePage';
import ExchangePage from './pages/ExchangePage';
import './App.css';

function getUser() {
  try {
    const token = localStorage.getItem('token');
    if (!token) return null;
    const payload = JSON.parse(atob(token.split('.')[1]));
    return { email: payload.email, id: payload.id };
  } catch {
    return null;
  }
}

function TopBar({ onMenuClick, onLogout, user }) {
  return (
    <div className="topbar">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <button className="mobile-menu-btn" onClick={onMenuClick} aria-label="Открыть меню">
          &#9776;
        </button>
        <span className="status-indicator status-success" title="TOR Connected" /> TOR
        <span className="status-indicator status-success" title="PXE Ready" style={{ marginLeft: 16 }} /> PXE
      </div>
      <div>
        {user && <span style={{ marginRight: 18, color: '#b0b8c9', fontSize: 15 }}>{user.email}</span>}
        <span style={{ marginRight: 24 }}>Сессия: 14:59</span>
        <button className="button" style={{ background: '#e74c3c' }} onClick={onLogout}>Экстренный выход</button>
      </div>
    </div>
  );
}

function SideBar({ onLogout }) {
  return (
    <div className="sidebar">
      <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>Дашборд</NavLink>
      <NavLink to="/exchange" className={({ isActive }) => isActive ? 'active' : ''}>Биржа</NavLink>
      <NavLink to="/create" className={({ isActive }) => isActive ? 'active' : ''}>Создать сделку</NavLink>
      <NavLink to="/profile" className={({ isActive }) => isActive ? 'active' : ''}>Профиль</NavLink>
      <button className="button" style={{ margin: 16, background: '#e74c3c' }} onClick={onLogout}>Выйти</button>
    </div>
  );
}

function MobileMenu({ open, onClose, onLogout }) {
  const location = useLocation();
  if (!open) return null;
  return (
    <div className="mobile-menu-overlay" onClick={onClose}>
      <nav className="mobile-menu-nav" onClick={e => e.stopPropagation()}>
        <NavLink to="/dashboard" className={({ isActive }) => isActive || location.pathname === '/dashboard' ? 'active' : ''} onClick={onClose}>Дашборд</NavLink>
        <NavLink to="/exchange" className={({ isActive }) => isActive || location.pathname === '/exchange' ? 'active' : ''} onClick={onClose}>Биржа</NavLink>
        <NavLink to="/create" className={({ isActive }) => isActive || location.pathname === '/create' ? 'active' : ''} onClick={onClose}>Создать сделку</NavLink>
        <NavLink to="/profile" className={({ isActive }) => isActive || location.pathname === '/profile' ? 'active' : ''} onClick={onClose}>Профиль</NavLink>
        <button className="button" style={{ margin: 16, background: '#e74c3c', width: '90%' }} onClick={() => { onClose(); onLogout(); }}>Выйти</button>
      </nav>
    </div>
  );
}

function PrivateRoute({ children }) {
  const user = getUser();
  return user ? children : <Navigate to="/" replace />;
}

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(getUser());
  const navigate = useNavigate();

  useEffect(() => {
    setUser(getUser());
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  return (
    <>
      <TopBar onMenuClick={() => setMobileMenuOpen(true)} onLogout={handleLogout} user={user} />
      <MobileMenu open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} onLogout={handleLogout} />
      <div className="app-container">
        <SideBar onLogout={handleLogout} />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
            <Route path="/exchange" element={<PrivateRoute><ExchangePage /></PrivateRoute>} />
            <Route path="/create" element={<PrivateRoute><CreateTransactionPage /></PrivateRoute>} />
            <Route path="/transaction/:id" element={<PrivateRoute><TransactionDetailsPage /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><ProfilePage user={user} /></PrivateRoute>} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default function AppWithRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}
