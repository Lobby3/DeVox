import { Address, BigInt } from "@graphprotocol/graph-ts";
import { describe, test } from "matchstick-as/assembly/index";

import {
  handleAdminChanged,
  handleBeaconUpgraded,
  handleSummonBaal,
} from "../src/baal-summoner";
import {
  createAdminChangedEvent,
  createBeaconUpgradedEvent,
  createSummonBaalEvent,
} from "./baal-summoner-utils";

describe("BaalSummoner", () => {
  test("AdminChanged event", () => {
    // arrange
    const previousAdmin = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    );
    const newAdmin = Address.fromString(
      "0x0000000000000000000000000000000000000011"
    );
    const newAdminChangedEvent = createAdminChangedEvent(
      previousAdmin,
      newAdmin
    );

    // act
    handleAdminChanged(newAdminChangedEvent);
  });

  test("BeaconUpgraded event", () => {
    // arrange
    const beacon = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    );
    const newBeaconUpgradedEvent = createBeaconUpgradedEvent(beacon);

    // act
    handleBeaconUpgraded(newBeaconUpgradedEvent);
  });

  test("SummonBaal event", () => {
    // arrange
    const baal = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    );
    const loot = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    );
    const shares = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    );
    const safe = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    );
    const forwarder = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    );
    const existingAddrs = BigInt.fromI32(1);
    const newSummonBaalEvent = createSummonBaalEvent(
      baal,
      loot,
      shares,
      safe,
      forwarder,
      existingAddrs
    );

    // act
    handleSummonBaal(newSummonBaalEvent);
  });
});
