"use client";

import { VStack } from "@chakra-ui/react";
import React from "react";

import BodyContainer from "../components/body-container/body-container";
import CampaignGridView from "../components/campaign-grid-view/campaign-grid-view";

export default async function Index() {
  return (
    <VStack>
      <BodyContainer>
        <CampaignGridView />
      </BodyContainer>
    </VStack>
  );
}
