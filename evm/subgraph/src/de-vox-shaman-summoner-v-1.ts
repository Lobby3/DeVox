import { BigInt } from "@graphprotocol/graph-ts";

import { BeaconUpgraded, Initialized, OwnershipTransferred, SummonComplete, Upgraded } from "../generated/DeVoxShamanSummonerV1/DeVoxShamanSummonerV1";
import { Campaign } from "../generated/schema";
import { Baal, DeVoxShamanV1 } from "../generated/templates";

export function handleBeaconUpgraded(event: BeaconUpgraded): void {
  // ignore
}

export function handleInitialized(event: Initialized): void {
  // ignore
}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {
  // ignore
}

export function handleSummonComplete(event: SummonComplete): void {
  DeVoxShamanV1.create(event.params.shaman);
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
  // ignore
}
