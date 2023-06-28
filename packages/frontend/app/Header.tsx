"use client";

import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Collapse,
  Flex,
  HStack,
  Heading,
  IconButton,
  Show,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import {
  // ChatBubbleBottomCenterTextIcon,
  CircleStackIcon,
  FaceSmileIcon,
  GlobeAsiaAustraliaIcon,
} from "@heroicons/react/20/solid";
import { useWeb3React } from "@web3-react/core";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

import Logo from "../assets/logo.svg";
import ConnectButton from "../components/connect-button/connect-button";
import { headerBackground } from "../styles/colors";

const headerLinks = {
  discover: {
    label: "Discover",
    href: "/",
    icon: GlobeAsiaAustraliaIcon,
    showOnlyWhenConnected: false,
  },
  // create: {
  //   label: "Create campaign",
  //   href: "/create",
  //   icon: ChatBubbleBottomCenterTextIcon,
  // },
  aboutUs: {
    label: "About Us",
    href: "/about-us",
    icon: FaceSmileIcon,
    showOnlyWhenConnected: false,
  },
  myDonations: {
    label: "My Donations",
    href: "/my-donations",
    icon: CircleStackIcon,
    showOnlyWhenConnected: true,
  },
};

export const Header = () => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <>
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
        <Show breakpoint="(max-width: 767px)">
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? (
                <CloseIcon w={3} h={3} color={"white"} />
              ) : (
                <HamburgerIcon w={5} h={5} color={"white"} />
              )
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Show>
        <Show breakpoint="(min-width: 768px)">
          <DesktopNav />
        </Show>
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </>
  );
};

const MobileNav = () => {
  const { isActive } = useWeb3React();
  return (
    <Stack direction="column" p={4} px={6} display={{ md: "none" }}>
      {Object.values(headerLinks)
        .filter((link) => (link.showOnlyWhenConnected ? isActive : true))
        .map((link) => (
          <Box mb={2} key={link.href}>
            <Link href={link.href}>
              <Flex alignItems="center">
                <link.icon
                  color={headerBackground}
                  height={20}
                  width={20}
                  style={{ marginTop: 2 }}
                />
                <Heading
                  size={"md"}
                  ml={1}
                  color={headerBackground}
                  fontFamily={"Inter"}
                >
                  {link.label}
                </Heading>
              </Flex>
            </Link>
          </Box>
        ))}
      <ConnectButton />
    </Stack>
  );
};

const DesktopNav = () => {
  const { isActive } = useWeb3React();
  return (
    <Flex>
      <HStack spacing={4} mr={4}>
        {Object.values(headerLinks)
          .filter((link) => (link.showOnlyWhenConnected ? isActive : true))
          .map((link) => (
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
      <ConnectButton showWalletButton />
    </Flex>
  );
};
