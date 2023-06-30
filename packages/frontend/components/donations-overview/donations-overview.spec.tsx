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

jest.mock("../../graph/donations", () => {
  const mockUseGetDonationsForCampaign = jest.fn();
  mockUseGetDonationsForCampaign.mockReturnValue({
    data: [],
    isLoading: false,
    isError: false,
  });
  return { useGetDonationsForCampaign: mockUseGetDonationsForCampaign };
});

jest.mock("../../hooks/token", () => {
  const mockUseTokenInfo = jest.fn();
  mockUseTokenInfo.mockReturnValue({
    decimals: 18,
  });

  return {
    useTokenInfo: mockUseTokenInfo,
  };
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
    // act
    const { baseElement } = render(<DonationsOverview campaignId="" />);

    // assert
    expect(baseElement).toBeTruthy();
  });
});
