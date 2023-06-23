/* eslint-disable-next-line */
import { useDisclosure } from "@chakra-ui/react";
import { CircleStackIcon } from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";
import React from "react";

import { useGetDonationsForUser } from "../../graph/donations";
import { lavender } from "../../styles/colors";
import CampaignInteractionButton from "../campaign-interaction-button/campaign-interaction-button";

const DonateModal = dynamic(() => import("../donate-modal/donate-modal"), {
  ssr: false,
});

export interface CampaignDonateButtonProps {
  campaignId: string;
}

export function CampaignDonateButton({
  campaignId,
}: CampaignDonateButtonProps) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { data, isLoading } = useGetDonationsForUser(campaignId);
  const hasDonated = !isLoading && data && data.length > 0;

  return (
    <>
      <CampaignInteractionButton
        onClick={onOpen}
        title="Donate"
        subtitle={hasDonated ? "You've donated" : "You have not donated"}
        icon={
          <CircleStackIcon
            height="80px"
            width="80px"
            color={hasDonated ? "black" : lavender}
          />
        }
        complete={hasDonated}
      />
      <DonateModal isOpen={isOpen} onClose={onClose} campaignId={campaignId} />
    </>
  );
}

export default CampaignDonateButton;
