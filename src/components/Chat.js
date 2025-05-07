import React from 'react';

const Chat = ({ messages }) => {
  return (
    <div style={{ border: '1px solid #eee', borderRadius: 8, padding: 16, marginTop: 24 }}>
      <div style={{ maxHeight: 200, overflowY: 'auto', marginBottom: 12 }}>
        {(messages || []).map((msg, idx) => (
          <div key={idx} style={{ marginBottom: 8 }}>
            <b>{msg.sender_id}:</b> {msg.content}
          </div>
        ))}
      </div>
      <form>
        <input type="text" placeholder="Введите сообщение..." style={{ width: '80%', padding: 8 }} />
        <button type="submit" style={{ width: '18%', marginLeft: '2%', padding: 8 }}>Отправить</button>
      </form>
    </div>
  );
};

export default Chat; 