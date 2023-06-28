import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, render } from "@testing-library/react";

import { MagicWalletProvider } from "../../app/magic-wallet-context";
import ZipVerificationForm from "./zip-verification-form";

describe("ZipVerificationForm", () => {
  it("should render successfully", async () => {
    // arrange
    const queryClient = new QueryClient();

    // act
    await act(async () => {
      const { baseElement } = render(
        <MagicWalletProvider>
          <QueryClientProvider client={queryClient}>
            <ZipVerificationForm
              campaignId=""
              onSuccessfulVerification={() => {
                return;
              }}
            />
          </QueryClientProvider>
        </MagicWalletProvider>
      );

      // assert
      expect(baseElement).toBeTruthy();
    });
  });
});
