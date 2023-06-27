import { useMutation, useQuery } from "@tanstack/react-query";
import { useWeb3React } from "@web3-react/core";
import { gql } from "graphql-request";
import { toast } from "react-toastify";

import { useGetCampaign } from "../graph/campaigns";
import { graphQLClient } from "../graph/client";
import { useShamanContract } from "./contracts";

interface Signature {
  id: string;
  timestamp: string;
}

export const useCampaignSign = (campaignId: string) => {
  const { data } = useGetCampaign(campaignId);
  const shamanContract = useShamanContract(data?.shamanAddress);
  const { isActive } = useWeb3React();

  return useMutation(["campaign", "sign", campaignId], async () => {
    if (!shamanContract) {
      throw new Error("No shaman contract");
    }

    if (!isActive) {
      throw new Error("No active wallet");
    }

    const tx = await shamanContract.sign();
    const toastId = toast("Signing campaign", {});
    const result = await tx.wait();
    toast.dismiss(toastId);
    toast("Campaign signed", {
      type: "success",
    });
    return result;
  });
};

export const useUserHasSignedCampaign = (campaignId: string) => {
  const { account } = useWeb3React();

  return useQuery(["signatures", campaignId, account], async () => {
    if (!account) {
      return false;
    }
    return graphQLClient
      .request(
        gql`
          query GetSignaturesForCampaign(
            $campaignId: String!
            $address: String!
          ) {
            signatures(where: { campaign: $campaignId, user: $address }) {
              timestamp
              id
            }
          }
        `,
        { campaignId, address: account }
      )
      .then((result) => {
        console.log(result);
        return !!(result as { signatures: Signature[] }).signatures.length;
      });
  });
};
