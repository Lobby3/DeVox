import { useMutation } from "@tanstack/react-query";
import { ethers } from "ethers";
import { JSEncrypt } from "jsencrypt";
import { toast } from "react-toastify";

import { useGetCampaign } from "../graph/campaigns";
import { useShamanContract } from "./contracts";

export const useShamanWhitelist = (campaignId: string) => {
  const { data } = useGetCampaign(campaignId);
  const shamanContract = useShamanContract(data?.shamanAddress);

  return useMutation(
    ["shaman-whitelist"],
    async ({
      status,
      zipCode,
      share,
    }: {
      status: boolean;
      zipCode: string;
      share: boolean;
    }) => {
      if (!shamanContract) {
        throw new Error("No contract");
      }

      let zipCodeString = "";

      if (share) {
        // Encrypt zip code
        const encrypt = new JSEncrypt();
        const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;

        if (!publicKey) {
          throw new Error("No public key");
        }

        encrypt.setPublicKey(publicKey);

        const result = encrypt.encrypt(zipCode);

        if (!result) {
          throw new Error("Could not encrypt zip code");
        }

        zipCodeString = result;
      }

      // Encode for contract call
      const encodedZipCode = ethers.utils.toUtf8Bytes(zipCodeString);

      const tx = await shamanContract.whitelist(status, encodedZipCode);
      const toastId = toast("Updating ZIP Code...", {});
      const result = await tx.wait();
      toast.dismiss(toastId);
      toast("ZIP Code updated!", {
        type: "success",
      });
      return result;
    }
  );
};
