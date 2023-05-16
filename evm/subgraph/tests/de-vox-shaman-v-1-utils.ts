import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  AdminChanged,
  BeaconUpgraded,
  DonationReceived,
  Initialized,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked,
  TargetUpdated,
  Upgraded
} from "../generated/DeVoxShamanV1/DeVoxShamanV1"

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
  let donationReceivedEvent = changetype<DonationReceived>(newMockEvent())

  donationReceivedEvent.parameters = new Array()

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

export function createRoleAdminChangedEvent(
  role: Bytes,
  previousAdminRole: Bytes,
  newAdminRole: Bytes
): RoleAdminChanged {
  let roleAdminChangedEvent = changetype<RoleAdminChanged>(newMockEvent())

  roleAdminChangedEvent.parameters = new Array()

  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "previousAdminRole",
      ethereum.Value.fromFixedBytes(previousAdminRole)
    )
  )
  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "newAdminRole",
      ethereum.Value.fromFixedBytes(newAdminRole)
    )
  )

  return roleAdminChangedEvent
}

export function createRoleGrantedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RoleGranted {
  let roleGrantedEvent = changetype<RoleGranted>(newMockEvent())

  roleGrantedEvent.parameters = new Array()

  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return roleGrantedEvent
}

export function createRoleRevokedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RoleRevoked {
  let roleRevokedEvent = changetype<RoleRevoked>(newMockEvent())

  roleRevokedEvent.parameters = new Array()

  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return roleRevokedEvent
}

export function createTargetUpdatedEvent(
  target: BigInt,
  balance: BigInt
): TargetUpdated {
  let targetUpdatedEvent = changetype<TargetUpdated>(newMockEvent())

  targetUpdatedEvent.parameters = new Array()

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
