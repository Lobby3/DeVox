/* eslint-disable @typescript-eslint/ban-types */
import { Address, BigInt, ethereum } from "@graphprotocol/graph-ts";
import { newMockEvent } from "matchstick-as";

import {
  AdminChanged,
  BeaconUpgraded,
  DonationReceived,
  Initialized,
  TargetUpdated,
  Upgraded,
  UserSigned,
} from "../generated/templates/DeVoxShamanV1/DeVoxShamanV1";

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

export function createDonationReceivedEvent(
  contributorAddress: Address,
  baal: Address,
  id: BigInt,
  amount: BigInt,
  total: BigInt,
  lootIssued: BigInt,
  sharesIssued: BigInt,
  signedCampaign: boolean,
  message: string
): DonationReceived {
  const donationReceivedEvent = changetype<DonationReceived>(newMockEvent());

  donationReceivedEvent.parameters = [];

  donationReceivedEvent.parameters.push(
    new ethereum.EventParam(
      "contributorAddress",
      ethereum.Value.fromAddress(contributorAddress)
    )
  );
  donationReceivedEvent.parameters.push(
    new ethereum.EventParam("baal", ethereum.Value.fromAddress(baal))
  );
  donationReceivedEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  );
  donationReceivedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  );
  donationReceivedEvent.parameters.push(
    new ethereum.EventParam("total", ethereum.Value.fromUnsignedBigInt(total))
  );
  donationReceivedEvent.parameters.push(
    new ethereum.EventParam(
      "lootIssued",
      ethereum.Value.fromUnsignedBigInt(lootIssued)
    )
  );
  donationReceivedEvent.parameters.push(
    new ethereum.EventParam(
      "sharesIssued",
      ethereum.Value.fromUnsignedBigInt(sharesIssued)
    )
  );
  donationReceivedEvent.parameters.push(
    new ethereum.EventParam(
      "signedCampaign",
      ethereum.Value.fromBoolean(signedCampaign)
    )
  );
  donationReceivedEvent.parameters.push(
    new ethereum.EventParam("message", ethereum.Value.fromString(message))
  );

  return donationReceivedEvent;
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

export function createSignedEvent(
  user: Address,
  baal: Address,
  id: BigInt
): UserSigned {
  const signedEvent = changetype<UserSigned>(newMockEvent());

  signedEvent.parameters = [];

  signedEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  );

  signedEvent.parameters.push(
    new ethereum.EventParam("baal", ethereum.Value.fromAddress(baal))
  );

  signedEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  );

  return signedEvent;
}

export function createTargetUpdatedEvent(
  baal: Address,
  id: BigInt,
  target: BigInt,
  balance: BigInt
): TargetUpdated {
  const targetUpdatedEvent = changetype<TargetUpdated>(newMockEvent());

  targetUpdatedEvent.parameters = [];

  targetUpdatedEvent.parameters.push(
    new ethereum.EventParam("baal", ethereum.Value.fromAddress(baal))
  );

  targetUpdatedEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  );

  targetUpdatedEvent.parameters.push(
    new ethereum.EventParam("target", ethereum.Value.fromUnsignedBigInt(target))
  );
  targetUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "balance",
      ethereum.Value.fromUnsignedBigInt(balance)
    )
  );

  return targetUpdatedEvent;
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
