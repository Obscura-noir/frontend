import React, { useState } from "react";
import { CONTRACTS } from "../contracts/sector8";
import { useContract } from "../hooks/useContract";

export const ContractInteraction = () => {
  const { address, abi } = CONTRACTS.USDT_BRIDGE;
  const { contract } = useContract(address, abi);
  const [amount, setAmount] = useState(0);
  const [txHash, setTxHash] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleShield = async () => {
    if (!contract) return;
    setLoading(true);
    setError("");
    setTxHash("");
    try {
      const tx = await contract.shield(amount);
      await tx.wait();
      setTxHash(tx.hash);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contract-interaction">
      <h3>USDT Bridge: Shield</h3>
      {!contract && <div style={{ color: 'gray' }}>Подключите кошелек и выберите поддерживаемую сеть</div>}
      <input
        type="number"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        placeholder="Сумма USDT"
        min={0}
        disabled={!contract}
      />
      <button onClick={handleShield} disabled={loading || !contract}>
        {loading ? "Выполняется..." : "Shield"}
      </button>
      {txHash && <div>Tx Hash: {txHash}</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};

export default ContractInteraction; 