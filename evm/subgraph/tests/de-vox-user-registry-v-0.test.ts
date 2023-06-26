import { Address, Bytes } from "@graphprotocol/graph-ts";
import {
  assert,
  beforeAll,
  clearStore,
  describe,
  test,
} from "matchstick-as/assembly/index";

import { User } from "../generated/schema";
import {
  handleUserRemoved,
  handleUserSaved,
} from "../src/de-vox-user-registry-v-0";
import {
  createUserRemovedEvent,
  createUserSavedEvent,
} from "./de-vox-user-registry-v-0-utils";

describe("DeVoxUserRegistryV0", () => {
  beforeAll(clearStore);

  test("User saved", () => {
    // arrange
    const userAddress = Address.fromString(
      "0x65Fc100DD791746B5945609373e5311dd0C77545"
    );
    const metadata1 = Bytes.fromHexString("0x1234");
    const event1 = createUserSavedEvent(userAddress, metadata1);

    // act
    handleUserSaved(event1);

    // assert
    assert.entityCount("User", 1);
    const user1 = User.load(userAddress);
    assert.assertNotNull(user1);
    if (!user1) {
      return;
    }
    assert.bytesEquals(metadata1, user1.metadata);

    // arrange
    const metadata2 = Bytes.fromHexString("0x5678");
    const event2 = createUserSavedEvent(userAddress, metadata2);

    // act
    handleUserSaved(event2);

    // assert
    assert.entityCount("User", 1);
    const user2 = User.load(userAddress);
    assert.assertNotNull(user2);
    if (!user2) {
      return;
    }
    assert.bytesEquals(metadata2, user2.metadata);
  });

  test("User removed", () => {
    // arrange
    const userAddress = Address.fromString(
      "0x65Fc100DD791746B5945609373e5311dd0C77545"
    );
    const metadata = Bytes.fromHexString("0x1234");
    const event = createUserSavedEvent(userAddress, metadata);

    handleUserSaved(event);

    const removeEvent = createUserRemovedEvent(userAddress);

    // act
    handleUserRemoved(removeEvent);

    assert.entityCount("User", 0);
  });
});
