"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";

import { MagicWalletProvider } from "./magic-wallet-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <MagicWalletProvider>
        <ChakraProvider>{children}</ChakraProvider>
      </MagicWalletProvider>
    </CacheProvider>
  );
}
