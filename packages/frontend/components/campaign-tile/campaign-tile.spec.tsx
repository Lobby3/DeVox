import { render } from "@testing-library/react";
import React from "react";

import CampaignTile from "./campaign-tile";

describe("CampaignTile", () => {
  it("should render successfully", () => {
    // prepare
    const campaign = {
      id: "1",
      name: "test",
      description: "test",
      imageUrl: "https://test.com/test.png",
      target: "1",
      treasury: "test",
      votingPeriod: 1,
      gracePeriod: 1,
      baalAddress: "0x000",
      shamanAddress: "0x000",
      tokenAddress: "0x000",
      tokenSymbol: "test",
      tokenDecimals: 1,
      total: "1",
      numberOfSigners: 1,
      pricePerUnit: "1",
      tokensPerUnit: "1",
      proposals: [],
      donations: [],
    };

    // act
    const { baseElement } = render(<CampaignTile campaign={campaign} />);

    // assert
    expect(baseElement).toBeTruthy();
  });
});
