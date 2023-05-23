"use client";

import { Box, Center, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { Progress } from "@chakra-ui/react";
import { CircleStackIcon, PencilSquareIcon } from "@heroicons/react/24/outline";

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
      <Flex>
        <VStack alignItems="flex-start">
          <Heading>{campaign.name}</Heading>
          <Flex alignItems="center">
            <Text>
              ${campaign.total}/{campaign.target}
            </Text>
            <Box width="200px">
              <Progress value={80} />
            </Box>
          </Flex>
          <Text>{campaign.description}</Text>
        </VStack>
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
      </Flex>
    </BodyContainer>
  );
}

interface CampaignInteractionButtonProps {
  onClick: () => void;
  title: string;
  subtitle: string;
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
      width={420}
      height={250}
      p="32px"
      backgroundColor={complete ? lavender : "black"}
      justifyContent="center"
      spacing={4}
    >
      <Heading color={complete ? "black" : "white"}>{title}</Heading>
      {icon}
      <Text color={complete ? "black" : "white"}>{subtitle}</Text>
    </VStack>
  );
};
