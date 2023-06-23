import { Button, Flex, Heading, Image, Text, VStack } from "@chakra-ui/react";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import React from "react";

import { Campaign } from "../../graph/campaigns";
import {
  getRandomCampaignDescription,
  getRandomCampaignImage,
} from "../../hooks/campaign";
import { headerBackground } from "../../styles/colors";
import Funded from "../tags/funded/funded";

export interface CampaignTileProps {
  campaign: Campaign;
}

export function CampaignTile({ campaign }: CampaignTileProps) {
  const imageUrl = getRandomCampaignImage();
  const description = getRandomCampaignDescription();
  return (
    <VStack
      alignItems={"flex-start"}
      spacing={4}
      padding={8}
      borderColor={headerBackground}
      borderWidth={"1px"}
      height="100%"
    >
      <Image
        src={imageUrl}
        alt=""
        width="368px"
        height="368px"
        objectFit={"cover"}
      />
      <Funded />
      <Heading textTransform="uppercase">{campaign.name}</Heading>
      <Text noOfLines={3}>{description}</Text>
      <Flex flexGrow={1} alignItems={"flex-end"}>
        <Link href={`campaign/${campaign.id}`}>
          <Button
            rightIcon={<ArrowRightIcon height={20} />}
            variant={"outline"}
            maxWidth="100%"
          >
            Donate Now To Participate
          </Button>
        </Link>
      </Flex>
    </VStack>
  );
}

export default CampaignTile;
