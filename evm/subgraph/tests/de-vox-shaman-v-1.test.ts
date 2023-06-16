import { Address, BigInt } from "@graphprotocol/graph-ts";
import {
  assert,
  beforeEach,
  clearStore,
  describe,
  test,
} from "matchstick-as/assembly/index";

import { Campaign, Donation } from "../generated/schema";
import {
  handleDonationReceived,
  handleTargetUpdated,
} from "../src/de-vox-shaman-v-1";
import {
  createDonationReceivedEvent,
  createTargetUpdatedEvent,
} from "./de-vox-shaman-v-1-utils";

describe("DeVoxShamanV1", () => {
  beforeEach(() => {
    clearStore();

    const baalAddress = Address.fromString(
      "0x90F9ac6B6dD860d4E40976eb6De6d6580Cc7e94D"
    );
    const shamanAddress = Address.fromString(
      "0x90F9ac6B6dD860d4E40976eb6De6d6580Cc7e94D"
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
    // prepare
    const baalAddress = Address.fromString(
      "0x90F9ac6B6dD860d4E40976eb6De6d6580Cc7e94D"
    );
    const shamanAddress = Address.fromString(
      "0x90F9ac6B6dD860d4E40976eb6De6d6580Cc7e94D"
    );
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
      amount,
      total,
      target,
      balance,
      lootIssued,
      sharesIssued,
      message
    );
    event.transaction.from = shamanAddress;

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
    assert.fieldEquals("Donation", donationId, "message", message);
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
      event.transaction.from.toHexString()
    );
  });

  test("Target updated", () => {
    // prepare
    const shamanAddress = Address.fromString(
      "0x90F9ac6B6dD860d4E40976eb6De6d6580Cc7e94D"
    );
    const target = BigInt.fromI32(99999999);
    const balance = BigInt.fromI32(623452);
    const event = createTargetUpdatedEvent(target, balance);
    event.transaction.from = shamanAddress;

    // act
    handleTargetUpdated(event);

    // assert
    assert.entityCount("Campaign", 1);
    const campaign = Campaign.load(shamanAddress.toHexString());
    assert.assertNotNull(campaign);
    if (!campaign) {
      return;
    }
    assert.bigIntEquals(target, campaign.target);
  });
});
