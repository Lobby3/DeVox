/* eslint-disable-next-line */
import { PencilSquareIcon } from "@heroicons/react/24/outline";

import CampaignInteractionButton from "../campaign-interaction-button/campaign-interaction-button";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CampaignSignButtonProps {}

export function CampaignSignButton(props: CampaignSignButtonProps) {
  return (
    <CampaignInteractionButton
      onClick={() => console.log("Sign button clicked")}
      title="Sign"
      icon={<PencilSquareIcon height="80px" width="80px" />}
      complete
      subtitle="You've signed"
    />
  );
}

export default CampaignSignButton;
