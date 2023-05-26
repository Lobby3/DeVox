"use client";

import {
  Box,
  Center,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Progress,
  Text,
  VStack,
} from "@chakra-ui/react";
import { CircleStackIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import React from "react";

import BodyContainer from "../../../components/body-container/body-container";
import { useCampaignInfo } from "../../../hooks/campaign";
import { lavender } from "../../../styles/colors";

export default async function Index({
  params,
}: {
  params: { campaignId: string };
}) {
  const { campaignId } = params;
  const campaign = useCampaignInfo(campaignId);

  if (!campaign) {
    return (
      <Center mt={10}>
        <Heading>CAMPAIGN NOT FOUND</Heading>
      </Center>
    );
  }

  return (
    <BodyContainer>
      <Grid width="100%" templateColumns={"repeat(4, 1fr)"}>
        <GridItem colSpan={3}>
          <VStack alignItems="flex-start" spacing={6}>
            <Text>{campaign.shamanAddress}</Text>
            <Image src={campaign.imageUrl} alt="" />
            <Heading>{campaign.name}</Heading>
            <Flex alignItems="center">
              <PencilSquareIcon height="20px" width="20px" />
              <Heading size={"sm"} ml={2} mr={12}>
                {campaign.numberOfSigners} signers
              </Heading>
              <Heading size={"sm"} mr={2}>
                ${campaign.total}/{campaign.target}
              </Heading>
              <Box width="200px" mr={2}>
                <Progress colorScheme="devoxSuccess" value={80} />
              </Box>
              <CircleStackIcon height={20} width={20} />
            </Flex>
            <Text>{campaign.description}</Text>
          </VStack>
        </GridItem>
        <GridItem colSpan={1}>
          <VStack width="fit-content" spacing={8}>
            <CampaignInteractionButton
              onClick={() => console.log("Sign button clicked")}
              title="Sign"
              icon={<PencilSquareIcon height="80px" width="80px" />}
              complete
              subtitle="You've signed"
            />
            <CampaignInteractionButton
              onClick={() => console.log("Sign button clicked")}
              title="Donate"
              subtitle="You have not donated"
              icon={
                <CircleStackIcon height="80px" width="80px" color={lavender} />
              }
            />
          </VStack>
        </GridItem>
      </Grid>
    </BodyContainer>
  );
}

interface CampaignInteractionButtonProps {
  onClick: () => void;
  title: string;
  subtitle: React.ReactNode;
  complete?: boolean;
  icon?: React.ReactNode;
}

const CampaignInteractionButton = ({
  onClick,
  title,
  subtitle,
  icon,
  complete = false,
}: CampaignInteractionButtonProps) => {
  return (
    <VStack
      as="button"
      onClick={onClick}
      width={"100%"}
      maxWidth={420}
      height={250}
      p="32px"
      backgroundColor={complete ? lavender : "black"}
      justifyContent="center"
      spacing={4}
    >
      <Heading textTransform={"uppercase"} color={complete ? "black" : "white"}>
        {title}
      </Heading>
      {icon}
      <Text
        fontFamily={"Inter"}
        fontWeight="500"
        color={complete ? "black" : "white"}
      >
        {subtitle}
      </Text>
    </VStack>
  );
};
