import { Flex, Heading } from "@chakra-ui/react";
import Image from "next/image";
import * as React from "react";

import ConnectButton from "../components/connect-button/connect-button";
import { headerBackground } from "../styles/colors";

export const Header = () => {
  return (
    <Flex
      as="header"
      alignItems="center"
      justifyContent="space-between"
      px={8}
      py={4}
      backgroundColor={headerBackground}
      height="64px"
    >
      <Flex mr="auto" alignItems="center">
        <Image src="logo.svg" alt="" width={30} height={30} />
        <Heading as="h1" color="white" fontSize="24px" ml={2}>
          DEVOX
        </Heading>
      </Flex>
      <ConnectButton />
    </Flex>
  );
};
