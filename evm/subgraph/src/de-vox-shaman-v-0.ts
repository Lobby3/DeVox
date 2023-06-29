import { log } from "matchstick-as";

import { Campaign, Donation, Message, Signature } from "../generated/schema";
import {
  AdminChanged,
  BeaconUpgraded,
  DonationReceived,
  Initialized,
  OwnershipTransferred,
  TargetUpdated,
  Upgraded,
  UserSigned,
} from "../generated/templates/DeVoxShamanV0/DeVoxShamanV0";

export function handleAdminChanged(event: AdminChanged): void {
  log.info("AdminChanged: {}", [event.params.newAdmin.toHexString()]);
}

export function handleBeaconUpgraded(event: BeaconUpgraded): void {
  log.info("BeaconUpgraded: {}", [event.params.beacon.toHexString()]);
}

export function handleDonationReceived(event: DonationReceived): void {
  const campaignId = event.params.baal.toHexString();
  const campaign = Campaign.load(campaignId);
  if (!campaign) {
    log.error("Campaign {} not found!", [campaignId]);
    return;
  }

  const donationId =
    event.transaction.hash.toHex() + "-" + event.logIndex.toString();
  const donation = new Donation(donationId);
  donation.campaign = campaignId;
  donation.amount = event.params.amount;
  donation.loot = event.params.lootIssued;
  donation.shares = event.params.sharesIssued;
  donation.user = event.params.contributorAddress;
  donation.timestamp = event.block.timestamp;

  if (event.params.message) {
    const messageId = campaignId + "-" + donationId;

    const message = new Message(messageId);
    message.campaign = campaignId;
    message.text = event.params.message;
    message.user = event.params.contributorAddress;
    message.save();

    donation.message = messageId;
  }

  donation.save();

  campaign.total = campaign.total.plus(event.params.amount);
  campaign.save();

  if (event.params.signedCampaign) {
    const signature = new Signature(
      event.transaction.hash.toHex() + "-" + event.logIndex.toString()
    );
    signature.campaign = event.params.baal.toHexString();
    signature.timestamp = event.block.timestamp;
    signature.user = event.params.contributorAddress;
    signature.save();
  }
}

export function handleInitialized(event: Initialized): void {
  log.info("Initialized: v{}", [event.params.version.toString()]);
}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {
  log.info("OwnershipTransferred: {}", [event.params.newOwner.toHexString()]);
}

export function handleUserSigned(event: UserSigned): void {
  const signature = new Signature(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  );
  signature.campaign = event.params.baal.toHexString();
  signature.timestamp = event.block.timestamp;
  signature.user = event.params.user;
  signature.save();
}

export function handleTargetUpdated(event: TargetUpdated): void {
  const id = event.params.baal.toHexString();
  const campaign = Campaign.load(id);

  if (!campaign) {
    log.error("Campaign {} not found!", [id]);
    return;
  }

  campaign.target = event.params.target;
  campaign.save();
}

export function handleUpgraded(event: Upgraded): void {
  log.info("Upgraded: {}", [event.params.implementation.toHexString()]);
}
