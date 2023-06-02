import { Address, BigInt, ByteArray, Bytes } from "@graphprotocol/graph-ts";
import {
  afterAll,
  assert,
  beforeAll,
  clearStore,
  describe,
  test,
} from "matchstick-as/assembly/index";

import { Campaign } from "../generated/schema";
import { handleSummonComplete } from "../src/de-vox-shaman-summoner-v-1";
import { createSummonCompleteEvent } from "./de-vox-shaman-summoner-v-1-utils";

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("DeVoxShamanSummoner", () => {
  beforeAll(() => {
    let baalAddress = Address.fromString(
      "0x30504cF0949CF6022557754A2163e9E98C34F347"
    );
    let shamanAddress = Address.fromString(
      "0x9Ad002f87c50170DEfcA4B6b93180Eb86F44E288"
    );
    let tokenAddress = Address.fromString(
      "0xdF92fA61868DC84c94D2Af646b4dBe8c6a3f5454"
    );
    let id = BigInt.fromI32(11);
    let pricePerUnit = BigInt.fromI32(1000000);
    let tokensPerUnit = BigInt.fromI32(100);
    let target = BigInt.fromI32(100000);
    let name = "Test Campaign";
    let newSummonCompleteEvent = createSummonCompleteEvent(
      baalAddress,
      shamanAddress,
      tokenAddress,
      id,
      pricePerUnit,
      tokensPerUnit,
      target,
      name
    );
    handleSummonComplete(newSummonCompleteEvent);
  });

  afterAll(() => {
    clearStore();
  });

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("Campaign created and stored", () => {
    assert.entityCount("Campaign", 1);
    let campaign = Campaign.load("11");
    assert.assertTrue(campaign != null);
    assert.bytesEquals(
      campaign!.baalAddress,
      Bytes.fromHexString("0x30504cF0949CF6022557754A2163e9E98C34F347")
    );
    assert.bytesEquals(
      campaign!.shamanAddress,
      Bytes.fromHexString("0x9Ad002f87c50170DEfcA4B6b93180Eb86F44E288")
    );
    assert.bytesEquals(
      campaign!.baalAddress,
      Bytes.fromHexString("0x30504cF0949CF6022557754A2163e9E98C34F347")
    );
    assert.bigIntEquals(campaign!.pricePerUnit, BigInt.fromI32(1000000));
    assert.bigIntEquals(campaign!.tokensPerUnit, BigInt.fromI32(100));
    assert.bigIntEquals(campaign!.target, BigInt.fromI32(100000));
    assert.stringEquals(campaign!.name, "Test Campaign");

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  });
});
