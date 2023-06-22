import { log } from "matchstick-as";

import { Campaign, Donation, User } from "../generated/schema";
import {
  AdminChanged,
  BeaconUpgraded,
  DonationReceived,
  Initialized,
  TargetUpdated,
  Upgraded,
  UserWhitelisted,
} from "../generated/templates/DeVoxShamanV1/DeVoxShamanV1";

export function handleAdminChanged(event: AdminChanged): void {
  log.info("AdminChanged: {}", [event.params.newAdmin.toHexString()]);
}

export function handleBeaconUpgraded(event: BeaconUpgraded): void {
  log.info("BeaconUpgraded: {}", [event.params.beacon.toHexString()]);
}

export function handleDonationReceived(event: DonationReceived): void {
  const donation = new Donation(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  );
  const campaignId = event.params.baal.toHexString();

  const campaign = Campaign.load(campaignId);
  if (!campaign) {
    log.error("Campaign {} not found!", [campaignId]);
    return;
  }

  donation.campaign = campaignId;
  donation.amount = event.params.amount;
  donation.loot = event.params.lootIssued;
  donation.shares = event.params.sharesIssued;
  donation.message = event.params.message;
  donation.user = event.params.contributorAddress;
  donation.timestamp = event.block.timestamp;
  donation.save();

  // campaign.total = campaign.total.plus(event.params.amount);
  // campaign.save();
}

export function handleInitialized(event: Initialized): void {
  log.info("Initialized: v{}", [event.params.version.toString()]);
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

export function handleUserWhitelisted(event: UserWhitelisted): void {
  if (event.params.status) {
    let user = User.load(event.params.user);
    if (!user) {
      user = new User(event.params.user);
    }
    user.metadata = event.params.metadata;
    user.save();

    // const id = event.transaction.from.toHexString();
    // const campaign = Campaign.load(id);

    // if (!campaign) {
    //   log.error("Campaign not found!", [id]);
    //   return;
    // }

    // campaign.users.push(event.params.user);
    // campaign.save();
  }
  // else {
  // const user = User.load(event.params.user);
  // if (!user) {
  //   log.error("User {} not found!", [event.params.user.toHexString()]);
  //   return;
  // }
  // user.metadata = event.params.metadata;
  // user.save();

  // const id = event.transaction.from.toHexString();
  // const campaign = Campaign.load(id);
  // if (!campaign) {
  //   log.error("Campaign {} not found!", [id]);
  //   return;
  // }

  // remove user from campaign
  // for (let i = campaign.users.indexOf(event.params.user); i < campaign.users.length - 1; i++) {
  //   campaign.users[i] = campaign.users[i + 1];
  // }
  // campaign.users.pop();
  // campaign.save();
  // }
}

export function handleUpgraded(event: Upgraded): void {
  log.info("Upgraded: {}", [event.params.implementation.toHexString()]);
}
