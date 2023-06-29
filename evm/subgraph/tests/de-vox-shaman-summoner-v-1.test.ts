import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts";
import { assert, describe, test } from "matchstick-as/assembly/index";

import { Campaign } from "../generated/schema";
import { handleSummonComplete } from "../src/de-vox-shaman-summoner-v-0";
import { createSummonCompleteEvent } from "./de-vox-shaman-summoner-v-1-utils";

describe("DeVoxShamanSummoner", () => {
  test("Campaign created and stored", () => {
    // prepare
    const baalAddress = Address.fromString(
      "0x30504cF0949CF6022557754A2163e9E98C34F347"
    );
    const shamanAddress = Address.fromString(
      "0x9Ad002f87c50170DEfcA4B6b93180Eb86F44E288"
    );
    const tokenAddress = Address.fromString(
      "0xdF92fA61868DC84c94D2Af646b4dBe8c6a3f5454"
    );
    const userRegistryAddress = Address.fromString(
      "0x693f20811a8fEbD0b377d13B5757089441774CDD"
    );
    const id = BigInt.fromI32(11);
    const pricePerUnit = BigInt.fromI32(1000000);
    const tokensPerUnit = BigInt.fromI32(100);
    const target = BigInt.fromI32(100000);
    const name = "Test Campaign";
    const newSummonCompleteEvent = createSummonCompleteEvent(
      baalAddress,
      shamanAddress,
      tokenAddress,
      userRegistryAddress,
      id,
      pricePerUnit,
      tokensPerUnit,
      target,
      name
    );

    // act
    handleSummonComplete(newSummonCompleteEvent);

    // assert
    assert.entityCount("Campaign", 1);
    const campaign = Campaign.load(baalAddress.toHexString());
    assert.assertNotNull(campaign);
    if (campaign == null) {
      return;
    }
    assert.bytesEquals(
      campaign.baalAddress,
      Bytes.fromHexString("0x30504cF0949CF6022557754A2163e9E98C34F347")
    );
    assert.bytesEquals(
      campaign.shamanAddress,
      Bytes.fromHexString("0x9Ad002f87c50170DEfcA4B6b93180Eb86F44E288")
    );
    assert.bytesEquals(
      campaign.baalAddress,
      Bytes.fromHexString("0x30504cF0949CF6022557754A2163e9E98C34F347")
    );
    assert.bigIntEquals(campaign.pricePerUnit, BigInt.fromI32(1000000));
    assert.bigIntEquals(campaign.tokensPerUnit, BigInt.fromI32(100));
    assert.bigIntEquals(campaign.target, BigInt.fromI32(100000));
    assert.stringEquals(campaign.name, "Test Campaign");
  });
});
