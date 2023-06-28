import { useDaoData } from "@daohaus/moloch-v3-hooks";
import { useQuery } from "@tanstack/react-query";
import { gql } from "graphql-request";
import { useMemo } from "react";
import { Donation } from "subgraph/generated/schema";

import {
  getRandomCampaignDescription,
  getRandomCampaignImage,
} from "../hooks/campaign";
import { graphQLClient } from "./client";

export interface Campaign {
  id: string;
  baalAddress: string;
  shamanAddress: string;
  tokenAddress: string;
  name: string;
  total: string;
  target: string;
  pricePerUnit: string;
  tokensPerUnit: string;
  proposals: {
    id: string;
    details: string;
  }[];
  donations: {
    id: string;
    user: {
      id: string;
    };
  }[];
  signatures: {
    id: string;
  }[];
}

const campaignFragment = gql`
  fragment campaignFragment on Campaign {
    id
    baalAddress
    shamanAddress
    tokenAddress
    name
    total
    target
    pricePerUnit
    tokensPerUnit
    proposals {
      id
      details
    }
    donations {
      id
      user {
        id
      }
    }
    signatures {
      id
    }
  }
`;

export const useGetCampaigns = () => {
  return useQuery(["campaigns"], async () => {
    return graphQLClient
      .request(
        gql`
          ${campaignFragment}
          query GetCampaigns {
            campaigns {
              ...campaignFragment
            }
          }
        `
      )
      .then((result) => {
        return (result as { campaigns: Campaign[] }).campaigns;
      });
  });
};

export const useDaoInfo = (id: string) => {
  return useDaoData({
    daoId: id,
    daoChain: process.env.NEXT_PUBLIC_CHAIN_ID_HEX as string,
  });
};

export const useGetCampaign = (id: string) => {
  return useQuery(["campaign", id], async () => {
    return graphQLClient
      .request(
        gql`
          ${campaignFragment}
          query GetCampaign($id: ID!) {
            campaign(id: $id) {
              ...campaignFragment
            }
          }
        `,
        { id }
      )
      .then((result) => {
        return (result as { campaign: Campaign }).campaign;
      });
  });
};

export const useGetCampaignsWithDonationsFromUser = (address?: string) => {
  return useQuery(["campaigns", "user-donations", address], async () => {
    if (!address) {
      return [];
    }

    return graphQLClient
      .request(
        gql`
          ${campaignFragment}
          query GetCampaignsWithDonationsFromUser($address: String!) {
            donations(where: { user: $address }) {
              id
              amount
              campaign {
                ...campaignFragment
              }
            }
          }
        `,
        { address }
      )
      .then((result) => {
        return (
          result as { donations: { campaign: Campaign }[] }
        ).donations.map((donation) => donation.campaign);
      });
  });
};
