/* eslint-disable @typescript-eslint/ban-types */
import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  AdminChanged,
  BeaconUpgraded,
  DonationReceived,
  Initialized,
  TargetUpdated,
  Upgraded
} from "../generated/DeVoxShamanV1/DeVoxShamanV1"

export function createAdminChangedEvent(
  previousAdmin: Address,
  newAdmin: Address
): AdminChanged {
  const adminChangedEvent = changetype<AdminChanged>(newMockEvent())

  adminChangedEvent.parameters = []

  adminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "previousAdmin",
      ethereum.Value.fromAddress(previousAdmin)
    )
  )
  adminChangedEvent.parameters.push(
    new ethereum.EventParam("newAdmin", ethereum.Value.fromAddress(newAdmin))
  )

  return adminChangedEvent
}

export function createBeaconUpgradedEvent(beacon: Address): BeaconUpgraded {
  const beaconUpgradedEvent = changetype<BeaconUpgraded>(newMockEvent())

  beaconUpgradedEvent.parameters = []

  beaconUpgradedEvent.parameters.push(
    new ethereum.EventParam("beacon", ethereum.Value.fromAddress(beacon))
  )

  return beaconUpgradedEvent
}

export function createDonationReceivedEvent(
  contributorAddress: Address,
  baal: Address,
  amount: BigInt,
  total: BigInt,
  target: BigInt,
  balance: BigInt,
  lootIssued: BigInt,
  sharesIssued: BigInt,
  message: string
): DonationReceived {
  const donationReceivedEvent = changetype<DonationReceived>(newMockEvent())

  donationReceivedEvent.parameters = []

  donationReceivedEvent.parameters.push(
    new ethereum.EventParam(
      "contributorAddress",
      ethereum.Value.fromAddress(contributorAddress)
    )
  )
  donationReceivedEvent.parameters.push(
    new ethereum.EventParam("baal", ethereum.Value.fromAddress(baal))
  )
  donationReceivedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  donationReceivedEvent.parameters.push(
    new ethereum.EventParam("total", ethereum.Value.fromUnsignedBigInt(total))
  )
  donationReceivedEvent.parameters.push(
    new ethereum.EventParam("target", ethereum.Value.fromUnsignedBigInt(target))
  )
  donationReceivedEvent.parameters.push(
    new ethereum.EventParam(
      "balance",
      ethereum.Value.fromUnsignedBigInt(balance)
    )
  )
  donationReceivedEvent.parameters.push(
    new ethereum.EventParam(
      "lootIssued",
      ethereum.Value.fromUnsignedBigInt(lootIssued)
    )
  )
  donationReceivedEvent.parameters.push(
    new ethereum.EventParam(
      "sharesIssued",
      ethereum.Value.fromUnsignedBigInt(sharesIssued)
    )
  )
  donationReceivedEvent.parameters.push(
    new ethereum.EventParam("message", ethereum.Value.fromString(message))
  )

  return donationReceivedEvent
}

export function createInitializedEvent(version: i32): Initialized {
  const initializedEvent = changetype<Initialized>(newMockEvent())

  initializedEvent.parameters = []

  initializedEvent.parameters.push(
    new ethereum.EventParam(
      "version",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(version))
    )
  )

  return initializedEvent
}

export function createTargetUpdatedEvent(
  target: BigInt,
  balance: BigInt
): TargetUpdated {
  const targetUpdatedEvent = changetype<TargetUpdated>(newMockEvent())

  targetUpdatedEvent.parameters = []

  targetUpdatedEvent.parameters.push(
    new ethereum.EventParam("target", ethereum.Value.fromUnsignedBigInt(target))
  )
  targetUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "balance",
      ethereum.Value.fromUnsignedBigInt(balance)
    )
  )

  return targetUpdatedEvent
}

export function createUpgradedEvent(implementation: Address): Upgraded {
  const upgradedEvent = changetype<Upgraded>(newMockEvent())

  upgradedEvent.parameters = []

  upgradedEvent.parameters.push(
    new ethereum.EventParam(
      "implementation",
      ethereum.Value.fromAddress(implementation)
    )
  )

  return upgradedEvent
}
