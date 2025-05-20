import React from "react";
import "./globals.css";
import { WalletProvider } from "../components/WalletProvider";
import Link from "next/link";
import WalletConnectButton from "../components/WalletConnectButton";
import '@rainbow-me/rainbowkit/styles.css';

export const metadata = {
  title: "SECTOR 8",
  description: "SECTOR 8 — приватные сделки и обмены на EVM",
};

const navStyle = {
  color: "#fff",
  fontWeight: 500,
  fontSize: 17,
  textDecoration: "none",
  padding: "10px 0",
  width: "100%",
  textAlign: "center" as const,
  borderRadius: 6,
  transition: "background .2s"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <WalletProvider>
          <div style={{ display: "flex", minHeight: "100vh", background: "#101624" }}>
            {/* Sidebar */}
            <aside style={{ width: 220, background: "#181f36", boxShadow: "2px 0 16px #0002", display: "flex", flexDirection: "column", alignItems: "center", padding: "32px 0 0 0", position: "sticky", left: 0, top: 0, height: "100vh" }}>
              <div style={{ fontWeight: 800, fontSize: 26, color: "#2ecc71", marginBottom: 32, letterSpacing: 2 }}>
                SECTOR 8
              </div>
              <nav style={{ display: "flex", flexDirection: "column", gap: 18, width: "100%", alignItems: "center" }}>
                <Link href="/dashboard" style={navStyle}>Дашборд</Link>
                <Link href="/create" style={navStyle}>Создать сделку</Link>
                <Link href="/exchange" style={navStyle}>Биржа</Link>
                <Link href="/profile" style={navStyle}>Профиль</Link>
              </nav>
              <div style={{ marginTop: "auto", marginBottom: 32 }}>
                <WalletConnectButton />
              </div>
            </aside>
            {/* Main content */}
            <main style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "flex-start" }}>
              <div style={{ width: "100%", maxWidth: 520, minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                {children}
              </div>
            </main>
          </div>
        </WalletProvider>
      </body>
    </html>
  );
} 