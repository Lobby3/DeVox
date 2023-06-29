"use client";

import { VStack } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import React from "react";

import BodyContainer from "../components/body-container/body-container";

const CampaignGridView = dynamic(
  () => import("../components/campaign-grid-view/campaign-grid-view"),
  {
    ssr: false,
  }
);

export default function HomePage() {
  return (
    <VStack>
      <BodyContainer>
        <CampaignGridView />
      </BodyContainer>
    </VStack>
  );
}
