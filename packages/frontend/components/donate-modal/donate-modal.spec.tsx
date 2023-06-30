import { act, render } from "@testing-library/react";

import DonateModal from "./donate-modal";

jest.mock("../../graph/campaigns", () => {
  const mockUseGetCampaign = jest.fn();
  mockUseGetCampaign.mockReturnValue({
    data: { tokenAddress: "" },
    isFetched: true,
  });
  return { useGetCampaign: mockUseGetCampaign };
});

jest.mock("../../hooks/balance", () => {
  const mockUseBalance = jest.fn();
  mockUseBalance.mockReturnValue({
    formattedBalance: "$234.56",
  });
  return { useBalance: mockUseBalance };
});

jest.mock("../../hooks/donate", () => {
  const mockUseDonate = jest.fn();
  return { useDonate: mockUseDonate };
});

jest.mock("../../hooks/sign", () => {
  const mockUseUserHasSignedCampaign = jest.fn();
  mockUseUserHasSignedCampaign.mockReturnValue({
    data: false,
  });

  return {
    useUserHasSignedCampaign: mockUseUserHasSignedCampaign,
  };
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

jest.mock("../../hooks/whitelist", () => {
  const mockUseUserHasVerifiedZipCode = jest.fn();
  mockUseUserHasVerifiedZipCode.mockReturnValue({
    data: true,
  });

  return {
    useUserHasVerifiedZipCode: mockUseUserHasVerifiedZipCode,
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

describe("DonateModal", () => {
  it("should render successfully", async () => {
    await act(async () => {
      // act
      const { baseElement } = render(
        <DonateModal
          campaignId=""
          isOpen={false}
          onClose={() => {
            return;
          }}
        />
      );

      // assert
      expect(baseElement).toBeTruthy();
    });
  });
});
