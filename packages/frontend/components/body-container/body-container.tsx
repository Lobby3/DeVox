/* eslint-disable-next-line */
import { Center } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

export function BodyContainer({ children }: PropsWithChildren) {
  return (
    <Center maxWidth="1360px" padding="80px 44px" width="100%">
      {children}
    </Center>
  );
}

export default BodyContainer;
