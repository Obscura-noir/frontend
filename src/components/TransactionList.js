import React from 'react';

const TransactionList = ({ transactions }) => {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Отправитель</th>
          <th>Получатель</th>
          <th>Сумма</th>
          <th>Валюта</th>
          <th>Статус</th>
        </tr>
      </thead>
      <tbody>
        {(transactions || []).map(tx => (
          <tr key={tx.id}>
            <td>{tx.id}</td>
            <td>{tx.sender_id}</td>
            <td>{tx.receiver_id}</td>
            <td>{tx.amount}</td>
            <td>{tx.currency}</td>
            <td>{tx.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TransactionList; 