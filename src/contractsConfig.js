// Универсальный конфиг для адресов и ABI смарт-контрактов SECTOR8
// Импортируем ABI из src/abi
import ObscuraPrivacyEngine from './abi/ObscuraPrivacyEngine.json';
import ObscuraP2PMatchContract from './abi/ObscuraP2PMatchContract.json';
import ObscuraEscrowContract from './abi/ObscuraEscrowContract.json';
import ObscuraAgentRegistry from './abi/ObscuraAgentRegistry.json';

// Пример адресов для разных сетей (замените на реальные)
const CONTRACT_ADDRESSES = {
  1: { // Ethereum Mainnet
    ObscuraPrivacyEngine: '0x0000000000000000000000000000000000000001',
    ObscuraP2PMatchContract: '0x0000000000000000000000000000000000000002',
    ObscuraEscrowContract: '0x0000000000000000000000000000000000000003',
    ObscuraAgentRegistry: '0x0000000000000000000000000000000000000004',
  },
  5: { // Goerli
    ObscuraPrivacyEngine: '0x0000000000000000000000000000000000000011',
    ObscuraP2PMatchContract: '0x0000000000000000000000000000000000000012',
    ObscuraEscrowContract: '0x0000000000000000000000000000000000000013',
    ObscuraAgentRegistry: '0x0000000000000000000000000000000000000014',
  },
  // Добавьте другие chainId и адреса по необходимости
};

export const CONTRACTS = {
  ObscuraPrivacyEngine: {
    abi: ObscuraPrivacyEngine.abi,
    getAddress: (chainId) => CONTRACT_ADDRESSES[chainId]?.ObscuraPrivacyEngine,
  },
  ObscuraP2PMatchContract: {
    abi: ObscuraP2PMatchContract.abi,
    getAddress: (chainId) => CONTRACT_ADDRESSES[chainId]?.ObscuraP2PMatchContract,
  },
  ObscuraEscrowContract: {
    abi: ObscuraEscrowContract.abi,
    getAddress: (chainId) => CONTRACT_ADDRESSES[chainId]?.ObscuraEscrowContract,
  },
  ObscuraAgentRegistry: {
    abi: ObscuraAgentRegistry.abi,
    getAddress: (chainId) => CONTRACT_ADDRESSES[chainId]?.ObscuraAgentRegistry,
  },
};

export { CONTRACT_ADDRESSES }; 