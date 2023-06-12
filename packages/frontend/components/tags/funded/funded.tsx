/* eslint-disable-next-line */
import { Tag, TagLabel, Text } from "@chakra-ui/react";

export interface FundedProps {}

export function Funded() {
  return (
    <Tag backgroundColor="devoxSuccess.200" borderRadius={"none"}>
      <Text color="devoxSuccess.600">•</Text>
      <TagLabel
        fontFamily={"'Antonio', sans-serif"}
        ml={2}
        color="devoxSuccess.800"
        textTransform="uppercase"
      >
        Funded
      </TagLabel>
    </Tag>
  );
}

export default Funded;
