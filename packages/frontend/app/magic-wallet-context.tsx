"use client";

import { initializeConnector } from "@web3-react/core";
import { Web3ReactHooks, Web3ReactProvider } from "@web3-react/core";
import React from "react";
import { MagicConnect } from "web3-react-magic";

export const [magicConnect, hooks] = initializeConnector<MagicConnect>(
  (actions) =>
    new MagicConnect({
      actions,

      options: {
        apiKey: process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_API_KEY as string,
        network: {
          rpcUrl: "https://polygon-rpc.com/",
          chainId: 137,
        },
        networkOptions: {
          rpcUrl: "https://polygon-rpc.com/",
          chainId: 137,
        },
      },
    })
);

const connectors: [MagicConnect, Web3ReactHooks][] = [[magicConnect, hooks]];

export const MagicWalletProvider = ({ children }: React.PropsWithChildren) => {
  return (
    <Web3ReactProvider connectors={connectors}>{children}</Web3ReactProvider>
  );
};
