import { act, render } from "@testing-library/react";
import React from "react";

import CampaignDonateButton from "./campaign-donate-button";

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

jest.mock("../../graph/donations", () => {
  const mockUseGetDonationsForUser = jest.fn();
  mockUseGetDonationsForUser.mockReturnValue({
    data: [],
    isLoading: false,
    isError: false,
  });
  return { useGetDonationsForUser: mockUseGetDonationsForUser };
});

describe("CampaignDonateButton", () => {
  it("should render successfully", async () => {
    await act(async () => {
      const { baseElement } = render(<CampaignDonateButton campaignId="" />);

      // assert
      expect(baseElement).toBeTruthy();
    });
  });
});
