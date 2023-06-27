import { store } from "@graphprotocol/graph-ts";
import { log } from "matchstick-as";

import {
  BeaconUpgraded,
  Initialized,
  OwnershipTransferred,
  Upgraded,
  UserRemoved,
  UserSaved,
} from "../generated/DeVoxUserRegistryV0/DeVoxUserRegistryV0";
import { User } from "../generated/schema";

export function handleBeaconUpgraded(event: BeaconUpgraded): void {
  log.info("Upgraded: {}", [event.params.beacon.toHexString()]);
}

export function handleInitialized(event: Initialized): void {
  log.info("Initialized: v{}", [event.params.version.toString()]);
}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {
  log.info("OwnershipTransferred: {}", [event.params.newOwner.toHexString()]);
}

export function handleUserSaved(event: UserSaved): void {
  let user = User.load(event.params.user);
  if (!user) {
    user = new User(event.params.user);
  }
  user.metadata = event.params.metadata;
  user.save();
}

export function handleUserRemoved(event: UserRemoved): void {
  store.remove("User", event.params.user.toHexString());
}

export function handleUpgraded(event: Upgraded): void {
  log.info("Upgraded: {}", [event.params.implementation.toHexString()]);
}
