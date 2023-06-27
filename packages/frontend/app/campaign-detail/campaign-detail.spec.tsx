import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";

import CampaignDetail from "./campaign-detail";

describe("CampaignDetail", () => {
  it("should render successfully", () => {
    // arrange
    const queryClient = new QueryClient();

    // act
    const { baseElement } = render(
      <QueryClientProvider client={queryClient}>
        <CampaignDetail campaignId="" />
      </QueryClientProvider>
    );

    // assert
    expect(baseElement).toBeTruthy();
  });
});
