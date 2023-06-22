/* eslint-disable-next-line */
import { useDisclosure } from "@chakra-ui/react";
import { CircleStackIcon } from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";
import React from "react";

import { lavender } from "../../styles/colors";
import CampaignInteractionButton from "../campaign-interaction-button/campaign-interaction-button";

const DonateModal = dynamic(() => import("../donate-modal/donate-modal"), {
  ssr: false,
});

export interface CampaignDonateButtonProps {}

export function CampaignDonateButton(props: CampaignDonateButtonProps) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <>
      <CampaignInteractionButton
        onClick={onOpen}
        title="Donate"
        subtitle="You have not donated"
        icon={<CircleStackIcon height="80px" width="80px" color={lavender} />}
      />
      <DonateModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}

export default CampaignDonateButton;
