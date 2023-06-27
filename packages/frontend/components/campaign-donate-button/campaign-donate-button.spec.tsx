import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, render } from "@testing-library/react";
import React from "react";

import { MagicWalletProvider } from "../../app/magic-wallet-context";
import CampaignDonateButton from "./campaign-donate-button";

describe("CampaignDonateButton", () => {
  it("should render successfully", async () => {
    // prepare
    const queryClient = new QueryClient();

    await act(async () => {
      const { baseElement } = render(
        <MagicWalletProvider>
          <QueryClientProvider client={queryClient}>
            <CampaignDonateButton campaignId="" />
          </QueryClientProvider>
        </MagicWalletProvider>
      );

      // assert
      expect(baseElement).toBeTruthy();
    });
  });
});
