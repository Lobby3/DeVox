import { useMutation } from "@tanstack/react-query";
import { parseUnits } from "ethers/lib/utils";
import { toast } from "react-toastify";

import { useGetCampaign } from "../graph/campaigns";
import { useShamanContract, useTokenContract } from "./contracts";
import { useTokenInfo } from "./token";

export const useDonate = (campaignId: string) => {
  const { data } = useGetCampaign(campaignId);
  const shamanContract = useShamanContract(data?.shamanAddress);
  const tokenContract = useTokenContract(data?.tokenAddress);
  const { decimals } = useTokenInfo(data?.tokenAddress);

  return useMutation(
    ["donate", campaignId],
    async ({
      amountInToken,
      message,
    }: {
      amountInToken: number;
      message: string;
    }) => {
      if (!shamanContract || !tokenContract) {
        throw new Error("No contract");
      }

      const amountInTokenWithDecimals = parseUnits(
        amountInToken.toString(),
        decimals
      );
      const approveToast = toast("Approving...");
      const approveTx = await tokenContract.approve(
        shamanContract.address,
        amountInTokenWithDecimals
      );
      await approveTx.wait();
      toast.dismiss(approveToast);
      toast("Approved!", {
        type: "success",
      });

      const donateToastId = toast("Donating...");
      const tx = await shamanContract.donate(
        amountInTokenWithDecimals,
        message
      );
      const txHash = await tx.wait();
      toast.dismiss(donateToastId);
      toast("Donated!", {
        type: "success",
      });
      return txHash;
    },
    {}
  );
};
