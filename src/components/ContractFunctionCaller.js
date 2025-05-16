import React, { useState } from "react";
import { CONTRACTS } from "../contracts/sector8";
import { useContract } from "../hooks/useContract";

function getFunctionsFromAbi(abi) {
  return abi.filter(item => item.type === "function");
}

export const ContractFunctionCaller = () => {
  const [selectedContract, setSelectedContract] = useState(Object.keys(CONTRACTS)[0]);
  const { address, abi } = CONTRACTS[selectedContract];
  const { contract } = useContract(address, abi);
  const functions = getFunctionsFromAbi(abi);
  const [selectedFunction, setSelectedFunction] = useState(functions[0]?.name || "");
  const [params, setParams] = useState([]);
  const [txHash, setTxHash] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleContractChange = e => {
    setSelectedContract(e.target.value);
    const newAbi = CONTRACTS[e.target.value].abi;
    const newFunctions = getFunctionsFromAbi(newAbi);
    setSelectedFunction(newFunctions[0]?.name || "");
    setParams([]);
    setTxHash("");
    setError("");
  };

  const handleFunctionChange = e => {
    setSelectedFunction(e.target.value);
    setParams([]);
    setTxHash("");
    setError("");
  };

  const func = functions.find(f => f.name === selectedFunction);

  const handleParamChange = (i, value) => {
    const newParams = [...params];
    newParams[i] = value;
    setParams(newParams);
  };

  const handleCall = async () => {
    if (!contract || !func) return;
    setLoading(true);
    setError("");
    setTxHash("");
    try {
      const tx = await contract[selectedFunction](...params);
      if (tx.wait) await tx.wait();
      setTxHash(tx.hash || JSON.stringify(tx));
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contract-function-caller">
      <h3>Вызов функции контракта</h3>
      <select value={selectedContract} onChange={handleContractChange}>
        {Object.keys(CONTRACTS).map(key => (
          <option key={key} value={key}>{key}</option>
        ))}
      </select>
      {functions.length === 0 && <div style={{ color: 'gray' }}>ABI не найден или пуст</div>}
      {functions.length > 0 && (
        <>
          <select value={selectedFunction} onChange={handleFunctionChange}>
            {functions.map(f => (
              <option key={f.name} value={f.name}>{f.name}</option>
            ))}
          </select>
          {func && func.inputs.map((input, i) => (
            <input
              key={i}
              type="text"
              placeholder={`${input.name} (${input.type})`}
              value={params[i] || ""}
              onChange={e => handleParamChange(i, e.target.value)}
              disabled={!contract}
            />
          ))}
          <button onClick={handleCall} disabled={loading || !contract}>
            {loading ? "Выполняется..." : "Вызвать"}
          </button>
        </>
      )}
      {txHash && <div>Tx Hash: {txHash}</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};

export default ContractFunctionCaller; 