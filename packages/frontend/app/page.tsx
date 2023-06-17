"use client";

import { VStack } from "@chakra-ui/react";
import React from "react";

import BodyContainer from "../components/body-container/body-container";
import CampaignGridView from "../components/campaign-grid-view/campaign-grid-view";
import { useListCampaigns } from "../hooks/campaign";

export default async function Index() {
  const campaigns = useListCampaigns();
  return (
    <VStack>
      <BodyContainer>
        <CampaignGridView campaigns={campaigns} />
      </BodyContainer>
    </VStack>
  );
}
