/* eslint-disable @typescript-eslint/ban-types */
import { Address, BigInt, Bytes, ethereum } from "@graphprotocol/graph-ts";
import { newMockEvent } from "matchstick-as";

import {
  AdminChanged,
  BeaconUpgraded,
  Initialized,
  Upgraded,
  UserRemoved,
  UserSaved,
} from "../generated/DeVoxUserRegistryV0/DeVoxUserRegistryV0";

export function createAdminChangedEvent(
  previousAdmin: Address,
  newAdmin: Address
): AdminChanged {
  const adminChangedEvent = changetype<AdminChanged>(newMockEvent());

  adminChangedEvent.parameters = [];

  adminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "previousAdmin",
      ethereum.Value.fromAddress(previousAdmin)
    )
  );
  adminChangedEvent.parameters.push(
    new ethereum.EventParam("newAdmin", ethereum.Value.fromAddress(newAdmin))
  );

  return adminChangedEvent;
}

export function createBeaconUpgradedEvent(beacon: Address): BeaconUpgraded {
  const beaconUpgradedEvent = changetype<BeaconUpgraded>(newMockEvent());

  beaconUpgradedEvent.parameters = [];

  beaconUpgradedEvent.parameters.push(
    new ethereum.EventParam("beacon", ethereum.Value.fromAddress(beacon))
  );

  return beaconUpgradedEvent;
}

export function createInitializedEvent(version: i32): Initialized {
  const initializedEvent = changetype<Initialized>(newMockEvent());

  initializedEvent.parameters = [];

  initializedEvent.parameters.push(
    new ethereum.EventParam(
      "version",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(version))
    )
  );

  return initializedEvent;
}

export function createUpgradedEvent(implementation: Address): Upgraded {
  const upgradedEvent = changetype<Upgraded>(newMockEvent());

  upgradedEvent.parameters = [];

  upgradedEvent.parameters.push(
    new ethereum.EventParam(
      "implementation",
      ethereum.Value.fromAddress(implementation)
    )
  );

  return upgradedEvent;
}

export function createUserSavedEvent(
  user: Address,
  metadata: Bytes
): UserSaved {
  const userAddedEvent = changetype<UserSaved>(newMockEvent());

  userAddedEvent.parameters = [];

  userAddedEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  );

  userAddedEvent.parameters.push(
    new ethereum.EventParam("metadata", ethereum.Value.fromBytes(metadata))
  );

  return userAddedEvent;
}

export function createUserRemovedEvent(user: Address): UserRemoved {
  const userRemovedEvent = changetype<UserRemoved>(newMockEvent());

  userRemovedEvent.parameters = [];

  userRemovedEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  );

  return userRemovedEvent;
}
