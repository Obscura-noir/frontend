"use client";

import React, { useState } from "react";

export default function AuthPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(isRegister ? "Регистрация успешна!" : "Вход выполнен!");
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <div className="card" style={{ maxWidth: 400, margin: "60px auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: 24 }}>{isRegister ? "Регистрация" : "Вход в SECTOR 8"}</h2>
      <form autoComplete="off" onSubmit={handleSubmit}>
        {isRegister && (
          <>
            <label className="label">Имя</label>
            <input className="input" type="text" placeholder="Ваше имя" value={name} onChange={e => setName(e.target.value)} required />
          </>
        )}
        <label className="label">Email</label>
        <input className="input" type="email" placeholder="Введите email" autoComplete="username" value={email} onChange={e => setEmail(e.target.value)} required />
        <label className="label">Пароль</label>
        <input className="input" type="password" placeholder="Введите пароль" autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} required />
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
          <button className="button" type="submit" style={{ width: "48%" }} disabled={loading}>{isRegister ? "Зарегистрироваться" : "Войти"}</button>
          <button className="button" type="button" style={{ width: "48%", background: "#142042" }} onClick={() => { setIsRegister(r => !r); setError(""); setSuccess(""); }}>{isRegister ? "Вход" : "Регистрация"}</button>
        </div>
        {error && (
          <div style={{ background: "#e74c3c", color: "#fff", borderRadius: 6, padding: "8px 12px", marginBottom: 10, textAlign: "center", fontSize: 15, animation: "fadeIn 0.2s" }}>
            {error}
          </div>
        )}
        {success && (
          <div style={{ background: "#2ecc71", color: "#fff", borderRadius: 6, padding: "8px 12px", marginBottom: 10, textAlign: "center", fontSize: 15, animation: "fadeIn 0.2s" }}>
            {success}
          </div>
        )}
        <div style={{ textAlign: "center", color: "#b0b8c9", fontSize: 13 }}>
          <span>2FA и CAPTCHA — скоро</span>
        </div>
      </form>
    </div>
  );
} 