import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, render } from "@testing-library/react";
import React from "react";

import CampaignGridView from "./campaign-grid-view";

jest.mock("../../graph/campaigns", () => {
  const campaign = {
    id: "1",
    name: "test",
    description: "test",
    imageUrl: "https://test.com/test.png",
    target: "1",
    treasury: "test",
    votingPeriod: 1,
    gracePeriod: 1,
    baalAddress: "0xdd52DDC9ac38cfabbc2CF9a287814817c259D55C",
    shamanAddress: "0xc4B8ec6b6380EC000663F0659A4fC9AA417dfaeb",
    tokenAddress: "0x5FEcE30aCcd5bc3512BAB2e77EAE7d0C1C57eD45",
    tokenSymbol: "test",
    tokenDecimals: 1,
    total: "1",
    numberOfSigners: 1,
    pricePerUnit: "1",
    tokensPerUnit: "1",
    proposals: [],
    donations: [],
    signatures: [],
  };

  const mockUseGetCampaigns = jest.fn();
  mockUseGetCampaigns.mockReturnValue({
    data: [campaign],
    isLoading: false,
    isError: false,
  });

  return {
    useGetCampaigns: mockUseGetCampaigns,
  };
});

jest.mock("../campaign-tile/campaign-tile", () => () => "{CampaignTile}");

describe("CampaignGridView", () => {
  it("should render successfully", async () => {
    // prepare
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
