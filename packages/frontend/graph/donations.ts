import { useQuery } from "@tanstack/react-query";
import { useWeb3React } from "@web3-react/core";
import { gql } from "graphql-request";

import { graphQLClient } from "./client";

interface Donation {
  id: string;
  amount: string;
  timestamp: string;
  shares: string;
  loot: string;
  message: {
    text: string;
  };
}

export const useGetDonationsForUser = (
  campaignId: string,
  userAddress?: string
) => {
  const { account } = useWeb3React();

  const address = userAddress || account;

  return useQuery(["donations", campaignId, address], async () => {
    if (!address) {
      return [];
    }
    return graphQLClient
      .request(
        gql`
          query GetDonations($campaignId: String!, $address: String!) {
            donations(
              where: { campaign: $campaignId, user: $address }
              orderBy: timestamp
              orderDirection: desc
            ) {
              id
              amount
              timestamp
              shares
              loot
              message {
                text
              }
            }
          }
        `,
        { campaignId, address }
      )
      .then((result) => {
        return (result as { donations: Donation[] }).donations;
      });
  });
};
