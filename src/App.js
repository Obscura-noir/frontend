import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, useLocation, Navigate, useNavigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import CreateTransactionPage from './pages/CreateTransactionPage';
import TransactionDetailsPage from './pages/TransactionDetailsPage';
import ProfilePage from './pages/ProfilePage';
import ExchangePage from './pages/ExchangePage';
import './App.css';
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider, createConfig } from "wagmi";
import { goerli, sepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import WalletConnect from "./components/WalletConnect";
import ShieldButton from "./components/ShieldButton";
import { WalletProvider } from "./components/WalletProvider";
import WalletConnectButton from "./components/WalletConnect";
import ContractInteraction from "./components/ContractInteraction";
import PXEPrivateNote from "./components/PXEPrivateNote";
import ContractFunctionCaller from "./components/ContractFunctionCaller";
import BackendStatus from "./components/BackendStatus";

const config = createConfig(
  getDefaultConfig({
    appName: "Sector 8",
    chains: [goerli, sepolia],
    projectId: "demo", // замените на свой WalletConnect Project ID для продакшена
  })
);

const queryClient = new QueryClient();

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
    <WalletProvider>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>
            <div className="App">
              <header className="App-header">
                <h1>SECTOR8: Приватные транзакции</h1>
                <WalletConnectButton />
                <BackendStatus />
              </header>
              <main>
                <section>
                  <h2>Приватная операция через PXE</h2>
                  <PXEPrivateNote />
                </section>
                <section>
                  <h2>Вызов любой функции контракта</h2>
                  <ContractFunctionCaller />
                </section>
                <section>
                  <h2>Демо: Shield USDT</h2>
                  <ContractInteraction />
                </section>
              </main>
            </div>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </WalletProvider>
  );
}

export default function AppWithRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}
