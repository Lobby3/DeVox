import { useMutation } from "@tanstack/react-query";
import { useWeb3React } from "@web3-react/core";
import { Contract, ethers } from "ethers";
import { JSEncrypt } from "jsencrypt";

const shamanContractJson = require("../contract-types/IShaman.json");

export const useShamanContract = (summonerId: number) => {
  const abi = shamanContractJson.abi;
  const {
    hooks: { usePriorityProvider },
  } = useWeb3React();

  const provider = usePriorityProvider();

  if (!provider) {
    return null;
  }

  const contract = new Contract(
    "0xc06ede2b86515956821e9ef731ba05a29634c431",
    abi,
    provider.getSigner()
  );

  return contract;
};

export const useShamanWhitelist = () => {
  const shamanContract = useShamanContract(0);

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
      return await tx.wait();
    }
  );
};
