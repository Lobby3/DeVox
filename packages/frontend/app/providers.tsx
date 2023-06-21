"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider, ToastProvider } from "@chakra-ui/react";

import { theme } from "../styles/theme";
import { MagicWalletProvider } from "./magic-wallet-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <MagicWalletProvider>
        <ChakraProvider
          toastOptions={{ defaultOptions: { position: "top" } }}
          theme={theme}
        >
          {children}
        </ChakraProvider>
      </MagicWalletProvider>
    </CacheProvider>
  );
}
