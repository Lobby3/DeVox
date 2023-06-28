/* eslint-disable-next-line */
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Heading,
  VStack,
} from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";

import { useGetCampaignsWithDonationsFromUser } from "../../graph/campaigns";
import BodyContainer from "../body-container/body-container";
import CampaignGridView from "../campaign-grid-view/campaign-grid-view";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface MyDonationsProps {}

export function MyDonations(props: MyDonationsProps) {
  const { account } = useWeb3React();
  const { data: campaigns, isLoading } =
    useGetCampaignsWithDonationsFromUser(account);

  if (!account) {
    return (
      <BodyContainer>
        <Alert status="error">
          <AlertIcon />
          <VStack alignItems={"flex-start"}>
            <AlertTitle>No wallet connected</AlertTitle>
            <AlertDescription>
              Please connect your wallet to view your donations.
            </AlertDescription>
          </VStack>
        </Alert>
      </BodyContainer>
    );
  }

  if (!isLoading && campaigns !== undefined && campaigns.length === 0) {
    return (
      <BodyContainer>
        <Alert status="info">
          <AlertIcon />
          <VStack alignItems={"flex-start"}>
            <AlertTitle>No donations found</AlertTitle>
            <AlertDescription>
              You have not donated to any campaigns yet.
            </AlertDescription>
          </VStack>
        </Alert>
      </BodyContainer>
    );
  }

  return (
    <BodyContainer>
      <VStack alignItems={"flex-start"}>
        <Heading mb={4}>Campaigns you have donated to</Heading>
        <CampaignGridView campaigns={campaigns} />
      </VStack>
    </BodyContainer>
  );
}

export default MyDonations;
