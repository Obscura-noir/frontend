import React from 'react';

const CreateTransactionPage = () => {
  return (
    <div className="card" style={{ maxWidth: 500, margin: '40px auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: 24 }}>Создать сделку</h2>
      <form>
        <label className="label">Email получателя</label>
        <input className="input" type="email" placeholder="Email контрагента" />
        <label className="label">Сумма</label>
        <input className="input" type="number" placeholder="Сумма" />
        <label className="label">Валюта</label>
        <input className="input" type="text" placeholder="USD, EUR..." />
        <label className="label">Описание</label>
        <textarea className="textarea" placeholder="Описание сделки" rows={3} />
        <button className="button" type="submit" style={{ width: '100%' }}>Создать</button>
      </form>
    </div>
  );
};

export default CreateTransactionPage; 