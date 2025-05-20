"use client";

import React, { useState } from 'react';

const mockOrders = [
  { id: 'ORD-001', type: 'buy', price: 92.1, amount: 1000, user: 'agentA', trust: 95 },
  { id: 'ORD-002', type: 'buy', price: 91.8, amount: 500, user: 'agentB', trust: 88 },
  { id: 'ORD-003', type: 'sell', price: 92.5, amount: 700, user: 'agentC', trust: 99 },
  { id: 'ORD-004', type: 'sell', price: 92.7, amount: 1200, user: 'agentD', trust: 80 },
];

const TrustScore = ({ value }) => (
  <span style={{
    background: value > 90 ? '#2ecc71' : value > 85 ? '#ffd600' : '#e74c3c',
    color: '#fff',
    borderRadius: 6,
    padding: '2px 8px',
    fontSize: 13,
    marginLeft: 8,
    fontWeight: 600,
  }}>TS: {value}</span>
);

const ExchangePage = () => {
  const [pair] = useState('USDT / RUB');
  const buyOrders = mockOrders.filter(o => o.type === 'buy');
  const sellOrders = mockOrders.filter(o => o.type === 'sell');

  return (
    <div>
      <h2 style={{ marginBottom: 24 }}>Биржевой интерфейс</h2>
      <div className="card" style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span className="label">Валютная пара:</span>
          <select className="input" style={{ width: 180 }} value={pair} disabled>
            <option>USDT / RUB</option>
            <option>BTC / USDT</option>
            <option>ETH / USDT</option>
          </select>
        </div>
        <div style={{ marginTop: 16, color: '#b0b8c9', fontSize: 15 }}>
          Рыночная статистика: объем за 24ч, изменение цены % (заглушка)
        </div>
      </div>
      <div className="card" style={{ display: 'flex', flexDirection: 'row', gap: 24, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 220 }}>
          <div className="label" style={{ marginBottom: 8 }}>Покупка</div>
          <table style={{ width: '100%', fontSize: 15, background: 'none', color: '#2ecc71' }}>
            <thead>
              <tr style={{ color: '#b0b8c9' }}>
                <th align="left">Цена</th>
                <th align="left">Объем</th>
                <th align="left">Агент</th>
                <th align="left">Trust</th>
              </tr>
            </thead>
            <tbody>
              {buyOrders.map(order => (
                <tr key={order.id}>
                  <td>{order.price}</td>
                  <td>{order.amount}</td>
                  <td>{order.user}</td>
                  <td><TrustScore value={order.trust} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ flex: 1, minWidth: 220 }}>
          <div className="label" style={{ marginBottom: 8 }}>Продажа</div>
          <table style={{ width: '100%', fontSize: 15, background: 'none', color: '#e74c3c' }}>
            <thead>
              <tr style={{ color: '#b0b8c9' }}>
                <th align="left">Цена</th>
                <th align="left">Объем</th>
                <th align="left">Агент</th>
                <th align="left">Trust</th>
              </tr>
            </thead>
            <tbody>
              {sellOrders.map(order => (
                <tr key={order.id}>
                  <td>{order.price}</td>
                  <td>{order.amount}</td>
                  <td>{order.user}</td>
                  <td><TrustScore value={order.trust} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 16, marginTop: 24, flexWrap: 'wrap' }}>
        <button className="button" style={{ background: '#2ecc71', minWidth: 180 }}>Создать ордер на покупку</button>
        <button className="button" style={{ background: '#e74c3c', minWidth: 180 }}>Создать ордер на продажу</button>
      </div>
      <div className="card" style={{ marginTop: 32, color: '#b0b8c9', textAlign: 'center' }}>
        <span>В будущем здесь появится стакан ордеров, TrustScore, детали лота, быстрые действия и приватные элементы согласно PRD.</span>
      </div>
    </div>
  );
};

export default ExchangePage; 