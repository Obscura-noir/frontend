import React, { useState } from "react";
import { useAccount, useWriteContract } from "wagmi";
import { USDT_BRIDGE_ADDRESS, USDT_BRIDGE_ABI } from "../contracts/sector8";

export default function ShieldButton() {
  const [amount, setAmount] = useState(0);
  const { address } = useAccount();
  const { writeContract, isPending, isSuccess, error } = useWriteContract();

  const handleShield = () => {
    if (!amount || amount <= 0) return;
    writeContract({
      address: USDT_BRIDGE_ADDRESS,
      abi: USDT_BRIDGE_ABI,
      functionName: "shield",
      args: [BigInt(amount)],
    });
  };

  return (
    <div>
      <input
        type="number"
        min="1"
        placeholder="Amount (USDT)"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        style={{ marginRight: 8 }}
      />
      <button onClick={handleShield} disabled={isPending}>
        {isPending ? "Shielding..." : "Shield USDT"}
      </button>
      {isSuccess && <div>Success!</div>}
      {error && <div style={{ color: "red" }}>{error.message}</div>}
    </div>
  );
} 