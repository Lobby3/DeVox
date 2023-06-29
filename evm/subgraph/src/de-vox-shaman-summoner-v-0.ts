import { BigInt, log } from "@graphprotocol/graph-ts";

import {
  BeaconUpgraded,
  Initialized,
  OwnershipTransferred,
  SummonComplete,
  Upgraded,
} from "../generated/DeVoxShamanSummonerV0/DeVoxShamanSummonerV0";
import { Campaign } from "../generated/schema";
import { Baal, DeVoxShamanV0 } from "../generated/templates";

export function handleBeaconUpgraded(event: BeaconUpgraded): void {
  log.info("BeaconUpgraded: {}", [event.params.beacon.toHexString()]);
}

export function handleInitialized(event: Initialized): void {
  log.info("Initialized: v{}", [event.params.version.toString()]);
}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {
  log.info("OwnershipTransferred: {}", [event.params.newOwner.toHexString()]);
}

export function handleSummonComplete(event: SummonComplete): void {
  DeVoxShamanV0.create(event.params.shaman);
  Baal.create(event.params.baal);

  const campaign = new Campaign(event.params.baal.toHexString());
  campaign.baalAddress = event.params.baal;
  campaign.shamanAddress = event.params.shaman;
  campaign.tokenAddress = event.params.token;
  campaign.pricePerUnit = event.params.pricePerUnit;
  campaign.tokensPerUnit = event.params.tokensPerUnit;
  campaign.target = event.params.target;
  campaign.name = event.params.name;
  campaign.total = BigInt.fromI32(0);
  campaign.save();
}

export function handleUpgraded(event: Upgraded): void {
  log.info("Upgraded: {}", [event.params.implementation.toHexString()]);
}
