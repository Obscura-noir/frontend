"use client";
import React, { useEffect, useState } from 'react';

const ProfilePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Попытка получить user из localStorage (или заглушка)
    try {
      const token = localStorage.getItem('token');
      // Можно добавить fetch профиля по токену, если API готов
      setUser({ email: 'user@example.com', id: '12345' }); // временная заглушка
    } catch {}
  }, []);

  return (
    <div className="card" style={{ maxWidth: 400, margin: '40px auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: 24 }}>Профиль</h2>
      <div style={{ marginBottom: 16 }}>
        <span className="label">Email:</span>
        <span style={{ color: '#b0b8c9' }}>{user?.email || '—'}</span>
      </div>
      <div style={{ marginBottom: 16 }}>
        <span className="label">ID:</span>
        <span style={{ color: '#b0b8c9' }}>{user?.id || '—'}</span>
      </div>
      <div style={{ marginBottom: 16 }}>
        <span className="label">Приватные ключи:</span>
        <span className="status-indicator status-private" title="Приватные данные" />
        <span style={{ color: '#00bcd4', marginLeft: 8 }}>Скрыто</span>
      </div>
      <div style={{ color: '#b0b8c9', fontSize: 13, marginTop: 24, textAlign: 'center' }}>
        <span>Резервное копирование и управление ключами — скоро</span>
      </div>
    </div>
  );
};

export default ProfilePage; 