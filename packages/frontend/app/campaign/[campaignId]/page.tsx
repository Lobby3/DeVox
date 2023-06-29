import dynamic from "next/dynamic";
import React from "react";

const CampaignDetailPage = dynamic(() => import("./campaign-detail-page"), {
  ssr: false,
});

export async function generateMetadata(props: {
  params: { campaignId: string };
}) {
  const id = props.params.campaignId;
  const campaignPromise = fetch(
    "https://api.thegraph.com/subgraphs/name/moconnell/lobby3-devox",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
        query GetCampaign($id: ID!) {
          campaign(id: $id) {
            id
            baalAddress
            shamanAddress
            tokenAddress
            name
            total
            target
            pricePerUnit
            tokensPerUnit
            proposals {
              id
              details
            }
            donations {
              id
              user {
                id
              }
            }
            signatures {
              id
            }
          }
        }
      `,
        variables: { id },
      }),
    }
  ).then((res) => {
    return res.json();
  });
  const daoQuery = `query findDao($id: ID!, $now: BigInt! = 0) {\n  dao(id: $id) {\n    id\n    createdAt\n    createdBy\n    txHash\n    safeAddress\n    lootPaused\n    sharesPaused\n    gracePeriod\n    votingPeriod\n    proposalOffering\n    quorumPercent\n    sponsorThreshold\n    minRetentionPercent\n    shareTokenName\n    shareTokenSymbol\n    sharesAddress\n    lootTokenName\n    lootTokenSymbol\n    lootAddress\n    totalShares\n    totalLoot\n    latestSponsoredProposalId\n    proposalCount\n    activeMemberCount\n    existingSafe\n    delegatedVaultManager\n    forwarder\n    referrer\n    name\n    profile: records(\n      first: 1\n      orderBy: createdAt\n      orderDirection: desc\n      where: {table: "daoProfile"}\n    ) {\n      createdAt\n      createdBy\n      contentType\n      content\n    }\n    shamen: shaman {\n      id\n      createdAt\n      shamanAddress\n      permissions\n    }\n    vaults(where: {active: true}) {\n      id\n      createdAt\n      active\n      ragequittable\n      name\n      safeAddress\n    }\n    activeProposals: proposals(\n      first: 101\n      orderBy: createdAt\n      orderDirection: desc\n      where: {cancelled: false, sponsored: true, graceEnds_gt: $now}\n    ) {\n      id\n    }\n  }\n}`;
  const daoPromise = fetch(
    "https://api.thegraph.com/subgraphs/name/hausdao/daohaus-v3-goerli",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: daoQuery,
        variables: { id },
      }),
    }
  ).then((res) => {
    return res.json();
  });

  const [campaign, dao] = await Promise.all([campaignPromise, daoPromise]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getDaoAvatarImg = (dao: any): string | undefined => {
    if (!dao.profile || !dao.profile.length) return;

    const obj = JSON.parse(dao.profile[0].content);

    return obj.avatarImg && obj.avatarImg.match(/Qm[a-zA-Z0-9/.]+/)
      ? `https://daohaus.mypinata.cloud/ipfs/${obj.avatarImg.match(
          /Qm[a-zA-Z0-9/.]+/
        )}`
      : obj.avatarImg;
  };

  const avatarImg = getDaoAvatarImg(dao.data.dao);
  const obj = JSON.parse(dao.data.dao.profile[0].content);

  return {
    title: `${campaign.data.campaign.name || dao.data.dao.name} | DeVox`,
    description: obj.description,
    openGraph: {
      title: `${campaign.data.campaign.name || dao.data.dao.name} | DeVox`,
      description: obj.description,
      type: "website",
      images: [avatarImg ? avatarImg : ""],
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

export default async function Index(props: { params: { campaignId: string } }) {
  const campaignId = props?.params?.campaignId;

  return <CampaignDetailPage campaignId={campaignId} />;
}
