"use client";
import React from "react";
import { FaUserCircle, FaKey, FaCheckCircle } from "react-icons/fa";

export default function ProfilePage() {
  // В реальном проекте данные берутся из стора или API
  const user = {
    email: "user@example.com",
    id: "0x1234...abcd",
    status: "Верифицирован",
  };

  return (
    <div className="card" style={{ maxWidth: 440, margin: "40px auto", boxShadow: "0 4px 32px #0004", padding: 32, borderRadius: 18, background: "#181f36", transition: "box-shadow .2s" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 28 }}>
        <div style={{ width: 72, height: 72, borderRadius: "50%", background: "#232b47", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 44, color: "#2ecc71", boxShadow: "0 2px 8px #0002" }}>
          <FaUserCircle />
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 24, color: "#fff" }}>{user.email}</div>
          <div style={{ color: "#b0b8c9", fontSize: 15, marginTop: 2 }}>ID: {user.id}</div>
        </div>
      </div>
      <div style={{ marginBottom: 18, display: "flex", alignItems: "center", gap: 8 }}>
        <span className="label">Статус:</span>
        <FaCheckCircle style={{ color: "#2ecc71", fontSize: 18 }} />
        <span style={{ color: "#2ecc71", fontWeight: 600, marginLeft: 4 }}>{user.status}</span>
      </div>
      <div style={{ marginBottom: 18, display: "flex", alignItems: "center", gap: 8 }}>
        <span className="label">Приватные ключи:</span>
        <FaKey style={{ color: "#00bcd4", fontSize: 18 }} />
        <span style={{ color: "#00bcd4", marginLeft: 4 }}>Скрыто</span>
      </div>
      <div style={{ color: "#b0b8c9", fontSize: 13, marginTop: 24, textAlign: "center" }}>
        <span>Резервное копирование и управление ключами — <b>скоро</b></span>
      </div>
      <button className="button" style={{ width: "100%", marginTop: 32, background: "#e74c3c", fontWeight: 600, fontSize: 17, borderRadius: 8, transition: "background .2s" }} onClick={() => alert("Выход")}>Выйти</button>
    </div>
  );
} 