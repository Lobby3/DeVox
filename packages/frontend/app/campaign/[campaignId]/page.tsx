"use client";

import React from "react";

import CampaignDetail from "../../campaign-detail/campaign-detail";

export default async function Index(props: { params: { campaignId: string } }) {
  const campaignId = props?.params?.campaignId;

  return <CampaignDetail campaignId={campaignId} />;
}
