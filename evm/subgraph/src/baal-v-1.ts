import { Address, log } from "@graphprotocol/graph-ts";

import {
  CancelProposal,
  ProcessProposal,
  SponsorProposal,
  SubmitProposal,
  SubmitVote,
} from "../generated/BaalV1/BaalV1";
import { Proposal, Vote } from "../generated/schema";

export function handleCancelProposal(event: CancelProposal): void {
  const proposal = Proposal.load(event.params.proposal.toString());
  if (!proposal) {
    log.error("Proposal {} not found", [event.params.proposal.toString()]);
    return;
  }
  proposal.cancelled = true;
  proposal.save();
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
  proposal.campaign = event.transaction.from.toHexString();
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
