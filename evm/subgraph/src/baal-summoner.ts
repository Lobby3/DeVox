/* eslint-disable @typescript-eslint/no-unused-vars */
import { log } from "@graphprotocol/graph-ts";

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

export function handleAdminChanged(event: AdminChanged): void {
  log.info("AdminChanged: {}", [event.params.newAdmin.toHexString()]);
}

export function handleBeaconUpgraded(event: BeaconUpgraded): void {
  log.info("BeaconUpgraded: {}", [event.params.beacon.toHexString()]);
}

export function handleDaoReferral(event: DaoReferral): void {
  log.info("DaoReferral: daoAddress={} referrer={}", [
    event.params.daoAddress.toHexString(),
    event.params.referrer.toHexString(),
  ]);
}

export function handleDeployBaalSafe(event: DeployBaalSafe): void {
  log.info("DeployBaalSafe: baalSafe={} moduleAddr={}", [
    event.params.baalSafe.toHexString(),
    event.params.moduleAddr.toHexString(),
  ]);
}

export function handleDeployBaalTokens(event: DeployBaalTokens): void {
  log.info("DeployBaalTokens: loot={} shares={}", [
    event.params.lootToken.toHexString(),
    event.params.sharesToken.toHexString(),
  ]);
}

export function handleInitialized(event: Initialized): void {
  log.info("Initialized: v{}", [event.params.version.toString()]);
}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {
  log.info("OwnershipTransferred: {}", [event.params.newOwner.toHexString()]);
}

export function handleSetAddrsVersion(event: SetAddrsVersion): void {
  log.info("SetAddrsVersion: {}", [event.params.version.toString()]);
}

export function handleSummonBaal(event: SummonBaal): void {
  log.info("SummonBaal: {}", [event.params.baal.toHexString()]);
}

export function handleUpgraded(event: Upgraded): void {
  log.info("Upgraded: {}", [event.params.implementation.toHexString()]);
}
