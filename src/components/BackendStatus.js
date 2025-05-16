import React, { useEffect, useState } from "react";
import torAxios from "../utils/torAxios";

export const BackendStatus = () => {
  const [status, setStatus] = useState("pending");

  useEffect(() => {
    let cancelled = false;
    async function checkBackend() {
      setStatus("pending");
      try {
        await torAxios.get("/status"); // предполагается, что backend отдаёт 200 OK
        if (!cancelled) setStatus("ok");
      } catch {
        if (!cancelled) setStatus("fail");
      }
    }
    checkBackend();
    return () => { cancelled = true; };
  }, []);

  return (
    <span style={{ marginLeft: 12 }}>
      Backend: {status === "pending" ? "⏳" : status === "ok" ? "🟢" : "🔴"}
    </span>
  );
};

export default BackendStatus; 