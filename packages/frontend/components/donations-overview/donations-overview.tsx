import {
  Center,
  Heading,
  List,
  ListIcon,
  ListItem,
  Text,
} from "@chakra-ui/react";
import { CircleStackIcon } from "@heroicons/react/24/outline";
import { formatUnits } from "ethers/lib/utils";
import React from "react";

import { useGetCampaign } from "../../graph/campaigns";
import { useGetDonationsForCampaign } from "../../graph/donations";
import { useTokenInfo } from "../../hooks/token";
import ErrorScreen from "../error-screen/error-screen";
import Loader from "../loader/loader";

export interface DonationsOverviewProps {
  campaignId: string;
}

export function DonationsOverview({ campaignId }: DonationsOverviewProps) {
  const { data: campaign } = useGetCampaign(campaignId);
  const {
    data: donations,
    isLoading,
    isError,
  } = useGetDonationsForCampaign(campaignId);
  const { decimals, symbol } = useTokenInfo(campaign?.tokenAddress);

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !donations) {
    return <ErrorScreen />;
  }

  if (donations.length === 0) {
    return (
      <Center>
        <Heading textAlign={"center"}>No donations yet.</Heading>
      </Center>
    );
  }

  return (
    <List>
      {donations.map((donation) => {
        const formattedAmount = formatUnits(donation.amount, decimals);
        const formattedMessage = donation.message?.text
          ? ` "${donation.message.text}"`
          : "";

        return (
          <ListItem key={donation.id} display={"flex"} alignItems={"center"}>
            <ListIcon as={CircleStackIcon} color="green.500" />
            <Text>
              <b>
                {formattedAmount} {symbol}
              </b>{" "}
              -{formattedMessage} by {donation.user.id}
            </Text>
          </ListItem>
        );
      })}
    </List>
  );
}

export default DonationsOverview;
