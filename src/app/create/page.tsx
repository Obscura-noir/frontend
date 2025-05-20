"use client";
import React, { useState } from "react";
import { useWriteContract, useAccount, useChainId } from "wagmi";
import { CONTRACTS } from "../../contracts/config";
import { parseEther } from "ethers";
import { mainnet, goerli, sepolia } from "wagmi/chains";

export default function CreateDealPage() {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USDT");
  const [region, setRegion] = useState("");
  const [type, setType] = useState("buy");
  const [success, setSuccess] = useState(false);
  const { address: account } = useAccount();
  const chainId = useChainId();
  const { writeContractAsync, isPending } = useWriteContract();
  const [error, setError] = useState("");
  const [txHash, setTxHash] = useState<string | null>(null);
  const chains = [mainnet, goerli, sepolia];
  const chainObj = chains.find((c) => c.id === chainId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setTxHash(null);
    setSuccess(false);
    try {
      const args = [
        account,
        parseEther(amount || "0.0"),
        currency,
        region,
        type,
      ];
      const tx = await writeContractAsync({
        address: CONTRACTS.ObscuraP2PMatchContract.address as `0x${string}`,
        abi: CONTRACTS.ObscuraP2PMatchContract.abi.abi,
        functionName: "createDeal",
        args,
        chain: chainObj,
        account,
      });
      setSuccess(true);
      setTxHash(typeof tx === "string" ? tx : null);
      setAmount("");
      setRegion("");
      setType("buy");
      setTimeout(() => setSuccess(false), 3000);
    } catch (e: any) {
      setError(e?.message || "Ошибка создания сделки");
    }
  };

  return (
    <div style={{ width: "100%", maxWidth: 440, margin: "0 auto", background: "#181f36", boxShadow: "0 4px 32px #0004", padding: 32, borderRadius: 18 }}>
      <h2 style={{ textAlign: "center", marginBottom: 24, letterSpacing: 1, color: "#2ecc71" }}>Создать сделку</h2>
      <form onSubmit={handleSubmit} autoComplete="off" style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <label className="label">Сумма</label>
        <div style={{ position: "relative" }}>
          <input className="input" type="number" min="0" step="any" placeholder="Введите сумму" value={amount} onChange={e => setAmount(e.target.value)} required style={{ paddingLeft: 36 }} />
          <span style={{ position: "absolute", left: 10, top: 10, color: "#b0b8c9", fontSize: 18 }}>💰</span>
        </div>
        <label className="label">Валюта</label>
        <select className="input" value={currency} onChange={e => setCurrency(e.target.value)} style={{ fontWeight: 500 }}>
          <option value="USDT">USDT</option>
          <option value="BTC">BTC</option>
          <option value="ETH">ETH</option>
        </select>
        <label className="label">Регион</label>
        <div style={{ position: "relative" }}>
          <input className="input" type="text" placeholder="Регион (например, RU)" value={region} onChange={e => setRegion(e.target.value)} required style={{ paddingLeft: 36 }} />
          <span style={{ position: "absolute", left: 10, top: 10, color: "#b0b8c9", fontSize: 18 }}>🌍</span>
        </div>
        <label className="label">Тип сделки</label>
        <div style={{ display: "flex", gap: 12, marginBottom: 8 }}>
          <button type="button" className="button" style={{ background: type === "buy" ? "#2ecc71" : "#232b47", flex: 1, transition: "background .2s" }} onClick={() => setType("buy")}>Покупка</button>
          <button type="button" className="button" style={{ background: type === "sell" ? "#e74c3c" : "#232b47", flex: 1, transition: "background .2s" }} onClick={() => setType("sell")}>Продажа</button>
        </div>
        <button className="button" type="submit" style={{ width: "100%", fontWeight: 600, fontSize: 17, marginTop: 8 }} disabled={isPending}>{isPending ? "Создание..." : "Создать"}</button>
        {success && <div style={{ color: "#2ecc71", marginTop: 12, textAlign: "center", fontWeight: 500, fontSize: 16, transition: "opacity .2s" }}>Сделка создана!</div>}
        {txHash && <div style={{ color: "#00bcd4", marginTop: 8, textAlign: "center", fontSize: 13 }}>Tx: <a href={`https://sepolia.etherscan.io/tx/${txHash}`} target="_blank" rel="noopener noreferrer" style={{ color: "#00bcd4", textDecoration: "underline" }}>{txHash.slice(0, 10)}...</a></div>}
        {error && <div style={{ color: "#e74c3c", marginTop: 12, textAlign: "center", fontWeight: 500, fontSize: 15 }}>{error}</div>}
      </form>
    </div>
  );
} 