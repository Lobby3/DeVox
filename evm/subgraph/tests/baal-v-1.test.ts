import {
  Address,
  BigInt,
  Bytes,
  log,
} from "@graphprotocol/graph-ts";
import {
  afterAll,
  assert,
  beforeAll,
  clearStore,
  describe,
  test,
} from "matchstick-as/assembly/index";

import { Proposal, Vote } from "../generated/schema";
import {
  handleCancelProposal,
  handleProcessProposal,
  handleSponsorProposal,
  handleSubmitProposal,
  handleSubmitVote,
} from "../src/baal-v-1";
import {
  createCancelProposalEvent,
  createProcessProposalEvent,
  createSponsorProposalEvent,
  createSubmitProposalEvent,
  createSubmitVoteEvent,
} from "./baal-v-1-utils";

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Baal", () => {
  beforeAll(() => {
    // prepare
  });

  afterAll(() => {
    clearStore();
  });

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("Proposal created and stored", () => {
    // prepare
    const PROPOSAL = "Proposal";
    const proposal = BigInt.fromI32(1);
    const proposalDataHash = Bytes.fromHexString("0x1234");
    const votingPeriod = BigInt.fromI32(100);
    const proposalData = Bytes.fromHexString("0x1234");
    const expiration = BigInt.fromI32(100);
    const baalGas = BigInt.fromI32(100);
    const selfSponsor = false;
    const timestamp = BigInt.fromI32(100);
    const details = "Test Proposal";
    const event = createSubmitProposalEvent(
      proposal,
      proposalDataHash,
      votingPeriod,
      proposalData,
      expiration,
      baalGas,
      selfSponsor,
      timestamp,
      details
    );

    // act
    handleSubmitProposal(event);

    // assert
    assert.entityCount(PROPOSAL, 1);
    const p = Proposal.load(proposal.toString());
    if (!p) {
      log.error("Proposal {} not found", [proposal.toString()]);
      return;
    }
    assert.stringEquals(details, p.details);
    assert.bigIntEquals(expiration, p.expiration);
    assert.booleanEquals(selfSponsor, p.selfSponsor);
    assert.fieldEquals(PROPOSAL, proposal.toString(), "sponsor", "null");
    assert.bigIntEquals(timestamp, p.timestamp);
    assert.bigIntEquals(votingPeriod, p.votingPeriod);
    // assert.fieldEquals(PROPOSAL, proposal.toString(), "votingStarts", "null");
    assert.booleanEquals(false, p.cancelled);
    assert.booleanEquals(false, p.processed);
    assert.booleanEquals(false, p.actionFailed);
    assert.booleanEquals(false, p.expired);
  });

  test("Proposal (self-sponsor) created and stored", () => {
    // prepare
    const PROPOSAL = "Proposal";
    const proposal = BigInt.fromI32(1);
    const proposalDataHash = Bytes.fromHexString("0x1234");
    const votingPeriod = BigInt.fromI32(100);
    const proposalData = Bytes.fromHexString("0x1234");
    const expiration = BigInt.fromI32(100);
    const baalGas = BigInt.fromI32(100);
    const selfSponsor = true;
    const timestamp = BigInt.fromI32(100);
    const details = "Test Proposal";
    const event = createSubmitProposalEvent(
      proposal,
      proposalDataHash,
      votingPeriod,
      proposalData,
      expiration,
      baalGas,
      selfSponsor,
      timestamp,
      details
    );

    // act
    handleSubmitProposal(event);

    // assert
    assert.entityCount(PROPOSAL, 1);
    const p = Proposal.load(proposal.toString());
    if (!p) {
      log.error("Proposal {} not found", [proposal.toString()]);
      return;
    }
    assert.stringEquals(details, p.details);
    assert.bigIntEquals(expiration, p.expiration);
    assert.booleanEquals(selfSponsor, p.selfSponsor);
    assert.fieldEquals(
      PROPOSAL,
      proposal.toString(),
      "sponsor",
      event.transaction.from.toHexString()
    );
    assert.bigIntEquals(timestamp, p.timestamp);
    assert.bigIntEquals(votingPeriod, p.votingPeriod);
    // assert.fieldEquals(PROPOSAL, proposal.toString(), "votingStarts", "null");
    assert.booleanEquals(false, p.cancelled);
    assert.booleanEquals(false, p.processed);
    assert.booleanEquals(false, p.actionFailed);
    assert.booleanEquals(false, p.expired);
  });

  test("Proposal sponsored", () => {
    // prepare
    const PROPOSAL = "Proposal";
    const proposal = BigInt.fromI32(1);
    const proposalDataHash = Bytes.fromHexString("0x1234");
    const votingPeriod = BigInt.fromI32(100);
    const proposalData = Bytes.fromHexString("0x1234");
    const expiration = BigInt.fromI32(100);
    const baalGas = BigInt.fromI32(100);
    const selfSponsor = false;
    const timestamp = BigInt.fromI32(100);
    const details = "Test Proposal";
    const submitProposalEvent = createSubmitProposalEvent(
      proposal,
      proposalDataHash,
      votingPeriod,
      proposalData,
      expiration,
      baalGas,
      selfSponsor,
      timestamp,
      details
    );
    handleSubmitProposal(submitProposalEvent);

    const votingStarts = BigInt.fromI32(100000);
    const member = Address.fromString(
      "0x1a778D84cE296F9aDa3BE4C126bD8eFDfddB9589"
    );
    const sponsorProposalEvent = createSponsorProposalEvent(
      member,
      proposal,
      votingStarts
    );

    // act
    handleSponsorProposal(sponsorProposalEvent);

    // assert
    assert.entityCount(PROPOSAL, 1);
    const p = Proposal.load(proposal.toString());
    if (!p) {
      log.error("Proposal {} not found", [proposal.toString()]);
      return;
    }
    assert.fieldEquals(
      PROPOSAL,
      proposal.toString(),
      "sponsor",
      member.toHexString()
    );
    assert.fieldEquals(
      PROPOSAL,
      proposal.toString(),
      "votingStarts",
      votingStarts.toString()
    );
  });

  test("Proposal cancelled", () => {
    // prepare
    const PROPOSAL = "Proposal";
    const proposal = BigInt.fromI32(1);
    const proposalDataHash = Bytes.fromHexString("0x1234");
    const votingPeriod = BigInt.fromI32(100);
    const proposalData = Bytes.fromHexString("0x1234");
    const expiration = BigInt.fromI32(100);
    const baalGas = BigInt.fromI32(100);
    const selfSponsor = false;
    const timestamp = BigInt.fromI32(100);
    const details = "Test Proposal";
    const submitProposalEvent = createSubmitProposalEvent(
      proposal,
      proposalDataHash,
      votingPeriod,
      proposalData,
      expiration,
      baalGas,
      selfSponsor,
      timestamp,
      details
    );
    handleSubmitProposal(submitProposalEvent);

    const cancelProposalEvent = createCancelProposalEvent(proposal);

    // act
    handleCancelProposal(cancelProposalEvent);

    // assert
    assert.entityCount(PROPOSAL, 1);
    const p = Proposal.load(proposal.toString());
    if (!p) {
      log.error("Proposal {} not found", [proposal.toString()]);
      return;
    }
    assert.booleanEquals(true, p.cancelled);
  });

  test("Proposal processed", () => {
    // prepare
    const PROPOSAL = "Proposal";
    const proposal = BigInt.fromI32(1);
    const proposalDataHash = Bytes.fromHexString("0x1234");
    const votingPeriod = BigInt.fromI32(100);
    const proposalData = Bytes.fromHexString("0x1234");
    const expiration = BigInt.fromI32(100);
    const baalGas = BigInt.fromI32(100);
    const selfSponsor = false;
    const timestamp = BigInt.fromI32(100);
    const details = "Test Proposal";
    const submitProposalEvent = createSubmitProposalEvent(
      proposal,
      proposalDataHash,
      votingPeriod,
      proposalData,
      expiration,
      baalGas,
      selfSponsor,
      timestamp,
      details
    );
    handleSubmitProposal(submitProposalEvent);

    const passed = true;
    const actionFailed = false;
    const processProposalEvent = createProcessProposalEvent(proposal, passed, actionFailed);

    // act
    handleProcessProposal(processProposalEvent);

    // assert
    assert.entityCount(PROPOSAL, 1);
    const p = Proposal.load(proposal.toString());
    if (!p) {
      log.error("Proposal {} not found", [proposal.toString()]);
      return;
    }
    assert.booleanEquals(false, p.cancelled);
    assert.booleanEquals(true, p.processed);
    assert.booleanEquals(passed, p.passed);
    assert.booleanEquals(actionFailed, p.actionFailed);
  });

  test("Vote stored", () => {
    // prepare
    // const PROPOSAL = "Proposal";
    const proposal = BigInt.fromI32(1);
    // const proposalDataHash = Bytes.fromHexString("0x1234");
    // const votingPeriod = BigInt.fromI32(100);
    // const proposalData = Bytes.fromHexString("0x1234");
    // const expiration = BigInt.fromI32(100);
    // const baalGas = BigInt.fromI32(100);
    // const selfSponsor = false;
    // const timestamp = BigInt.fromI32(100);
    // const details = "Test Proposal";
    // const submitProposalEvent = createSubmitProposalEvent(
    //   proposal,
    //   proposalDataHash,
    //   votingPeriod,
    //   proposalData,
    //   expiration,
    //   baalGas,
    //   selfSponsor,
    //   timestamp,
    //   details
    // );
    // handleSubmitProposal(submitProposalEvent);

    const VOTE = "Vote";
    const member = Address.fromString(
      "0x1a778D84cE296F9aDa3BE4C126bD8eFDfddB9589"
    );
    const balance = BigInt.fromI32(100);
    const approved = true;
    const event = createSubmitVoteEvent(member, balance, proposal, approved);

    // act
    handleSubmitVote(event);

    // assert
    assert.entityCount(VOTE, 1);
    const voteId =
      event.transaction.hash.toHexString() + "-" + event.logIndex.toString();
    const v = Vote.load(voteId);
    if (!v) {
      log.error("Vote {} not found", [voteId]);
      return;
    }
    assert.bytesEquals(member, v.user);
    assert.bigIntEquals(balance, v.shares);
    assert.booleanEquals(approved, v.approved);

    // assert.entityCount(PROPOSAL, 1);
    // const p = Proposal.load(proposal.toString());
    // if (!p) {
    //   log.error("Proposal {} not found", [proposal.toString()]);
    //   return;
    // }
    // assert.assertNotNull(p.votes);
    // assert.i32Equals(1, p.votes.length);
    // assert.arrayEquals([ethereum.Value.fromString(voteId)], ethereum.Value.fromStringArray(p.votes).toArray());
  });
});
