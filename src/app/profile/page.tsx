"use client";
import React, { useEffect, useState } from "react";
import { FaUserCircle, FaKey, FaCheckCircle } from "react-icons/fa";
import { useAccount, useSignMessage } from "wagmi";

const REGISTRATION_KEY = "sector8_registered";
const SIGN_MESSAGE = "Регистрация в SECTOR8: подтверждаю владение адресом и согласие с условиями приватности.";

export default function ProfilePage() {
  const { address, isConnected } = useAccount();
  const [registered, setRegistered] = useState(false);
  const { signMessage, isPending } = useSignMessage({
    mutation: {
      onSuccess: () => {
        localStorage.setItem(REGISTRATION_KEY, "true");
        setRegistered(true);
      },
    },
  });

  useEffect(() => {
    if (localStorage.getItem(REGISTRATION_KEY) === "true") {
      setRegistered(true);
    }
  }, []);

  return (
    <div className="card" style={{ maxWidth: 440, margin: "40px auto", boxShadow: "0 4px 32px #0004", padding: 32, borderRadius: 18, background: "#181f36", transition: "box-shadow .2s" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 28 }}>
        <div style={{ width: 72, height: 72, borderRadius: "50%", background: "#232b47", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 44, color: "#2ecc71", boxShadow: "0 2px 8px #0002" }}>
          <FaUserCircle />
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 24, color: "#fff" }}>{address ? address : "Не подключено"}</div>
        </div>
      </div>
      <div style={{ marginBottom: 18, display: "flex", alignItems: "center", gap: 8 }}>
        <span className="label">Статус:</span>
        {registered ? (
          <>
            <FaCheckCircle style={{ color: "#2ecc71", fontSize: 18 }} />
            <span style={{ color: "#2ecc71", fontWeight: 600, marginLeft: 4 }}>Зарегистрирован</span>
          </>
        ) : (
          <span style={{ color: "#e74c3c", fontWeight: 600, marginLeft: 4 }}>Не зарегистрирован</span>
        )}
      </div>
      <div style={{ marginBottom: 18, display: "flex", alignItems: "center", gap: 8 }}>
        <span className="label">Приватные ключи:</span>
        <FaKey style={{ color: "#00bcd4", fontSize: 18 }} />
        <span style={{ color: "#00bcd4", marginLeft: 4 }}>Скрыто</span>
      </div>
      {!registered && (
        <button
          className="button"
          style={{ width: "100%", marginTop: 32, background: "#2ecc71", fontWeight: 600, fontSize: 17, borderRadius: 8, transition: "background .2s" }}
          onClick={() => signMessage({ message: SIGN_MESSAGE, account: address })}
          disabled={!isConnected || isPending}
        >
          {isPending ? "Подпись..." : "Зарегистрироваться через Web3"}
        </button>
      )}
      {registered && (
        <div style={{ color: "#2ecc71", textAlign: "center", marginTop: 32, fontWeight: 600 }}>
          Вы успешно зарегистрированы через Web3!
        </div>
      )}
      <div style={{ color: "#b0b8c9", fontSize: 13, marginTop: 24, textAlign: "center" }}>
        <span>Резервное копирование и управление ключами — <b>скоро</b></span>
      </div>
      <button className="button" style={{ width: "100%", marginTop: 32, background: "#e74c3c", fontWeight: 600, fontSize: 17, borderRadius: 8, transition: "background .2s" }} onClick={() => {
        localStorage.removeItem(REGISTRATION_KEY);
        window.location.reload();
      }}>Выйти</button>
    </div>
  );
} 