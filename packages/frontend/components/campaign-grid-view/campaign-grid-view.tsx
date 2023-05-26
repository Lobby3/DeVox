import { Grid, GridItem, SimpleGrid } from "@chakra-ui/react";

import { Campaign } from "../../types/Campaign";
import CampaignTile from "../campaign-tile/campaign-tile";

/* eslint-disable-next-line */
export interface CampaignGridViewProps {
  campaigns: Campaign[];
}

export function CampaignGridView({ campaigns }: CampaignGridViewProps) {
  return (
    <SimpleGrid gap={6} width="100%" minChildWidth={"340px"}>
      {campaigns.map((campaign) => (
        <GridItem key={campaign.id}>
          <CampaignTile campaign={campaign} />
        </GridItem>
      ))}
    </SimpleGrid>
  );
}

export default CampaignGridView;
