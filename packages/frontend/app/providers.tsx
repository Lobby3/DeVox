"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { HausConnectProvider } from "@daohaus/daohaus-connect-feature";
import { HausThemeProvider } from "@daohaus/ui";

import { theme } from "../styles/theme";
import { MagicWalletProvider } from "./magic-wallet-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HausThemeProvider>
      <HausConnectProvider>
        <CacheProvider>
          <MagicWalletProvider>
            <ChakraProvider theme={theme}>{children}</ChakraProvider>
          </MagicWalletProvider>
        </CacheProvider>
      </HausConnectProvider>
    </HausThemeProvider>
  );
}
