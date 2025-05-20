import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function WalletConnectButton() {
  return (
    <div style={{ margin: "24px 0", textAlign: "center" }}>
      <ConnectButton label="Подключить кошелек" />
    </div>
  );
} 