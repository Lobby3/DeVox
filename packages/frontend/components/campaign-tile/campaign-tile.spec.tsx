import { render } from "@testing-library/react";
import React from "react";

import CampaignTile from "./campaign-tile";

jest.mock("../../graph/campaigns", () => {
  const mockUseDaoInfo = jest.fn();
  mockUseDaoInfo.mockReturnValue({
    dao: { name: "", description: "", avatarImg: "" },
  });
  const mockUseGetCampaign = jest.fn();
  mockUseGetCampaign.mockReturnValue({
    data: { tokenAddress: "" },
    isFetched: true,
  });
  return { useGetCampaign: mockUseGetCampaign, useDaoInfo: mockUseDaoInfo };
});

jest.mock("@web3-react/core", () => {
  return {
    useWeb3React: () => {
      return {
        account: "",
        isActive: true,
      };
    },
  };
});

describe("CampaignTile", () => {
  const env = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...env };
  });

  afterEach(() => {
    process.env = env;
  });

  it("should render successfully", () => {
    // prepare
    process.env.NEXT_PUBLIC_NETWORK_NAME = "polygon";

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

    // act
    const { baseElement } = render(<CampaignTile campaign={campaign} />);

    // assert
    expect(baseElement).toBeTruthy();
  });
});
