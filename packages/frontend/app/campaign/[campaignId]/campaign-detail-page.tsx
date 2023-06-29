"use client";

import dynamic from "next/dynamic";

const CampaignDetail = dynamic(
  () => import("../../campaign-detail/campaign-detail"),
  {
    ssr: false,
  }
);

export const CampaignDetailPage = ({ campaignId }: { campaignId: string }) => {
  return <CampaignDetail campaignId={campaignId} />;
};

export default CampaignDetailPage;
