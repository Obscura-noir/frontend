import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { FaWallet } from "react-icons/fa";

export default function WalletConnectButton() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, background: "#2ecc71", borderRadius: 8, fontWeight: 600, fontSize: 16, padding: "8px 18px", boxShadow: "0 2px 8px #0002", transition: "background .2s" }}>
      <FaWallet style={{ color: "#fff", fontSize: 22 }} />
      <ConnectButton
        label="Подключить кошелек"
        showBalance={true}
        accountStatus={{ smallScreen: "avatar", largeScreen: "full" }}
        chainStatus={{ smallScreen: "icon", largeScreen: "full" }}
      />
    </div>
  );
} 