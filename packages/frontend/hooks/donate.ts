import { useMutation } from "@tanstack/react-query";
import { BigNumber } from "ethers";
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

      const amountInTokenWithDecimals = BigNumber.from(
        amountInToken * 10 ** decimals
      );
      const approveTx = await tokenContract.approve(
        shamanContract.address,
        amountInTokenWithDecimals
      );
      await approveTx.wait();

      const tx = await shamanContract.donate(
        amountInTokenWithDecimals,
        message
      );
      toast("Donating...");
      const txHash = await tx.wait();
      toast("Donated!", {
        type: "success",
      });
      return txHash;
    },
    {}
  );
};
