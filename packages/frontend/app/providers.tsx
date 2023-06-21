"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";

import { theme } from "../styles/theme";
import { MagicWalletProvider } from "./magic-wallet-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <MagicWalletProvider>
        <ChakraProvider theme={theme}>{children}</ChakraProvider>
      </MagicWalletProvider>
    </CacheProvider>
  );
}
