import { act, render } from "@testing-library/react";

import CampaignSignButton from "./campaign-sign-button";

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

jest.mock("../../hooks/sign", () => {
  const mockUseCampaignSign = jest.fn();
  mockUseCampaignSign.mockReturnValue({});

  const mockUseUserHasSignedCampaign = jest.fn();
  mockUseUserHasSignedCampaign.mockReturnValue({
    data: false,
    refetch: jest.fn(),
  });

  return {
    useCampaignSign: mockUseCampaignSign,
    useUserHasSignedCampaign: mockUseUserHasSignedCampaign,
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

describe("CampaignSignButton", () => {
  it("should render successfully", async () => {
    // act
    await act(async () => {
      const { baseElement } = render(<CampaignSignButton campaignId="" />);

      // assert
      expect(baseElement).toBeTruthy();
    });
  });
});
