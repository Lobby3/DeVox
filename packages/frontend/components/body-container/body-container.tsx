/* eslint-disable-next-line */
import { Center, Flex } from "@chakra-ui/react";
import React from "react";
import { PropsWithChildren } from "react";

export function BodyContainer({ children }: PropsWithChildren) {
  return (
    <Center width={"100%"}>
      <Flex maxWidth="1360px" padding={["24px", "80px 44px"]} width="100%">
        {children}
      </Flex>
    </Center>
  );
}

export default BodyContainer;
