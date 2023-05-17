import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  AdminChanged,
  BeaconUpgraded,
  Initialized,
  OwnershipTransferred,
  SummonComplete,
  Upgraded
} from "../generated/DeVoxShamanSummonerV1/DeVoxShamanSummonerV1"

export function createAdminChangedEvent(
  previousAdmin: Address,
  newAdmin: Address
): AdminChanged {
  let adminChangedEvent = changetype<AdminChanged>(newMockEvent())

  adminChangedEvent.parameters = new Array()

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
  let beaconUpgradedEvent = changetype<BeaconUpgraded>(newMockEvent())

  beaconUpgradedEvent.parameters = new Array()

  beaconUpgradedEvent.parameters.push(
    new ethereum.EventParam("beacon", ethereum.Value.fromAddress(beacon))
  )

  return beaconUpgradedEvent
}

export function createInitializedEvent(version: i32): Initialized {
  let initializedEvent = changetype<Initialized>(newMockEvent())

  initializedEvent.parameters = new Array()

  initializedEvent.parameters.push(
    new ethereum.EventParam(
      "version",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(version))
    )
  )

  return initializedEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createSummonCompleteEvent(
  baal: Address,
  shaman: Address,
  token: Address,
  pricePerUnit: BigInt,
  lootPerUnit: BigInt,
  sharesPerMember: BigInt,
  target: BigInt
): SummonComplete {
  let summonCompleteEvent = changetype<SummonComplete>(newMockEvent())

  summonCompleteEvent.parameters = new Array()

  summonCompleteEvent.parameters.push(
    new ethereum.EventParam("baal", ethereum.Value.fromAddress(baal))
  )
  summonCompleteEvent.parameters.push(
    new ethereum.EventParam("shaman", ethereum.Value.fromAddress(shaman))
  )
  summonCompleteEvent.parameters.push(
    new ethereum.EventParam("token", ethereum.Value.fromAddress(token))
  )
  summonCompleteEvent.parameters.push(
    new ethereum.EventParam(
      "pricePerUnit",
      ethereum.Value.fromUnsignedBigInt(pricePerUnit)
    )
  )
  summonCompleteEvent.parameters.push(
    new ethereum.EventParam(
      "lootPerUnit",
      ethereum.Value.fromUnsignedBigInt(lootPerUnit)
    )
  )
  summonCompleteEvent.parameters.push(
    new ethereum.EventParam(
      "sharesPerMember",
      ethereum.Value.fromUnsignedBigInt(sharesPerMember)
    )
  )
  summonCompleteEvent.parameters.push(
    new ethereum.EventParam("target", ethereum.Value.fromUnsignedBigInt(target))
  )

  return summonCompleteEvent
}

export function createUpgradedEvent(implementation: Address): Upgraded {
  let upgradedEvent = changetype<Upgraded>(newMockEvent())

  upgradedEvent.parameters = new Array()

  upgradedEvent.parameters.push(
    new ethereum.EventParam(
      "implementation",
      ethereum.Value.fromAddress(implementation)
    )
  )

  return upgradedEvent
}
