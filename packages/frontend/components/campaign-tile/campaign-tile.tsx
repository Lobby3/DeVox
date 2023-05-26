import { Button, Flex, Heading, Image, Text, VStack } from "@chakra-ui/react";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

import { headerBackground } from "../../styles/colors";
import { Campaign } from "../../types/Campaign";
import Funded from "../tags/funded/funded";

export interface CampaignTileProps {
  campaign: Campaign;
}

export function CampaignTile({ campaign }: CampaignTileProps) {
  return (
    <VStack
      alignItems={"flex-start"}
      spacing={4}
      padding={8}
      borderColor={headerBackground}
      borderWidth={"1px"}
    >
      <Image
        src={campaign.imageUrl}
        alt=""
        width="368px"
        height="368px"
        objectFit={"cover"}
      />
      <Funded />
      <Heading textTransform="uppercase">{campaign.name}</Heading>
      <Text noOfLines={3}>{campaign.description}</Text>
      <Flex flexGrow={1} alignItems={"flex-end"}>
        <Link href={`campaign/${campaign.id}`}>
          <Button
            rightIcon={<ArrowRightIcon height={20} />}
            variant={"outline"}
          >
            Donate Now To Participate
          </Button>
        </Link>
      </Flex>
    </VStack>
  );
}

export default CampaignTile;
