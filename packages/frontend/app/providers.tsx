"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";

import { theme } from "../styles/theme";
import { MagicWalletProvider } from "./magic-wallet-context";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <QueryClientProvider client={queryClient}>
        <MagicWalletProvider>
          <ChakraProvider
            toastOptions={{ defaultOptions: { position: "top" } }}
            theme={theme}
          >
            {children}
          </ChakraProvider>
        </MagicWalletProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </CacheProvider>
  );
}
