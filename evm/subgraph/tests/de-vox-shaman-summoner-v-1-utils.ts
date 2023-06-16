/* eslint-disable @typescript-eslint/ban-types */
import { Address, BigInt, ethereum } from "@graphprotocol/graph-ts";
import { newMockEvent } from "matchstick-as";

import {
  AdminChanged,
  BeaconUpgraded,
  Initialized,
  OwnershipTransferred,
  SummonComplete,
  Upgraded,
} from "../generated/DeVoxShamanSummonerV1/DeVoxShamanSummonerV1";

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

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  const ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  );

  ownershipTransferredEvent.parameters = [];

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  );
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  );

  return ownershipTransferredEvent;
}

export function createSummonCompleteEvent(
  baal: Address,
  shaman: Address,
  token: Address,
  id: BigInt,
  pricePerUnit: BigInt,
  tokensPerUnit: BigInt,
  target: BigInt,
  name: string
): SummonComplete {
  const summonCompleteEvent = changetype<SummonComplete>(newMockEvent());

  summonCompleteEvent.parameters = [];

  summonCompleteEvent.parameters.push(
    new ethereum.EventParam("baal", ethereum.Value.fromAddress(baal))
  );
  summonCompleteEvent.parameters.push(
    new ethereum.EventParam("shaman", ethereum.Value.fromAddress(shaman))
  );
  summonCompleteEvent.parameters.push(
    new ethereum.EventParam("token", ethereum.Value.fromAddress(token))
  );
  summonCompleteEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  );
  summonCompleteEvent.parameters.push(
    new ethereum.EventParam(
      "pricePerUnit",
      ethereum.Value.fromUnsignedBigInt(pricePerUnit)
    )
  );
  summonCompleteEvent.parameters.push(
    new ethereum.EventParam(
      "tokensPerUnit",
      ethereum.Value.fromUnsignedBigInt(tokensPerUnit)
    )
  );
  summonCompleteEvent.parameters.push(
    new ethereum.EventParam("target", ethereum.Value.fromUnsignedBigInt(target))
  );
  summonCompleteEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  );

  return summonCompleteEvent;
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
