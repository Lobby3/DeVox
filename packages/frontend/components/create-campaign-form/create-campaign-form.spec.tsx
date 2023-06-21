import { act, render } from "@testing-library/react";
import React from "react";

import { MagicWalletProvider } from "../../app/magic-wallet-context";
import CreateCampaignForm from "./create-campaign-form";

describe("CreateCampaignForm", () => {
  it("should render successfully", async () => {
    await act(async () => {
      // act
      const { baseElement } = render(
        <MagicWalletProvider>
          <CreateCampaignForm />
        </MagicWalletProvider>
      );

      // assert
      expect(baseElement).toBeTruthy();
    });
  });
});
