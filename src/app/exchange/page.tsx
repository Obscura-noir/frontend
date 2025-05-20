"use client";
import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";

export default function ExchangePage() {
  return (
    <div style={{ maxWidth: 600, margin: "40px auto", padding: 32, background: "#181f36", borderRadius: 16, boxShadow: "0 2px 16px #0002" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
        <h2 style={{ fontSize: 28, fontWeight: 700, color: "#2ecc71", margin: 0 }}>Биржа</h2>
        <ConnectButton label="Подключить кошелек" showBalance={true} />
      </div>
      <div style={{ color: "#b0b8c9", fontSize: 17, marginBottom: 32 }}>
        Здесь вы можете обменивать активы, создавать и принимать сделки напрямую через смарт-контракты.
      </div>
      <div style={{ display: "flex", gap: 16, marginBottom: 32 }}>
        <Link href="/create" style={{ background: "#2ecc71", color: "#fff", borderRadius: 8, fontWeight: 600, fontSize: 17, padding: "12px 24px", textDecoration: "none", transition: "background .2s" }}>Создать сделку</Link>
        <Link href="/dashboard" style={{ background: "#232b47", color: "#fff", borderRadius: 8, fontWeight: 600, fontSize: 17, padding: "12px 24px", textDecoration: "none", transition: "background .2s" }}>Дашборд</Link>
      </div>
      {/* Здесь будет таблица/список сделок или обменов */}
      <div style={{ color: "#fff", fontSize: 16, textAlign: "center", opacity: 0.7 }}>
        Нет активных сделок. Создайте новую или выберите из списка.
      </div>
    </div>
  );
} 