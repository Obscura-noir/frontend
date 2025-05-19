// Universal config for addresses and ABI of smart contracts of the SECTOR8 platform

import ObscuraPrivacyEngine from "../abi/ObscuraPrivacyEngine.json";
import ObscuraP2PMatchContract from "../abi/ObscuraP2PMatchContract.json";
import ObscuraEscrowContract from "../abi/ObscuraEscrowContract.json";
import ObscuraAgentRegistry from "../abi/ObscuraAgentRegistry.json";

// Example of address structure: chainId => address
// Fill in the actual addresses for each network
export const CONTRACT_ADDRESSES = {
  1: { // Ethereum Mainnet
    ObscuraPrivacyEngine: "0x...",
    ObscuraP2PMatchContract: "0x...",
    ObscuraEscrowContract: "0x...",
    ObscuraAgentRegistry: "0x...",
  },
  5: { // Goerli
    ObscuraPrivacyEngine: "0x...",
    ObscuraP2PMatchContract: "0x...",
    ObscuraEscrowContract: "0x...",
    ObscuraAgentRegistry: "0x...",
  },
  31337: { // Hardhat/localhost
    ObscuraPrivacyEngine: "0x...",
    ObscuraP2PMatchContract: "0x...",
    ObscuraEscrowContract: "0x...",
    ObscuraAgentRegistry: "0x...",
  },
  // Add other chainId as needed
};

export const CONTRACTS = {
  ObscuraPrivacyEngine: {
    abi: ObscuraPrivacyEngine.abi,
    getAddress: (chainId) => CONTRACT_ADDRESSES[chainId]?.ObscuraPrivacyEngine || null,
  },
  ObscuraP2PMatchContract: {
    abi: ObscuraP2PMatchContract.abi,
    getAddress: (chainId) => CONTRACT_ADDRESSES[chainId]?.ObscuraP2PMatchContract || null,
  },
  ObscuraEscrowContract: {
    abi: ObscuraEscrowContract.abi,
    getAddress: (chainId) => CONTRACT_ADDRESSES[chainId]?.ObscuraEscrowContract || null,
  },
  ObscuraAgentRegistry: {
    abi: ObscuraAgentRegistry.abi,
    getAddress: (chainId) => CONTRACT_ADDRESSES[chainId]?.ObscuraAgentRegistry || null,
  },
}; 