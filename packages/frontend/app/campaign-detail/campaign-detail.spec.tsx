import { act, render } from "@testing-library/react";

import CampaignDetail from "./campaign-detail";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

jest.mock("../../graph/campaigns", () => {
  const mockUseDaoInfo = jest.fn();
  mockUseDaoInfo.mockReturnValue({
    dao: { name: "", description: "", avatarImg: "" },
    isLoading: false,
  });

  const mockUseGetCampaign = jest.fn();
  mockUseGetCampaign.mockReturnValue({
    data: { tokenAddress: "", signatures: [] },
    isLoading: false,
    isError: false,
  });

  return {
    useDaoInfo: mockUseDaoInfo,
    useGetCampaign: mockUseGetCampaign,
  };
});

jest.mock(
  "../../components/campaign-donate-button/campaign-donate-button",
  () => () => "{CampaignDonateButton}"
);

jest.mock(
  "../../components/campaign-sign-button/campaign-sign-button",
  () => () => "{CampaignSignButton}"
);

jest.mock(
  "../../components/donate-modal/donate-modal",
  () => () => "{DonateModal}"
);

jest.mock(
  "../../components/donations-overview/donations-overview",
  () => () => "{DonationsOverview}"
);

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

describe("CampaignDetail", () => {
  it("should render successfully", async () => {
    // act
    await act(async () => {
      const { baseElement } = render(<CampaignDetail campaignId="" />);

      // assert
      expect(baseElement).toBeTruthy();
    });
  });
});
