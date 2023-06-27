/* eslint-disable-next-line */
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";

import { useCampaignSign, useUserHasSignedCampaign } from "../../hooks/sign";
import { lavender } from "../../styles/colors";
import CampaignInteractionButton from "../campaign-interaction-button/campaign-interaction-button";

export interface CampaignSignButtonProps {
  campaignId: string;
}

export function CampaignSignButton({ campaignId }: CampaignSignButtonProps) {
  const campaignSign = useCampaignSign(campaignId);
  const { data: userHasSigned = false, refetch } =
    useUserHasSignedCampaign(campaignId);
  const onSignCampaign = async () => {
    try {
      await campaignSign.mutateAsync();
      setTimeout(() => {
        refetch();
      }, 5000);
    } catch (e) {
      toast("Error signing campaign", {
        type: "error",
      });
    }
  };
  return (
    <CampaignInteractionButton
      onClick={onSignCampaign}
      title="Sign"
      isDisabled={userHasSigned}
      icon={
        <PencilSquareIcon
          height="80px"
          width="80px"
          color={userHasSigned ? "black" : lavender}
        />
      }
      complete={userHasSigned}
      subtitle={
        userHasSigned ? "You signed this campaign" : "Sign this campaign"
      }
    />
  );
}

export default CampaignSignButton;
