import { useDaoData } from "@daohaus/moloch-v3-hooks";
import { useQuery } from "@tanstack/react-query";
import { gql } from "graphql-request";
import { useMemo } from "react";

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

export const useGetCampaign = (id: string) => {
  const { dao } = useDaoData({
    daoId: id,
    daoChain: process.env.NEXT_PUBLIC_CHAIN_ID_HEX!,
  });
  return useQuery(
    ["campaign", id],
    async () => {
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
    },
    {
      select: (data) => {
        return {
          ...data,
          dao,
        };
      },
    }
  );
};

export const useCampaignData = (id: string) => {
  const imageUrl = useMemo(() => getRandomCampaignImage(), [id]);
  const description = useMemo(() => getRandomCampaignDescription(), [id]);
  return {
    imageUrl,
    description,
  };
};
