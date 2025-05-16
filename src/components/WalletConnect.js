import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export const WalletConnectButton = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => (
        <div
          {...(!mounted && {
            "aria-hidden": true,
            style: {
              opacity: 0,
              pointerEvents: "none",
              userSelect: "none",
            },
          })}
        >
          {(() => {
            if (!mounted || !account || !chain) {
              return (
                <button
                  onClick={openConnectModal}
                  className="wallet-connect-button"
                  type="button"
                >
                  Подключить кошелек
                </button>
              );
            }
            return (
              <div className="wallet-status">
                <button
                  onClick={openChainModal}
                  className="chain-button"
                  type="button"
                >
                  {chain.name}
                </button>
                <button
                  onClick={openAccountModal}
                  className="account-button"
                  type="button"
                >
                  {account.displayName}
                </button>
              </div>
            );
          })()}
        </div>
      )}
    </ConnectButton.Custom>
  );
};

export default WalletConnectButton; 