"use client";

import React from "react";

import CampaignDetail from "../../campaign-detail/campaign-detail";

export default async function Index({
  params,
}: {
  params: { campaignId: string };
}) {
  const { campaignId } = params;

  return <CampaignDetail campaignId={campaignId} />;
}
