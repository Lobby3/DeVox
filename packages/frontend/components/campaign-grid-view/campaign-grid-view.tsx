import { GridItem, SimpleGrid } from "@chakra-ui/react";
import React from "react";

import { Campaign, useGetCampaigns } from "../../graph/campaigns";
import CampaignTile from "../campaign-tile/campaign-tile";
import ErrorScreen from "../error-screen/error-screen";
import Loader from "../loader/loader";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CampaignGridViewProps {
  campaigns?: Campaign[];
}

export function CampaignGridView(props: CampaignGridViewProps) {
  const { data, isLoading, isError } = useGetCampaigns();

  const campaigns = props.campaigns || data || [];

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorScreen />;
  }

  return (
    <SimpleGrid
      gap={6}
      width="100%"
      minChildWidth={"340px"}
      columns={[1, 2, 3]}
    >
      {campaigns.map((campaign) => (
        <GridItem key={campaign.id}>
          <CampaignTile campaign={campaign} />
        </GridItem>
      ))}
    </SimpleGrid>
  );
}

export default CampaignGridView;
