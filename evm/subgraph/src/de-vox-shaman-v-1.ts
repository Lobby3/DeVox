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
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = Campaign.load(event.transaction.from);

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new Campaign(event.transaction.from);
  }

  // Entities can be written to the store with `.save()`
  entity.save();
}

export function handleUpgraded(event: Upgraded): void {}
