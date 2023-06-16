
import { log } from "matchstick-as";
import {
  DonationReceived,
  TargetUpdated,
} from "../generated/DeVoxShamanV1/DeVoxShamanV1";
import { Campaign, Donation } from "../generated/schema";

// export function handleAdminChanged(event: AdminChanged): void {}

// export function handleBeaconUpgraded(event: BeaconUpgraded): void {}

export function handleDonationReceived(event: DonationReceived): void {
  const donation = new Donation(event.transaction.hash.toHex() + "-" + event.logIndex.toString());
  const campaignId = event.params.baal.toHexString();
  donation.campaign = campaignId;
  donation.amount = event.params.amount;
  donation.loot = event.params.lootIssued;
  donation.shares = event.params.sharesIssued;  
  donation.message = event.params.message;
  donation.user = event.params.contributorAddress;
  donation.timestamp = event.block.timestamp;
  donation.save();

  const campaign = Campaign.load(campaignId);
  if (!campaign) {
    log.error("Campaign not found!", [campaignId]);
    return;
  }

  campaign.total = campaign.total.plus(event.params.amount);
  campaign.save();
}

// export function handleInitialized(event: Initialized): void {}

export function handleTargetUpdated(event: TargetUpdated): void {
  const id = event.transaction.from.toHexString();
  const campaign = Campaign.load(id);

  if (!campaign) {
    log.error("Campaign not found!", [id]);
    return;
  }

  campaign.target = event.params.target;
  campaign.save();
}

// export function handleUpgraded(event: Upgraded): void {}
