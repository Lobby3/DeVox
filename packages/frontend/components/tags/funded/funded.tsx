/* eslint-disable-next-line */
import { Tag, TagLabel, Text } from "@chakra-ui/react";

export interface FundedProps {}

export function Funded() {
  return (
    <Tag backgroundColor="success.200" borderRadius={0}>
      <Text color="success.600">•</Text>
      <TagLabel
        fontFamily={"'Antonio', sans-serif"}
        ml={2}
        color="success.800"
        textTransform="uppercase"
      >
        Funded
      </TagLabel>
    </Tag>
  );
}

export default Funded;
