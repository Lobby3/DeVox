import { Grid } from "@chakra-ui/react";

import { Campaign } from "../../types/Campaign";
import CampaignTile from "../campaign-tile/campaign-tile";

/* eslint-disable-next-line */
export interface CampaignGridViewProps {
  campaigns: Campaign[];
}

export function CampaignGridView({ campaigns }: CampaignGridViewProps) {
  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={6} width="100%">
      {campaigns.map((campaign) => (
        <CampaignTile key={campaign.id} campaign={campaign} />
      ))}
    </Grid>
  );
}

export default CampaignGridView;
