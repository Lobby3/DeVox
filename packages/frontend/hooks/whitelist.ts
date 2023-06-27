import { useMutation, useQuery } from "@tanstack/react-query";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { gql } from "graphql-request";
import { JSEncrypt } from "jsencrypt";
import { toast } from "react-toastify";

import { graphQLClient } from "../graph/client";
import { useUserRegistryContract } from "./contracts";

export const useShamanWhitelist = () => {
  const userRegistryContract = useUserRegistryContract();
  const { account } = useWeb3React();
  return useMutation(
    ["user-registry", "save-user"],
    async ({ zipCode, share }: { zipCode: string; share: boolean }) => {
      if (!userRegistryContract) {
        throw new Error("No contract");
      }

      if (!account) {
        throw new Error("No user connected");
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

      const tx = await userRegistryContract.saveUser(account, encodedZipCode);
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

export const useUserHasVerifiedZipCode = () => {
  const { account } = useWeb3React();
  return useQuery(["user-registry", "get-user", account], async () => {
    if (!account) {
      return false;
    }

    return graphQLClient
      .request(
        gql`
          query GetUser($address: String!) {
            user(id: $address) {
              id
            }
          }
        `,
        { address: account }
      )
      .then((result) => {
        return !!(result as { user: { id: string } }).user;
      });
  });
};
