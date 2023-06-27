import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, render } from "@testing-library/react";
import React from "react";

import CampaignGridView from "./campaign-grid-view";

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
