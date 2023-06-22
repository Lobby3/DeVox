/* eslint-disable-next-line */
import { Heading, Text, VStack } from "@chakra-ui/react";
import React from "react";

import { headerBackground, lavender } from "../../styles/colors";

export interface CampaignInteractionButtonProps {
  onClick: () => void;
  title: string;
  subtitle: React.ReactNode;
  complete?: boolean;
  icon?: React.ReactNode;
}

export const CampaignInteractionButton = ({
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
      backgroundColor={complete ? lavender : headerBackground}
      justifyContent="center"
      border={complete ? "none" : "1px solid white"}
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

export default CampaignInteractionButton;
