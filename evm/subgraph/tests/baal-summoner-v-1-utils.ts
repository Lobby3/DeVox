import { newMockEvent } from "matchstick-as"
import { ethereum, Address, Bytes, BigInt } from "@graphprotocol/graph-ts"
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
  Upgraded
} from "../generated/BaalSummonerV1/BaalSummonerV1"

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

export function createDaoReferralEvent(
  referrer: Bytes,
  daoAddress: Address
): DaoReferral {
  let daoReferralEvent = changetype<DaoReferral>(newMockEvent())

  daoReferralEvent.parameters = new Array()

  daoReferralEvent.parameters.push(
    new ethereum.EventParam("referrer", ethereum.Value.fromFixedBytes(referrer))
  )
  daoReferralEvent.parameters.push(
    new ethereum.EventParam(
      "daoAddress",
      ethereum.Value.fromAddress(daoAddress)
    )
  )

  return daoReferralEvent
}

export function createDeployBaalSafeEvent(
  baalSafe: Address,
  moduleAddr: Address
): DeployBaalSafe {
  let deployBaalSafeEvent = changetype<DeployBaalSafe>(newMockEvent())

  deployBaalSafeEvent.parameters = new Array()

  deployBaalSafeEvent.parameters.push(
    new ethereum.EventParam("baalSafe", ethereum.Value.fromAddress(baalSafe))
  )
  deployBaalSafeEvent.parameters.push(
    new ethereum.EventParam(
      "moduleAddr",
      ethereum.Value.fromAddress(moduleAddr)
    )
  )

  return deployBaalSafeEvent
}

export function createDeployBaalTokensEvent(
  lootToken: Address,
  sharesToken: Address
): DeployBaalTokens {
  let deployBaalTokensEvent = changetype<DeployBaalTokens>(newMockEvent())

  deployBaalTokensEvent.parameters = new Array()

  deployBaalTokensEvent.parameters.push(
    new ethereum.EventParam("lootToken", ethereum.Value.fromAddress(lootToken))
  )
  deployBaalTokensEvent.parameters.push(
    new ethereum.EventParam(
      "sharesToken",
      ethereum.Value.fromAddress(sharesToken)
    )
  )

  return deployBaalTokensEvent
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

export function createSetAddrsVersionEvent(version: BigInt): SetAddrsVersion {
  let setAddrsVersionEvent = changetype<SetAddrsVersion>(newMockEvent())

  setAddrsVersionEvent.parameters = new Array()

  setAddrsVersionEvent.parameters.push(
    new ethereum.EventParam(
      "version",
      ethereum.Value.fromUnsignedBigInt(version)
    )
  )

  return setAddrsVersionEvent
}

export function createSummonBaalEvent(
  baal: Address,
  loot: Address,
  shares: Address,
  safe: Address,
  forwarder: Address,
  existingAddrs: BigInt
): SummonBaal {
  let summonBaalEvent = changetype<SummonBaal>(newMockEvent())

  summonBaalEvent.parameters = new Array()

  summonBaalEvent.parameters.push(
    new ethereum.EventParam("baal", ethereum.Value.fromAddress(baal))
  )
  summonBaalEvent.parameters.push(
    new ethereum.EventParam("loot", ethereum.Value.fromAddress(loot))
  )
  summonBaalEvent.parameters.push(
    new ethereum.EventParam("shares", ethereum.Value.fromAddress(shares))
  )
  summonBaalEvent.parameters.push(
    new ethereum.EventParam("safe", ethereum.Value.fromAddress(safe))
  )
  summonBaalEvent.parameters.push(
    new ethereum.EventParam("forwarder", ethereum.Value.fromAddress(forwarder))
  )
  summonBaalEvent.parameters.push(
    new ethereum.EventParam(
      "existingAddrs",
      ethereum.Value.fromUnsignedBigInt(existingAddrs)
    )
  )

  return summonBaalEvent
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
