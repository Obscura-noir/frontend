import React, { useState } from "react";
import { usePXE } from "./WalletProvider";

export const PXEPrivateNote = () => {
  const { pxe, loading } = usePXE();
  const [value, setValue] = useState(0);
  const [owner, setOwner] = useState("");
  const [noteCommitment, setNoteCommitment] = useState("");
  const [proof, setProof] = useState(null);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");

  const handleCreateNote = async () => {
    setError("");
    setStatus("Создание ноты...");
    setNoteCommitment("");
    setProof(null);
    if (!pxe) {
      setError("PXE не инициализирован");
      return;
    }
    try {
      // Импорт Note из PXE SDK (или используйте свой)
      const { Note } = await import("@aztec/note-manager");
      const note = new Note({
        value: Number(value),
        owner,
        customData: {
          timestamp: Date.now(),
          status: "active",
        },
      });
      await pxe.notes.create(note);
      setNoteCommitment(note.commitment);
      setStatus("Нота создана. Генерация доказательства...");
      // Генерация ZK-доказательства (демо, можно усложнить)
      const circuit = "private_note"; // пример, замените на реальный circuit
      const compiledCircuit = await pxe.noir.getCompiledCircuit(circuit);
      const zkProof = await pxe.noir.generateProof(compiledCircuit, { value: Number(value), owner });
      setProof(zkProof);
      setStatus("Доказательство сгенерировано!");
    } catch (e) {
      setError(e.message);
      setStatus("");
    }
  };

  return (
    <div className="pxe-private-note">
      <h3>Создать приватную ноту (PXE)</h3>
      {loading && <div>PXE инициализируется...</div>}
      <input
        type="number"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Value"
        min={0}
        disabled={loading}
      />
      <input
        type="text"
        value={owner}
        onChange={e => setOwner(e.target.value)}
        placeholder="Owner (адрес)"
        disabled={loading}
      />
      <button onClick={handleCreateNote} disabled={loading || !value || !owner}>
        Создать ноту и доказательство
      </button>
      {status && <div>{status}</div>}
      {noteCommitment && <div>Commitment: <code>{noteCommitment}</code></div>}
      {proof && <div style={{ wordBreak: 'break-all' }}><b>Proof:</b> <code>{JSON.stringify(proof)}</code></div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default PXEPrivateNote; 