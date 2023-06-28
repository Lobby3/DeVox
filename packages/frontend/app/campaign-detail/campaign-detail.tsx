"use client";

/* eslint-disable-next-line */
import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Heading,
  Image,
  Progress,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { CircleStackIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { ethers } from "ethers";
import React from "react";

import BodyContainer from "../../components/body-container/body-container";
import CampaignDonateButton from "../../components/campaign-donate-button/campaign-donate-button";
import CampaignSignButton from "../../components/campaign-sign-button/campaign-sign-button";
import DonationsOverview from "../../components/donations-overview/donations-overview";
import ErrorScreen from "../../components/error-screen/error-screen";
import Loader from "../../components/loader/loader";
import { useDaoInfo, useGetCampaign } from "../../graph/campaigns";
import { useTokenInfo } from "../../hooks/token";
import { headerBackground } from "../../styles/colors";

export interface CampaignDetailProps {
  campaignId: string;
}

const CampaignDetail = ({ campaignId }: CampaignDetailProps) => {
  const {
    data: campaign,
    isLoading: isLoadingCampaign,
    isError,
  } = useGetCampaign(campaignId);
  const { dao, isLoading: isLoadingDao } = useDaoInfo(campaignId);
  const { decimals } = useTokenInfo(campaign?.tokenAddress);
  const [tab, setTab] = React.useState<"details" | "donations">("details");

  if (isLoadingCampaign || isLoadingDao) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorScreen />;
  }

  if (!campaign) {
    return (
      <Center mt={10}>
        <Heading>CAMPAIGN NOT FOUND</Heading>
      </Center>
    );
  }

  const formattedTotal = ethers.utils.formatUnits(
    campaign.total || 0,
    decimals
  );

  const progressValue =
    (Number(formattedTotal) / Number(campaign.target)) * 100;

  return (
    <>
      <BodyContainer>
        <Flex
          flexDirection={["column", "row"]}
          width="100%"
          border={"1px solid black"}
          height={["fit-content", "480px"]}
        >
          <Image
            src={
              dao?.avatarImg ||
              "https://randomwordgenerator.com/img/picture-generator/57e7dc4b4c5ba914f1dc8460962e33791c3ad6e04e5074417c2f7dd5904cc0_640.jpg"
            }
            height={["auto", "100%"]}
            width={["100%", "50%"]}
            objectFit={"cover"}
          />
          <VStack
            py={["16px", 0]}
            px={["16px", "40px"]}
            alignItems={"flex-start"}
            height={"100%"}
            justifyContent={"center"}
            spacing={6}
            width={["100%", "50%"]}
          >
            <Heading
              maxWidth={"100%"}
              size={"sm"}
              overflowWrap={"anywhere"}
              isTruncated
            >
              {campaign.shamanAddress}
            </Heading>
            <Heading size={"xl"}>{campaign.name}</Heading>
            <Flex alignItems="center">
              <PencilSquareIcon height="20px" width="20px" />
              <Heading size={"sm"} ml={2} mr={12}>
                {campaign.signatures.length} signers
              </Heading>
            </Flex>
            <Flex alignItems={"center"}>
              <Heading size={"sm"} mr={2}>
                ${formattedTotal}/{campaign.target}
              </Heading>
              <Flex width={[0, 0, "200px"]} flexGrow={[1, 1, 0]} mr={2}>
                <Progress colorScheme="devoxSuccess" value={progressValue} />
              </Flex>
              <CircleStackIcon height={20} width={20} />
            </Flex>
            <Text noOfLines={10}>{dao?.description}</Text>
          </VStack>
        </Flex>
      </BodyContainer>
      <Box width={"100%"} backgroundColor={headerBackground}>
        <BodyContainer>
          <Stack
            direction={["column", "row"]}
            width="100%"
            spacing={8}
            justifyContent={"flex-start"}
          >
            <CampaignSignButton campaignId={campaignId} />
            <CampaignDonateButton campaignId={campaignId} />
          </Stack>
        </BodyContainer>
      </Box>
      <BodyContainer>
        <VStack spacing={8} alignItems={"flex-start"}>
          <HStack>
            <Button
              border={"1px solid black"}
              onClick={() => setTab("details")}
              variant={tab === "details" ? "solid" : "outline"}
            >
              Details
            </Button>
            <Button
              border={"1px solid black"}
              onClick={() => setTab("donations")}
              variant={tab === "donations" ? "solid" : "outline"}
            >
              Contributions
            </Button>
          </HStack>
          {tab === "details" && (
            <Text>{dao?.longDescription || dao?.description}</Text>
          )}
          {tab === "donations" && <DonationsOverview campaignId={campaignId} />}
        </VStack>
      </BodyContainer>
    </>
  );
};

export default CampaignDetail;
