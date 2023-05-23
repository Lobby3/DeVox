import { Flex, HStack, Heading, Text } from "@chakra-ui/react";
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

import Logo from "../assets/logo.svg";
import ConnectButton from "../components/connect-button/connect-button";
import { headerBackground } from "../styles/colors";

const headerLinks = {
  create: {
    label: "Create campaign",
    href: "/create",
    icon: ChatBubbleBottomCenterTextIcon,
  },
};

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
        <Link href="/">
          <Image src={Logo} alt="" width={30} height={30} />
        </Link>
        <Link href="/">
          <Heading as="h1" color="white" fontSize="24px" ml={2}>
            DEVOX
          </Heading>
        </Link>
      </Flex>
      <Flex>
        <HStack mr={4}>
          {Object.values(headerLinks).map((link) => (
            <Link href={link.href} key={link.href}>
              <Flex alignItems="center">
                <link.icon
                  color="white"
                  height={20}
                  width={20}
                  style={{ marginTop: 2 }}
                />
                <Text ml={2} color="gray.300">
                  {link.label}
                </Text>
              </Flex>
            </Link>
          ))}
        </HStack>
        <ConnectButton />
      </Flex>
    </Flex>
  );
};
