import { Flex, HStack, Heading } from "@chakra-ui/react";
import {
  ChatBubbleBottomCenterTextIcon,
  FaceSmileIcon,
} from "@heroicons/react/20/solid";
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
  aboutUs: {
    label: "About Us",
    href: "/about-us",
    icon: FaceSmileIcon,
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
        <HStack spacing={4} mr={4}>
          {Object.values(headerLinks).map((link) => (
            <Link href={link.href} key={link.href}>
              <Flex alignItems="center">
                <link.icon
                  color="white"
                  height={20}
                  width={20}
                  style={{ marginTop: 2 }}
                />
                <Heading
                  size={"sm"}
                  ml={1}
                  color="gray.300"
                  fontFamily={"Inter"}
                >
                  {link.label}
                </Heading>
              </Flex>
            </Link>
          ))}
        </HStack>
        <ConnectButton />
      </Flex>
    </Flex>
  );
};
