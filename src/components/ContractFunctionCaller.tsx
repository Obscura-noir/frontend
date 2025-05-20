"use client";
import React, { useState, useMemo } from "react";
import { CONTRACTS, ContractName } from "../contracts/config";
import { useAccount, useReadContract, useWriteContract, useChainId } from "wagmi";
import { mainnet, goerli, sepolia } from "wagmi/chains";
import { parseEther } from "ethers";

const chains = [mainnet, goerli, sepolia];

export default function ContractFunctionCaller() {
  const [contract, setContract] = useState<ContractName>("ObscuraPrivacyEngine");
  const [fn, setFn] = useState<string>("");
  const [inputs, setInputs] = useState<any[]>([]);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>("");
  const { address: account } = useAccount();
  const chainId = useChainId();
  const chainObj = useMemo(() => chains.find((c) => c.id === chainId), [chainId]);

  // ABI массив
  const abiArr = CONTRACTS[contract].abi.abi;
  const functions = useMemo(() => Array.isArray(abiArr) ? abiArr.filter((item: any) => item.type === "function") : [], [abiArr]);
  const selectedFn = useMemo(() => functions.find((f: any) => f.name === fn), [functions, fn]);

  // Для чтения
  const isRead = selectedFn && (selectedFn.stateMutability === "view" || selectedFn.stateMutability === "pure");
  const args = useMemo(() => inputs.map((v, i) => {
    const input = selectedFn?.inputs[i];
    if (input?.type === "uint256" && v) return parseEther(v);
    return v;
  }), [inputs, selectedFn]);

  const readResult = useReadContract({
    address: CONTRACTS[contract].address as `0x${string}`,
    abi: abiArr,
    functionName: fn || undefined,
    args,
    query: { enabled: Boolean(fn && isRead && account) },
  });

  // Для записи
  const { writeContractAsync, isPending } = useWriteContract();

  const handleWrite = async () => {
    setError("");
    setResult(null);
    try {
      const tx = await writeContractAsync({
        address: CONTRACTS[contract].address as `0x${string}`,
        abi: abiArr,
        functionName: fn,
        args,
        chain: chainObj,
        account,
      });
      setResult(tx);
    } catch (e: any) {
      setError(e?.message || "Ошибка вызова");
    }
  };

  // Показывать результат для чтения реактивно
  React.useEffect(() => {
    if (isRead && readResult.data !== undefined) {
      setResult(readResult.data);
    }
    if (readResult.error) {
      setError(readResult.error.message || "Ошибка вызова");
    }
  }, [readResult.data, readResult.error, isRead]);

  return (
    <div className="card" style={{ maxWidth: 600, margin: "40px auto" }}>
      <h3 style={{ marginBottom: 16 }}>Вызов функции смарт-контракта</h3>
      <div style={{ marginBottom: 12 }}>
        <label className="label">Контракт</label>
        <select className="input" value={contract} onChange={e => { setContract(e.target.value as ContractName); setFn(""); setInputs([]); setResult(null); setError(""); }}>
          {Object.keys(CONTRACTS).map(name => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>
      </div>
      <div style={{ marginBottom: 12 }}>
        <label className="label">Функция</label>
        <select className="input" value={fn} onChange={e => { setFn(e.target.value); setInputs([]); setResult(null); setError(""); }}>
          <option value="">Выберите функцию</option>
          {functions.map((f: any) => (
            <option key={f.name} value={f.name}>{f.name} ({f.stateMutability})</option>
          ))}
        </select>
      </div>
      {selectedFn && selectedFn.inputs.length > 0 && (
        <div style={{ marginBottom: 12 }}>
          <label className="label">Параметры</label>
          {selectedFn.inputs.map((input: any, i: number) => (
            <input
              key={i}
              className="input"
              placeholder={`${input.name || "arg" + i} (${input.type})`}
              value={inputs[i] || ""}
              onChange={e => {
                const arr = [...inputs];
                arr[i] = e.target.value;
                setInputs(arr);
              }}
            />
          ))}
        </div>
      )}
      {isRead ? (
        <button className="button" style={{ width: 180 }} disabled>
          Только чтение
        </button>
      ) : (
        <button className="button" style={{ width: 180 }} onClick={handleWrite} disabled={!fn || !account || isPending}>
          Вызвать функцию
        </button>
      )}
      {result !== null && (
        <div style={{ marginTop: 16, color: "#2ecc71" }}>
          <b>Результат:</b> {typeof result === "object" ? JSON.stringify(result) : String(result)}
        </div>
      )}
      {error && (
        <div style={{ marginTop: 16, color: "#e74c3c" }}>
          <b>Ошибка:</b> {error}
        </div>
      )}
    </div>
  );
} 