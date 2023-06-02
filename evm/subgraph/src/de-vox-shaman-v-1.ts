import { BigInt } from "@graphprotocol/graph-ts";

import {
  AdminChanged,
  BeaconUpgraded,
  DeVoxShamanV1,
  DonationReceived,
  Initialized,
  TargetUpdated,
  Upgraded,
} from "../generated/DeVoxShamanV1/DeVoxShamanV1";
import { Campaign } from "../generated/schema";

export function handleAdminChanged(event: AdminChanged): void {}

export function handleBeaconUpgraded(event: BeaconUpgraded): void {}

export function handleDonationReceived(event: DonationReceived): void {}

export function handleInitialized(event: Initialized): void {}

export function handleTargetUpdated(event: TargetUpdated): void {
  let campaign = Campaign.load(event.params.id.toString());

  if (!campaign) {
    console.error("Campaign not found!");
    return;
  }

  campaign.target = event.params.target;

  campaign.save();
}

export function handleUpgraded(event: Upgraded): void {}
