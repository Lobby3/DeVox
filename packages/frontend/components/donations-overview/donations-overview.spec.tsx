import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";

import DonationsOverview from "./donations-overview";

jest.mock("../../graph/campaigns", () => {
  const mockUseGetCampaign = jest.fn();
  mockUseGetCampaign.mockReturnValue({
    data: { tokenAddress: "" },
    isFetched: true,
  });
  return { useGetCampaign: mockUseGetCampaign };
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
