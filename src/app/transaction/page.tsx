import React from 'react';

const mockTx = {
  id: 'TX-001',
  status: 'completed',
  amount: 1000,
  currency: 'USD',
  private: true,
  description: 'Оплата за услуги',
  messages: [
    { sender: 'Вы', content: 'Документы отправлены.' },
    { sender: 'Контрагент', content: 'Получил, проверяю.' },
  ],
};

const statusMap = {
  completed: { label: 'Завершена', className: 'status-success' },
  in_progress: { label: 'В процессе', className: 'status-warning' },
  rejected: { label: 'Отклонена', className: 'status-error' },
};

const TransactionDetailsPage = () => {
  return (
    <div className="card" style={{ maxWidth: 600, margin: '40px auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontWeight: 600, fontSize: 18 }}>{mockTx.id}</span>
        <span className={`status-indicator ${statusMap[mockTx.status].className}`} title={statusMap[mockTx.status].label} />
        <span style={{ color: '#b0b8c9', marginLeft: 6 }}>{statusMap[mockTx.status].label}</span>
      </div>
      <div style={{ marginTop: 16, color: '#b0b8c9', fontSize: 15 }}>
        {mockTx.amount} {mockTx.currency}
      </div>
      <div style={{ marginTop: 16 }}>
        <span className="label">Описание:</span>
        <span style={{ color: '#b0b8c9' }}>{mockTx.description}</span>
      </div>
      <div style={{ marginTop: 24 }}>
        <span className="label">Чат (end-to-end шифрование):</span>
        <div style={{ background: '#101a2b', borderRadius: 6, padding: 12, minHeight: 60, marginBottom: 8 }}>
          {mockTx.messages.map((msg, idx) => (
            <div key={idx} style={{ color: '#b0b8c9', marginBottom: 4 }}>
              <b style={{ color: '#fff' }}>{msg.sender}:</b> {msg.content}
            </div>
          ))}
        </div>
        <form>
          <input className="input" type="text" placeholder="Введите сообщение..." />
          <button className="button" type="submit" style={{ width: '100%' }}>Отправить</button>
        </form>
      </div>
    </div>
  );
};

export default TransactionDetailsPage; 