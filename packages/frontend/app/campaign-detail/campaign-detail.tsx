/* eslint-disable-next-line */
import {
  Box,
  Button,
  Center,
  Flex,
  GridItem,
  HStack,
  Heading,
  Image,
  Progress,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { CircleStackIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import React from "react";

import CampaignDonateButton from "../../components/campaign-donate-button/campaign-donate-button";
import CampaignSignButton from "../../components/campaign-sign-button/campaign-sign-button";
import DonationsOverview from "../../components/donations-overview/donations-overview";
import ErrorScreen from "../../components/error-screen/error-screen";
import Loader from "../../components/loader/loader";
import { useCampaignData, useGetCampaign } from "../../graph/campaigns";
import { headerBackground } from "../../styles/colors";

export interface CampaignDetailProps {
  campaignId: string;
}

const CampaignDetail = ({ campaignId }: CampaignDetailProps) => {
  const { data: campaign, isLoading, isError } = useGetCampaign(campaignId);
  const { imageUrl, description } = useCampaignData(campaignId);
  const [tab, setTab] = React.useState<"details" | "donations">("donations");

  console.log(campaignId, campaign, isLoading, isError, imageUrl, description);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorScreen />;
  }

  if (!campaign) {
    return (
      <Center mt={10}>
        <Heading>CAMPAIGN NOT FOUND</Heading>
      </Center>
    );
  }

  const progressValue =
    (Number(campaign.total) / Number(campaign.target)) * 100;

  return (
    <>
      <SimpleGrid columns={5} height={"100%"}>
        <GridItem colSpan={3} p={"80px"}>
          <Flex width={"100%"} justifyContent={"flex-end"}>
            <VStack spacing={8} border={"1px solid black"} maxWidth={"960px"}>
              <HStack
                width={"100%"}
                borderBottom={"1px solid black"}
                marginLeft={"auto"}
              >
                <Image
                  src={imageUrl}
                  height="auto"
                  width={"50%"}
                  objectFit={"fill"}
                />
                <VStack
                  px={"40px"}
                  alignItems={"flex-start"}
                  height={"100%"}
                  justifyContent={"center"}
                  spacing={6}
                >
                  <Heading size={"sm"}>{campaign.shamanAddress}</Heading>
                  <Heading size={"xl"}>{campaign.name}</Heading>
                  <Flex alignItems="center">
                    <PencilSquareIcon height="20px" width="20px" />
                    <Heading size={"sm"} ml={2} mr={12}>
                      {campaign.donations.length} signers
                    </Heading>
                  </Flex>
                  <Flex alignItems={"center"}>
                    <Heading size={"sm"} mr={2}>
                      ${campaign.total}/{campaign.target}
                    </Heading>
                    <Box width="200px" mr={2}>
                      <Progress
                        colorScheme="devoxSuccess"
                        value={progressValue}
                      />
                    </Box>
                    <CircleStackIcon height={20} width={20} />
                  </Flex>
                </VStack>
              </HStack>
              <VStack
                width={"100%"}
                spacing={8}
                alignItems={"flex-start"}
                paddingX={"40px"}
                paddingBottom={"40px"}
              >
                <HStack>
                  <Button
                    onClick={() => setTab("details")}
                    variant={tab === "details" ? "solid" : "outline"}
                  >
                    Details
                  </Button>
                  <Button
                    onClick={() => setTab("donations")}
                    variant={tab === "donations" ? "solid" : "outline"}
                  >
                    Contributions
                  </Button>
                </HStack>
                {tab === "details" && <Text>{description}</Text>}
                {tab === "donations" && (
                  <DonationsOverview campaignId={campaignId} />
                )}
              </VStack>
            </VStack>
          </Flex>
        </GridItem>
        <GridItem
          backgroundColor={headerBackground}
          colSpan={2}
          p={"80px"}
          height={"100%"}
        >
          <VStack width="100%" spacing={8} alignItems={"flex-start"}>
            <CampaignSignButton />
            <CampaignDonateButton campaignId={campaignId} />
          </VStack>
        </GridItem>
      </SimpleGrid>
      {/*<Flex width="100%" border={"1px solid black"} height={"680px"}>*/}
      {/*  <Image*/}
      {/*    src={campaign.imageUrl}*/}
      {/*    height="680px"*/}
      {/*    width={"50%"}*/}
      {/*    objectFit={"cover"}*/}
      {/*  />*/}
      {/*  <VStack*/}
      {/*    px={"40px"}*/}
      {/*    alignItems={"flex-start"}*/}
      {/*    height={"100%"}*/}
      {/*    justifyContent={"center"}*/}
      {/*    spacing={6}*/}
      {/*  >*/}
      {/*    <Heading size={"sm"}>{campaign.shamanAddress}</Heading>*/}
      {/*    <Heading size={"xl"}>{campaign.name}</Heading>*/}
      {/*    <Flex alignItems="center">*/}
      {/*      <PencilSquareIcon height="20px" width="20px" />*/}
      {/*      <Heading size={"sm"} ml={2} mr={12}>*/}
      {/*        {campaign.numberOfSigners} signers*/}
      {/*      </Heading>*/}
      {/*    </Flex>*/}
      {/*    <Flex alignItems={"center"}>*/}
      {/*      <Heading size={"sm"} mr={2}>*/}
      {/*        ${campaign.total}/{campaign.target}*/}
      {/*      </Heading>*/}
      {/*      <Box width="200px" mr={2}>*/}
      {/*        <Progress colorScheme="devoxSuccess" value={progressValue} />*/}
      {/*      </Box>*/}
      {/*      <CircleStackIcon height={20} width={20} />*/}
      {/*    </Flex>*/}
      {/*    /!*<Text noOfLines={10}>{campaign.description}</Text>*!/*/}
      {/*  </VStack>*/}
      {/*</Flex>*/}
      {/*<Box width={"100%"} backgroundColor={headerBackground}>*/}
      {/*  <BodyContainer>*/}
      {/*    <HStack width="100%" spacing={8}>*/}
      {/*      <CampaignInteractionButton*/}
      {/*        onClick={() => console.log("Sign button clicked")}*/}
      {/*        title="Sign"*/}
      {/*        icon={<PencilSquareIcon height="80px" width="80px" />}*/}
      {/*        complete*/}
      {/*        subtitle="You've signed"*/}
      {/*      />*/}
      {/*      <CampaignInteractionButton*/}
      {/*        onClick={() => console.log("Sign button clicked")}*/}
      {/*        title="Donate"*/}
      {/*        subtitle="You have not donated"*/}
      {/*        icon={*/}
      {/*          <CircleStackIcon height="80px" width="80px" color={lavender} />*/}
      {/*        }*/}
      {/*      />*/}
      {/*    </HStack>*/}
      {/*  </BodyContainer>*/}
      {/*</Box>*/}
      {/*<BodyContainer>*/}
      {/*  <VStack spacing={8} alignItems={"flex-start"}>*/}
      {/*    <HStack>*/}
      {/*      <Button variant={"solid"}>Details</Button>*/}
      {/*      <Button variant={"outline"}>Contributions</Button>*/}
      {/*      <Button variant={"outline"}>Governance</Button>*/}
      {/*    </HStack>*/}
      {/*    <Text>{campaign.description}</Text>*/}
      {/*  </VStack>*/}
      {/*</BodyContainer>*/}
    </>
  );
};

export default CampaignDetail;
