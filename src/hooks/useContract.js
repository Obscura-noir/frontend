import { useSigner } from "wagmi";
import { ethers } from "ethers";
import { useMemo } from "react";

export function useContract(address, abi) {
  const { data: signer } = useSigner();
  const contract = useMemo(() => {
    if (!signer) return null;
    return new ethers.Contract(address, abi, signer);
  }, [address, abi, signer]);
  return { contract };
} 