import React from 'react';

const mockTransactions = [
  { id: 'TX-001', status: 'completed', amount: 1000, currency: 'USD', private: true },
  { id: 'TX-002', status: 'in_progress', amount: 500, currency: 'EUR', private: false },
  { id: 'TX-003', status: 'rejected', amount: 200, currency: 'USD', private: true },
];

const statusMap = {
  completed: { label: 'Завершена', className: 'status-success' },
  in_progress: { label: 'В процессе', className: 'status-warning' },
  rejected: { label: 'Отклонена', className: 'status-error' },
};

const DashboardPage = () => {
  return (
    <div>
      <h2 style={{ marginBottom: 24 }}>Активные сделки</h2>
      {mockTransactions.map(tx => (
        <div className="card" key={tx.id}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <span style={{ fontWeight: 600, fontSize: 18 }}>{tx.id}</span>
              {tx.private && <span className="status-indicator status-private" title="Приватная сделка" style={{ marginLeft: 10 }} />}
            </div>
            <div>
              <span className={`status-indicator ${statusMap[tx.status].className}`} title={statusMap[tx.status].label} />
              <span style={{ color: '#b0b8c9', marginLeft: 6 }}>{statusMap[tx.status].label}</span>
            </div>
          </div>
          <div style={{ marginTop: 12, color: '#b0b8c9', fontSize: 15 }}>
            {tx.amount} {tx.currency}
          </div>
        </div>
      ))}
      <div className="card" style={{ background: '#101a2b', color: '#b0b8c9', textAlign: 'center' }}>
        <span>Зашифрованные заметки и статистика — скоро</span>
      </div>
    </div>
  );
};

export default DashboardPage; 