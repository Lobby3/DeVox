/* eslint-disable @typescript-eslint/ban-types */
import { Address, BigInt, Bytes, ethereum } from "@graphprotocol/graph-ts";
import { newMockEvent } from "matchstick-as";

import {
  AdminChanged,
  BeaconUpgraded,
  DaoReferral,
  DeployBaalSafe,
  DeployBaalTokens,
  Initialized,
  OwnershipTransferred,
  SetAddrsVersion,
  SummonBaal,
  Upgraded,
} from "../generated/BaalSummoner/BaalSummoner";

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

export function createDaoReferralEvent(
  referrer: Bytes,
  daoAddress: Address
): DaoReferral {
  const daoReferralEvent = changetype<DaoReferral>(newMockEvent());

  daoReferralEvent.parameters = [];

  daoReferralEvent.parameters.push(
    new ethereum.EventParam("referrer", ethereum.Value.fromFixedBytes(referrer))
  );
  daoReferralEvent.parameters.push(
    new ethereum.EventParam(
      "daoAddress",
      ethereum.Value.fromAddress(daoAddress)
    )
  );

  return daoReferralEvent;
}

export function createDeployBaalSafeEvent(
  baalSafe: Address,
  moduleAddr: Address
): DeployBaalSafe {
  const deployBaalSafeEvent = changetype<DeployBaalSafe>(newMockEvent());

  deployBaalSafeEvent.parameters = [];

  deployBaalSafeEvent.parameters.push(
    new ethereum.EventParam("baalSafe", ethereum.Value.fromAddress(baalSafe))
  );
  deployBaalSafeEvent.parameters.push(
    new ethereum.EventParam(
      "moduleAddr",
      ethereum.Value.fromAddress(moduleAddr)
    )
  );

  return deployBaalSafeEvent;
}

export function createDeployBaalTokensEvent(
  lootToken: Address,
  sharesToken: Address
): DeployBaalTokens {
  const deployBaalTokensEvent = changetype<DeployBaalTokens>(newMockEvent());

  deployBaalTokensEvent.parameters = [];

  deployBaalTokensEvent.parameters.push(
    new ethereum.EventParam("lootToken", ethereum.Value.fromAddress(lootToken))
  );
  deployBaalTokensEvent.parameters.push(
    new ethereum.EventParam(
      "sharesToken",
      ethereum.Value.fromAddress(sharesToken)
    )
  );

  return deployBaalTokensEvent;
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

export function createSetAddrsVersionEvent(version: BigInt): SetAddrsVersion {
  const setAddrsVersionEvent = changetype<SetAddrsVersion>(newMockEvent());

  setAddrsVersionEvent.parameters = [];

  setAddrsVersionEvent.parameters.push(
    new ethereum.EventParam(
      "version",
      ethereum.Value.fromUnsignedBigInt(version)
    )
  );

  return setAddrsVersionEvent;
}

export function createSummonBaalEvent(
  baal: Address,
  loot: Address,
  shares: Address,
  safe: Address,
  forwarder: Address,
  existingAddrs: BigInt
): SummonBaal {
  const summonBaalEvent = changetype<SummonBaal>(newMockEvent());

  summonBaalEvent.parameters = [];

  summonBaalEvent.parameters.push(
    new ethereum.EventParam("baal", ethereum.Value.fromAddress(baal))
  );
  summonBaalEvent.parameters.push(
    new ethereum.EventParam("loot", ethereum.Value.fromAddress(loot))
  );
  summonBaalEvent.parameters.push(
    new ethereum.EventParam("shares", ethereum.Value.fromAddress(shares))
  );
  summonBaalEvent.parameters.push(
    new ethereum.EventParam("safe", ethereum.Value.fromAddress(safe))
  );
  summonBaalEvent.parameters.push(
    new ethereum.EventParam("forwarder", ethereum.Value.fromAddress(forwarder))
  );
  summonBaalEvent.parameters.push(
    new ethereum.EventParam(
      "existingAddrs",
      ethereum.Value.fromUnsignedBigInt(existingAddrs)
    )
  );

  return summonBaalEvent;
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
