import { GridItem, SimpleGrid } from "@chakra-ui/react";
import React from "react";

import { useGetCampaigns } from "../../graph/campaigns";
import CampaignTile from "../campaign-tile/campaign-tile";
import ErrorScreen from "../error-screen/error-screen";
import Loader from "../loader/loader";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CampaignGridViewProps {}

export function CampaignGridView(props: CampaignGridViewProps) {
  const { data, isLoading, isError } = useGetCampaigns();

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorScreen />;
  }

  return (
    <SimpleGrid gap={6} width="100%" minChildWidth={"340px"}>
      {(data || []).map((campaign) => (
        <GridItem key={campaign.id}>
          <CampaignTile campaign={campaign} />
        </GridItem>
      ))}
    </SimpleGrid>
  );
}

export default CampaignGridView;
