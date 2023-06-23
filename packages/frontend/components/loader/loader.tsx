/* eslint-disable-next-line */
import { Center, Spinner } from "@chakra-ui/react";

import { lavender } from "../../styles/colors";

export interface LoaderProps {}

export function Loader(props: LoaderProps) {
  return (
    <Center height={"100%"} py={10}>
      <Spinner size="xl" color={lavender} fontSize={"lg"} />
    </Center>
  );
}

export default Loader;
