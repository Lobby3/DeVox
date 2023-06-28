import { useMutation } from "@tanstack/react-query";
import { parseUnits } from "ethers/lib/utils";
import { toast } from "react-toastify";

import { useGetCampaign } from "../graph/campaigns";
import { useGetDonationsForUser } from "../graph/donations";
import { useShamanContract, useTokenContract } from "./contracts";
import { useUserHasSignedCampaign } from "./sign";
import { useTokenInfo } from "./token";

export const useDonate = (campaignId: string) => {
  const { data } = useGetCampaign(campaignId);
  const shamanContract = useShamanContract(data?.shamanAddress);
  const tokenContract = useTokenContract(data?.tokenAddress);
  const { decimals } = useTokenInfo(data?.tokenAddress);

  const { refetch: refetchUserSignatures } =
    useUserHasSignedCampaign(campaignId);
  const { refetch: refetchUserDonations } = useGetDonationsForUser(campaignId);

  const refetchAfterDonate = async () => {
    await Promise.all([refetchUserSignatures(), refetchUserDonations()]);
  };

  return useMutation(
    ["donate", campaignId],
    async ({
      amountInToken,
      message,
      signCampaign,
    }: {
      amountInToken: number;
      message: string;
      signCampaign: boolean;
    }) => {
      if (!shamanContract || !tokenContract) {
        throw new Error("No contract");
      }

      const amountInTokenWithDecimals = parseUnits(
        amountInToken.toString(),
        decimals
      );
      const approveTx = await tokenContract.approve(
        shamanContract.address,
        amountInTokenWithDecimals
      );
      const approveToast = toast("Approving...");
      await approveTx.wait();
      toast.dismiss(approveToast);
      toast("Approved!", {
        type: "success",
      });

      const tx = await shamanContract.donate(
        amountInTokenWithDecimals,
        signCampaign,
        message
      );
      const donateToastId = toast("Donating...");
      const txHash = await tx.wait();
      toast.dismiss(donateToastId);
      toast("Donated!", {
        type: "success",
      });
      setTimeout(async () => {
        await refetchAfterDonate();
      }, 5000);
      return txHash;
    },
    {}
  );
};
