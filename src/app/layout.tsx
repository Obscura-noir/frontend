import React from "react";
import "./globals.css";
import { WalletProvider } from "../components/WalletProvider";

export const metadata = {
  title: "SECTOR 8",
  description: "SECTOR 8 — приватные сделки и обмены на EVM",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <WalletProvider>
          {children}
        </WalletProvider>
      </body>
    </html>
  );
} 