/* eslint-disable @typescript-eslint/no-unused-vars */
import { log } from "@graphprotocol/graph-ts";

import { Proposal, Vote } from "../generated/schema";
import {
  Approval,
  AvatarSet,
  CancelProposal,
  ChangedGuard,
  GovernanceConfigSet,
  Initialized,
  LockAdmin,
  LockGovernor,
  LockManager,
  LootPaused,
  OwnershipTransferred,
  ProcessProposal,
  Ragequit,
  SetTrustedForwarder,
  SetupComplete,
  ShamanSet,
  SharesPaused,
  SponsorProposal,
  SubmitProposal,
  SubmitVote,
  TargetSet,
} from "../generated/templates/Baal/Baal";

export function handleApproval(event: Approval): void {
  log.info("Approval: {} {} -> {}", [
    event.params.amount.toString(),
    event.params.owner.toString(),
    event.params.spender.toString(),
  ]);
}

export function handleAvatarSet(event: AvatarSet): void {
  log.info("AvatarSet: {}", [event.params.newAvatar.toString()]);
}

export function handleChangedGuard(event: ChangedGuard): void {
  log.info("ChangedGuard: {}", [event.params.guard.toString()]);
}

export function handleCancelProposal(event: CancelProposal): void {
  const proposal = Proposal.load(event.params.proposal.toString());
  if (!proposal) {
    log.error("Proposal {} not found", [event.params.proposal.toString()]);
    return;
  }
  proposal.cancelled = true;
  proposal.save();
}

export function handleGovernanceConfigSet(event: GovernanceConfigSet): void {
  log.info("GovernanceConfigSet: {}", [JSON.stringify(event.params)]);
}

export function handleInitialized(event: Initialized): void {
  log.info("Initialized: v{}", [event.params.version.toString()]);
}

export function handleLockAdmin(event: LockAdmin): void {
  log.info("LockAdmin: {}", [event.params.adminLock.toString()]);
}

export function handleLockGovernor(event: LockGovernor): void {
  log.info("LockGovernor: {}", [event.params.governorLock.toString()]);
}

export function handleLockManager(event: LockManager): void {
  log.info("LockManager: {}", [event.params.managerLock.toString()]);
}

export function handleLootPaused(event: LootPaused): void {
  log.info("LootPaused: {}", [event.params.paused.toString()]);
}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {
  log.info("OwnershipTransferred: {}", [event.params.newOwner.toHexString()]);
}

export function handleProcessProposal(event: ProcessProposal): void {
  const proposal = Proposal.load(event.params.proposal.toString());
  if (!proposal) {
    log.error("Proposal {} not found", [event.params.proposal.toString()]);
    return;
  }
  proposal.processed = true;
  proposal.passed = event.params.passed;
  proposal.actionFailed = event.params.actionFailed;
  proposal.save();
}

export function handleRagequit(event: Ragequit): void {
  log.info("Ragequit: {}", [JSON.stringify(event.params)]);
}

export function handleSetTrustedForwarder(event: SetTrustedForwarder): void {
  log.info("SetTrustedForwarder: {}", [event.params.forwarder.toHexString()]);
}

export function handleSetupComplete(event: SetupComplete): void {
  log.info("SetupComplete: {}", [JSON.stringify(event.params)]);
}

export function handleShamanSet(event: ShamanSet): void {
  log.info("ShamanSet: {} (permission: {})", [
    event.params.shaman.toString(),
    event.params.permission.toString(),
  ]);
}

export function handleSharesPaused(event: SharesPaused): void {
  log.info("SharesPaused: {}", [event.params.paused.toString()]);
}

export function handleSponsorProposal(event: SponsorProposal): void {
  const proposal = Proposal.load(event.params.proposal.toString());
  if (!proposal) {
    log.error("Proposal {} not found", [event.params.proposal.toString()]);
    return;
  }
  proposal.sponsor = event.params.member;
  proposal.votingStarts = event.params.votingStarts;
  proposal.save();
}

export function handleSubmitProposal(event: SubmitProposal): void {
  const proposal = new Proposal(event.params.proposal.toString());
  proposal.campaign = event.address.toHexString();
  proposal.cancelled = false;
  proposal.processed = false;
  proposal.passed = false;
  proposal.actionFailed = false;
  proposal.expired = false;
  proposal.details = event.params.details;
  proposal.expiration = event.params.expiration;
  proposal.selfSponsor = event.params.selfSponsor;
  proposal.sponsor = event.params.selfSponsor ? event.transaction.from : null;
  proposal.timestamp = event.params.timestamp;
  proposal.votingPeriod = event.params.votingPeriod;
  proposal.save();
}

export function handleSubmitVote(event: SubmitVote): void {
  const proposalId = event.params.proposal.toString();
  const vote = new Vote(
    event.transaction.hash.toHexString() + "-" + event.logIndex.toString()
  );
  vote.proposal = proposalId;
  vote.user = event.params.member;
  vote.approved = event.params.approved;
  vote.shares = event.params.balance;
  vote.save();

  // const proposal = Proposal.load(proposalId);
  // if (!proposal) {
  //   log.error("Proposal {} not found", [proposalId]);
  //   return;
  // }
  // proposal.votes.push(vote.id);
  // proposal.save();
}

export function handleTargetSet(event: TargetSet): void {
  log.info("TargetSet: {}", [event.params.newTarget.toHexString()]);
}
