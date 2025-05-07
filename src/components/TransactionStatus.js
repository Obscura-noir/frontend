import React from 'react';

const statusColors = {
  created: '#bdbdbd',
  proposed: '#90caf9',
  accepted: '#81c784',
  in_progress: '#ffd54f',
  completed: '#4caf50',
  rejected: '#e57373',
};

const TransactionStatus = ({ status }) => (
  <span style={{
    background: statusColors[status] || '#eee',
    color: '#222',
    padding: '2px 8px',
    borderRadius: 6,
    fontSize: 12,
  }}>{status}</span>
);

export default TransactionStatus; 