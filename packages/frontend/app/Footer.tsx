"use client";

import { Flex, Heading, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import Logo from "../assets/logo.svg";
import { headerBackground } from "../styles/colors";

export const Footer = () => {
  return (
    <Flex as="footer" marginTop="auto" backgroundColor={headerBackground}>
      <VStack
        flexDirection="column"
        alignItems="flex-start"
        p="80px"
        color="white"
        width="50%"
        spacing={8}
      >
        <Image src={Logo} alt="logo" width={80} height={80} />
        <Heading textTransform="uppercase">
          We believe people deserve more robust opportunities to voice their
          opinions and advocate their beliefs.
        </Heading>
        <Text>© DeVox 2023</Text>
      </VStack>
      <VStack
        justifyContent={"center"}
        alignItems={"flex-start"}
        color={"white"}
        fontSize={"xl"}
      >
        <Link href={"/"}>
          <Text fontFamily={"Inter"}>Discover</Text>
        </Link>
        <Link href={"/create"}>
          <Text fontFamily={"Inter"}>Start a Campaign</Text>
        </Link>
        <Link href={"/about-us"}>
          <Text fontFamily={"Inter"}>About Us</Text>
        </Link>
        <Text fontFamily={"Inter"}>Terms of Services</Text>
        <Text fontFamily={"Inter"}>Privacy Policy</Text>
        <Text fontFamily={"Inter"}>Affiliate Program</Text>
      </VStack>
    </Flex>
  );
};
