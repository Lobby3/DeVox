import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, render } from "@testing-library/react";
import { MagicWalletProvider } from "packages/frontend/app/magic-wallet-context";

import DonateModal from "./donate-modal";

describe("DonateModal", () => {
  it("should render successfully", async () => {
    // prepare
    const queryClient = new QueryClient();

    await act(async () => {
      // act
      const { baseElement } = render(
        <MagicWalletProvider>
          <QueryClientProvider client={queryClient}>
            <DonateModal campaignId="" isOpen={false} onClose={() => {}} />
          </QueryClientProvider>
        </MagicWalletProvider>
      );

      // assert
      expect(baseElement).toBeTruthy();
    });
  });
});
