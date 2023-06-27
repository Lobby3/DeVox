import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, render } from "@testing-library/react";
import React from "react";

import CampaignGridView from "./campaign-grid-view";

describe("CampaignGridView", () => {
  it("should render successfully", async () => {
    // prepare
    const campaigns = [
      {
        id: "1",
        name: "test",
        description: "test",
        imageUrl: "https://test.com/test.png",
        target: 1,
        treasury: "test",
        votingPeriod: 1,
        gracePeriod: 1,
        baalAddress: "0x000",
        shamanAddress: "0x000",
        tokenAddress: "0x000",
        tokenSymbol: "test",
        tokenDecimals: 1,
        total: 1,
        numberOfSigners: 1,
      },
    ];

    const queryClient = new QueryClient();

    // act
    await act(async () => {
      const { baseElement } = render(
        <QueryClientProvider client={queryClient}>
          <CampaignGridView />
        </QueryClientProvider>
      );

      // assert
      expect(baseElement).toBeTruthy();
    });
  });
});
