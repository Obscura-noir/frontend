import ObscuraPrivacyEngine from "../abi/ObscuraPrivacyEngine.json";
import ObscuraP2PMatchContract from "../abi/ObscuraP2PMatchContract.json";
import ObscuraEscrowContract from "../abi/ObscuraEscrowContract.json";
import ObscuraAgentRegistry from "../abi/ObscuraAgentRegistry.json";

export const CONTRACTS = {
  ObscuraPrivacyEngine: {
    address: "0x0000000000000000000000000000000000000001", // заменить на реальный адрес
    abi: ObscuraPrivacyEngine,
  },
  ObscuraP2PMatchContract: {
    address: "0x0000000000000000000000000000000000000002", // заменить на реальный адрес
    abi: ObscuraP2PMatchContract,
  },
  ObscuraEscrowContract: {
    address: "0x0000000000000000000000000000000000000003", // заменить на реальный адрес
    abi: ObscuraEscrowContract,
  },
  ObscuraAgentRegistry: {
    address: "0x0000000000000000000000000000000000000004", // заменить на реальный адрес
    abi: ObscuraAgentRegistry,
  },
};

export type ContractName = keyof typeof CONTRACTS; 