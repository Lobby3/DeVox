import { Flex, Heading } from "@chakra-ui/react";
import * as React from "react";

import ConnectButton from "../components/connect-button/connect-button";

export const Header = () => {
  return (
    <Flex
      as="header"
      alignItems="center"
      justifyContent="space-between"
      px={8}
      py={4}
    >
      <Heading as="h1" size="lg">
        DeVox
      </Heading>
      <ConnectButton />
    </Flex>
  );
};
