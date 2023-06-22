import { useMutation } from "@tanstack/react-query";
import { BigNumber, ethers } from "ethers";
import { toast } from "react-toastify";

import { useBalance } from "./balance";
import { useShamanContract, useTokenContract } from "./contracts";

export const useDonate = () => {
  const shamanContract = useShamanContract();
  const tokenContract = useTokenContract();
  const { decimals } = useBalance();

  return useMutation(
    ["donate"],
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

      const encodedMessage = ethers.utils.toUtf8Bytes(message);
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
        encodedMessage
      );
      toast("Donating...");
      const txHash = await tx.wait();
      toast("Donated!", {
        type: "success",
      });
      return txHash;
    }
  );
};
