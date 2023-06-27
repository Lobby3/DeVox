/* eslint-disable-next-line */
import { Heading } from "@chakra-ui/react";

import BodyContainer from "../body-container/body-container";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ErrorScreenProps {}

export function ErrorScreen(props: ErrorScreenProps) {
  return (
    <BodyContainer>
      <Heading>Something went wrong :(</Heading>
    </BodyContainer>
  );
}

export default ErrorScreen;
