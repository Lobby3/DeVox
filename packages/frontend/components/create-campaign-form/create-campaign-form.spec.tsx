import { act, render } from "@testing-library/react";
import React from "react";

import CreateCampaignForm from "./create-campaign-form";

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

describe("CreateCampaignForm", () => {
  it("should render successfully", async () => {
    await act(async () => {
      // act
      const { baseElement } = render(<CreateCampaignForm />);

      // assert
      expect(baseElement).toBeTruthy();
    });
  });
});
