import React from "react";
import WalletConnectButton from "../../components/WalletConnectButton";

const mockDeals = [
  { id: "DL-001", status: "completed", amount: 1000, counterparty: "agentA" },
  { id: "DL-002", status: "in_progress", amount: 500, counterparty: "agentB" },
  { id: "DL-003", status: "rejected", amount: 700, counterparty: "agentC" },
];

const statusMap: { [key: string]: { label: string; className: string } } = {
  completed: { label: "Завершена", className: "status-completed" },
  in_progress: { label: "В процессе", className: "status-inprogress" },
  rejected: { label: "Отклонена", className: "status-rejected" },
};

export default function DashboardPage() {
  return (
    <div className="card" style={{ maxWidth: 600, margin: "40px auto" }}>
      <WalletConnectButton />
      <h2 style={{ textAlign: "center", marginBottom: 24 }}>Дашборд</h2>
      <div style={{ marginBottom: 24, color: "#b0b8c9" }}>Добро пожаловать в SECTOR 8!</div>
      <div>
        {mockDeals.map(tx => (
          <div key={tx.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid #232b47" }}>
            <div>
              <span className="label">ID сделки:</span> {tx.id}
            </div>
            <div>
              <span className={`status-indicator ${statusMap[tx.status]?.className ?? ''}`} title={statusMap[tx.status]?.label ?? ''} />
              <span style={{ color: "#b0b8c9", marginLeft: 6 }}>{statusMap[tx.status]?.label ?? ''}</span>
            </div>
            <div>
              <span className="label">Сумма:</span> {tx.amount}
            </div>
            <div>
              <span className="label">Контрагент:</span> {tx.counterparty}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 