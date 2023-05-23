import { Flex, Heading, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";

import { headerBackground } from "../styles/colors";

export const Footer = () => {
  return (
    <Flex as="footer" marginTop="auto" backgroundColor={headerBackground}>
      <VStack
        mr="auto"
        flexDirection="column"
        alignItems="flex-start"
        p="80px"
        color="white"
        width="50%"
        spacing={8}
      >
        <Image src={"logo.svg"} alt="logo" width={80} height={80} />
        <Heading textTransform="uppercase">
          We believe people deserve more robust opportunities to voice their
          opinions and advocate their beliefs.
        </Heading>
        <Text>© DeVox 2023</Text>
      </VStack>
      <div>DEVOX FOOTER</div>
    </Flex>
  );
};
