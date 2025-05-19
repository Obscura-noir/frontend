// Универсальный конфиг для адресов и ABI смарт-контрактов платформы SECTOR8

import ObscuraPrivacyEngine from "../abi/ObscuraPrivacyEngine.json";
import ObscuraP2PMatchContract from "../abi/ObscuraP2PMatchContract.json";
import ObscuraEscrowContract from "../abi/ObscuraEscrowContract.json";
import ObscuraAgentRegistry from "../abi/ObscuraAgentRegistry.json";

export const CONTRACTS = {
  USDT_BRIDGE: {
    address: "0xYourUSDTBridgeAddress", // замените на реальный адрес
    abi: [
      // Пример ABI для функции shield
      {
        "inputs": [
          { "internalType": "uint256", "name": "amount", "type": "uint256" }
        ],
        "name": "shield",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ]
  },
  OBSCURA_PRIVACY_ENGINE: {
    address: "0xYourPrivacyEngineAddress", // замените на реальный адрес
    abi: ObscuraPrivacyEngine.abi
  },
  OBSCURA_P2P_MATCH: {
    address: "0xYourP2PMatchAddress", // замените на реальный адрес
    abi: ObscuraP2PMatchContract.abi
  },
  OBSCURA_ESCROW: {
    address: "0xYourEscrowAddress", // замените на реальный адрес
    abi: ObscuraEscrowContract.abi
  },
  OBSCURA_AGENT_REGISTRY: {
    address: "0xYourAgentRegistryAddress", // замените на реальный адрес
    abi: ObscuraAgentRegistry.abi
  },
  // Добавляйте новые контракты по мере необходимости
}; 