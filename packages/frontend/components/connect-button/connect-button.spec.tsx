import { act, render } from "@testing-library/react";
import React from "react";

import { MagicWalletProvider } from "../../app/magic-wallet-context";
import ConnectButton from "./connect-button";

describe("ConnectButton", () => {
  it("should render successfully", async () => {
    await act(async () => {
      // act
      const { baseElement } = render(
        <MagicWalletProvider>
          <ConnectButton />
        </MagicWalletProvider>
      );

      // assert
      expect(baseElement).toBeTruthy();
    });
  });
});
