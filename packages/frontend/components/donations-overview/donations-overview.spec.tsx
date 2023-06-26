import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";

import DonationsOverview from "./donations-overview";

describe("DonationsOverview", () => {
  it("should render successfully", () => {
    // arrange
    const queryClient = new QueryClient();

    // act
    const { baseElement } = render(
      <QueryClientProvider client={queryClient}>
        <DonationsOverview campaignId="" />
      </QueryClientProvider>
    );

    // assert
    expect(baseElement).toBeTruthy();
  });
});
