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
  user: {
    id: string;
  };
}

const donationFragment = gql`
  fragment DonationFragment on Donation {
    id
    amount
    timestamp
    shares
    loot
    message {
      text
    }
    user {
      id
    }
  }
`;

//
// export const useUserHasVerifiedZipCode = (userAddress?: string) => {
//   const { account } = useWeb3React();
//
//   const address = userAddress || account;
//
//   return useQuery(["zipCode", address], async () => {
//     if (!address) {
//       return false;
//     }
//     const result = await graphQLClient.request(
//       gql`;
//         query GetUser($address: String!) {
//           user(id: $address) {
//             zipCode
//           }
//         }
//       `,
//       { address }
//     );
//     return (result as { user: { zipCode: string } }).user.zipCode !== null;
//   });
// };

export const useGetDonationsForCampaign = (campaignId: string) => {
  return useQuery(["donations", campaignId], async () => {
    return graphQLClient
      .request(
        gql`
          ${donationFragment}
          query GetDonations($campaignId: String!) {
            donations(
              where: { campaign: $campaignId }
              orderBy: timestamp
              orderDirection: desc
            ) {
              ...DonationFragment
            }
          }
        `,
        { campaignId }
      )
      .then((result) => {
        return (result as { donations: Donation[] }).donations;
      });
  });
};

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
          ${donationFragment}
          query GetDonations($campaignId: String!) {
            donations(
              where: { campaign: $campaignId }
              orderBy: timestamp
              orderDirection: desc
            ) {
              ...DonationFragment
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
