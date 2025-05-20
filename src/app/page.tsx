import React from "react";

export default function HomePage() {
  return (
    <div className="card" style={{ maxWidth: 420, margin: "60px auto", textAlign: "center" }}>
      <h1 style={{ marginBottom: 16 }}>SECTOR 8</h1>
      <p style={{ color: "#b0b8c9", marginBottom: 32 }}>
        Приватные сделки и обмены на EVM. <br />
        Безопасно. Анонимно. Быстро.
      </p>
      <a href="/auth" className="button" style={{ width: 180, display: "inline-block", marginBottom: 12 }}>Войти / Регистрация</a>
      <br />
      <a href="/dashboard" style={{ color: "#2ecc71", fontSize: 15 }}>Перейти к дашборду</a>
    </div>
  );
} 