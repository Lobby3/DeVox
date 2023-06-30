import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, render } from "@testing-library/react";

import { MagicWalletProvider } from "../../app/magic-wallet-context";
import DonateModal from "./donate-modal";

jest.mock("../../graph/campaigns", () => {
  const mockUseGetCampaign = jest.fn();
  mockUseGetCampaign.mockReturnValue({
    data: { tokenAddress: "" },
    isFetched: true,
  });
  return { useGetCampaign: mockUseGetCampaign };
});

describe("DonateModal", () => {
  it("should render successfully", async () => {
    // prepare
    const queryClient = new QueryClient();

    await act(async () => {
      // act
      const { baseElement } = render(
        <MagicWalletProvider>
          <QueryClientProvider client={queryClient}>
            <DonateModal
              campaignId=""
              isOpen={false}
              onClose={() => {
                return;
              }}
            />
          </QueryClientProvider>
        </MagicWalletProvider>
      );

      // assert
      expect(baseElement).toBeTruthy();
    });
  });
});
