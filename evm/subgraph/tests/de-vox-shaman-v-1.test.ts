import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts";
import {
  assert,
  beforeEach,
  clearStore,
  describe,
  test,
} from "matchstick-as/assembly/index";

import { Campaign, Donation, Signature, User } from "../generated/schema";
import {
  handleDonationReceived,
  handleSigned,
  handleTargetUpdated,
  handleUserWhitelisted,
} from "../src/de-vox-shaman-v-1";
import {
  createDonationReceivedEvent,
  createSignedEvent,
  createTargetUpdatedEvent,
  createUserWhitelistedEvent,
} from "./de-vox-shaman-v-1-utils";

describe("DeVoxShamanV1", () => {
  beforeEach(() => {
    clearStore();

    const baalAddress = Address.fromString(
      "0x90F9ac6B6dD860d4E40976eb6De6d6580Cc7e94D"
    );
    const shamanAddress = Address.fromString(
      "0xEe79604E3D82641D3dE15dEc23E2064786011E94"
    );
    const tokenAddress = Address.fromString(
      "0x11fE4B6AE13d2a6055C8D9cF65c55bac32B5d844"
    );
    const target = BigInt.fromI32(1000000000);
    const campaign = new Campaign(baalAddress.toHexString());
    campaign.name = "test campaign";
    campaign.baalAddress = baalAddress;
    campaign.shamanAddress = shamanAddress;
    campaign.tokenAddress = tokenAddress;
    campaign.pricePerUnit = BigInt.fromI32(1000000);
    campaign.tokensPerUnit = BigInt.fromI32(10000);
    campaign.target = target;
    campaign.total = BigInt.fromI32(0);
    campaign.save();
  });

  test("Donation stored and Campaign updated", () => {
    // arrange
    const baalAddress = Address.fromString(
      "0x90F9ac6B6dD860d4E40976eb6De6d6580Cc7e94D"
    );
    const shamanAddress = Address.fromString(
      "0xEe79604E3D82641D3dE15dEc23E2064786011E94"
    );
    const id = BigInt.fromI32(1);
    const target = BigInt.fromI32(1000000000);
    const contributorAddress = Address.fromString(
      "0x65Fc100DD791746B5945609373e5311dd0C77545"
    );
    const amount = BigInt.fromI32(1234567890);
    const total = BigInt.fromI32(1234567890);
    const balance = BigInt.fromI32(1234567890);
    const lootIssued = BigInt.fromI32(0);
    const sharesIssued = BigInt.fromI32(100);
    const message = "test message";
    const event = createDonationReceivedEvent(
      contributorAddress,
      baalAddress,
      id,
      amount,
      total,
      target,
      balance,
      lootIssued,
      sharesIssued,
      message
    );
    event.address = shamanAddress;

    // act
    handleDonationReceived(event);

    // assert
    assert.entityCount("Donation", 1);
    const donationId =
      event.transaction.hash.toHex() + "-" + event.logIndex.toString();
    const donation = Donation.load(donationId);
    assert.assertNotNull(donation);
    if (!donation) {
      return;
    }
    assert.bigIntEquals(donation.amount, amount);
    assert.bigIntEquals(donation.loot, lootIssued);
    assert.bigIntEquals(donation.shares, sharesIssued);
    assert.fieldEquals(
      "Donation",
      donationId,
      "user",
      contributorAddress.toHexString()
    );
    assert.fieldEquals(
      "Donation",
      donationId,
      "campaign",
      baalAddress.toHexString()
    );

    assert.entityCount("Campaign", 1);
    assert.fieldEquals(
      "Campaign",
      baalAddress.toHexString(),
      "total",
      donation.amount.toString()
    );

    if (message) {
      const messageId = baalAddress.toHexString() + "-" + donationId;
      assert.fieldEquals("Message", messageId, "text", message);
      assert.fieldEquals("Donation", donationId, "message", messageId);
    }
  });

  test("Signed campaign", () => {
    // arrange
    const baalAddress = Address.fromString(
      "0x90F9ac6B6dD860d4E40976eb6De6d6580Cc7e94D"
    );
    const shamanAddress = Address.fromString(
      "0xEe79604E3D82641D3dE15dEc23E2064786011E94"
    );
    const id = BigInt.fromI32(1);
    const contributorAddress = Address.fromString(
      "0x65Fc100DD791746B5945609373e5311dd0C77545"
    );
    const event = createSignedEvent(contributorAddress, baalAddress, id);
    event.address = shamanAddress;

    // act
    handleSigned(event);

    // assert
    assert.entityCount("Signature", 1);
    const signatureId =
      event.transaction.hash.toHex() + "-" + event.logIndex.toString();
    const signature = Signature.load(signatureId);
    assert.assertNotNull(signature);
    if (!signature) {
      return;
    }
    assert.stringEquals(baalAddress.toHexString(), signature.campaign);
    assert.stringEquals(
      contributorAddress.toHexString(),
      signature.user.toHexString()
    );
    assert.bigIntEquals(event.block.timestamp, signature.timestamp);
  });

  test("Target updated", () => {
    // arrange
    const baalAddress = Address.fromString(
      "0x90F9ac6B6dD860d4E40976eb6De6d6580Cc7e94D"
    );
    const shamanAddress = Address.fromString(
      "0xEe79604E3D82641D3dE15dEc23E2064786011E94"
    );
    const id = BigInt.fromI32(1);
    const target = BigInt.fromI32(99999999);
    const balance = BigInt.fromI32(623452);
    const event = createTargetUpdatedEvent(baalAddress, id, target, balance);
    event.address = shamanAddress;

    // act
    handleTargetUpdated(event);

    // assert
    assert.entityCount("Campaign", 1);
    const campaign = Campaign.load(baalAddress.toHexString());
    assert.assertNotNull(campaign);
    if (!campaign) {
      return;
    }
    assert.bigIntEquals(target, campaign.target);
  });

  test("User whitelisted", () => {
    // arrange
    const baalAddress = Address.fromString(
      "0x90F9ac6B6dD860d4E40976eb6De6d6580Cc7e94D"
    );
    const shamanAddress = Address.fromString(
      "0xEe79604E3D82641D3dE15dEc23E2064786011E94"
    );
    const userAddress = Address.fromString(
      "0x65Fc100DD791746B5945609373e5311dd0C77545"
    );
    const id = BigInt.fromI32(1);
    const status = true;
    const metadata = Bytes.fromHexString("0x1234");
    const event = createUserWhitelistedEvent(
      userAddress,
      baalAddress,
      id,
      status,
      metadata
    );
    event.address = shamanAddress;

    // act
    handleUserWhitelisted(event);

    assert.entityCount("User", 1);
    const user = User.load(userAddress);
    assert.assertNotNull(user);
    if (!user) {
      return;
    }
    assert.bytesEquals(metadata, user.metadata);
  });
});
