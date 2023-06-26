"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import {
  QueryClient as QueryClientDaoHaus,
  QueryClientProvider as QueryClientProviderDauHaus,
} from "react-query";

import { theme } from "../styles/theme";
import { MagicWalletProvider } from "./magic-wallet-context";

const queryClient = new QueryClient();
const queryClientDauHaus = new QueryClientDaoHaus();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <QueryClientProvider client={queryClient}>
        <QueryClientProviderDauHaus client={queryClientDauHaus}>
          <MagicWalletProvider>
            <ChakraProvider
              toastOptions={{ defaultOptions: { position: "top" } }}
              theme={theme}
            >
              {children}
            </ChakraProvider>
          </MagicWalletProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProviderDauHaus>
      </QueryClientProvider>
    </CacheProvider>
  );
}
