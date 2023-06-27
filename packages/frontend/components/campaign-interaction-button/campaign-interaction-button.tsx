/* eslint-disable-next-line */
import { Heading, Text, VStack } from "@chakra-ui/react";
import React from "react";

import { headerBackground, lavender } from "../../styles/colors";

export interface CampaignInteractionButtonProps {
  isDisabled?: boolean;
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
  isDisabled,
  complete = false,
}: CampaignInteractionButtonProps) => {
  return (
    <button
      style={{ width: "420px", cursor: isDisabled ? "default" : "pointer" }}
      onClick={onClick}
      disabled={isDisabled}
    >
      <VStack
        maxWidth={420}
        height={250}
        p="32px"
        backgroundColor={complete ? lavender : headerBackground}
        justifyContent="center"
        border={complete ? "none" : "1px solid white"}
        spacing={4}
      >
        <Heading
          textTransform={"uppercase"}
          color={complete ? "black" : "white"}
        >
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
    </button>
  );
};

export default CampaignInteractionButton;
