import React, { createContext, useContext, useEffect, useState } from "react";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mainnet, optimism, arbitrum } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { PXEClient } from "@aztec/pxe/client/lazy";

const { chains, publicClient } = configureChains(
  [mainnet, optimism, arbitrum],
  [alchemyProvider({ apiKey: process.env.REACT_APP_ALCHEMY_API_KEY || "" }), publicProvider()]
);

const wagmiConfig = createConfig({
  autoConnect: false,
  publicClient,
});

// PXE Context
const PXEContext = createContext(null);
export const PXEProviderContext = PXEContext;
export const usePXE = () => useContext(PXEContext);

export const WalletProvider = ({ children }) => {
  const [pxe, setPxe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function initPXE() {
      try {
        const pxeClient = new PXEClient({
          host: "http://localhost:8080",
          adapters: { evm: true, noir: true },
        });
        await pxeClient.initialize();
        setPxe(pxeClient);
      } catch (e) {
        setPxe(null);
      } finally {
        setLoading(false);
      }
    }
    initPXE();
  }, []);

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        chains={chains}
        theme={darkTheme({
          accentColor: "#0F172A",
          accentColorForeground: "white",
          borderRadius: "medium",
        })}
        appInfo={{ appName: "SECTOR8", learnMoreUrl: "#" }}
      >
        <PXEContext.Provider value={{ pxe, loading }}>
          {children}
        </PXEContext.Provider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}; 