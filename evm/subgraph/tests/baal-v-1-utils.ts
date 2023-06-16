/* eslint-disable @typescript-eslint/ban-types */
import { Address, BigInt, Bytes, ethereum } from "@graphprotocol/graph-ts";
import { newMockEvent } from "matchstick-as";

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
  LockRagequit,
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
} from "../generated/BaalV1/BaalV1";

export function createApprovalEvent(
  owner: Address,
  spender: Address,
  amount: BigInt
): Approval {
  const approvalEvent = changetype<Approval>(newMockEvent());

  approvalEvent.parameters = [];

  approvalEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  );
  approvalEvent.parameters.push(
    new ethereum.EventParam("spender", ethereum.Value.fromAddress(spender))
  );
  approvalEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  );

  return approvalEvent;
}

export function createAvatarSetEvent(
  previousAvatar: Address,
  newAvatar: Address
): AvatarSet {
  const avatarSetEvent = changetype<AvatarSet>(newMockEvent());

  avatarSetEvent.parameters = [];

  avatarSetEvent.parameters.push(
    new ethereum.EventParam(
      "previousAvatar",
      ethereum.Value.fromAddress(previousAvatar)
    )
  );
  avatarSetEvent.parameters.push(
    new ethereum.EventParam("newAvatar", ethereum.Value.fromAddress(newAvatar))
  );

  return avatarSetEvent;
}

export function createCancelProposalEvent(proposal: BigInt): CancelProposal {
  const cancelProposalEvent = changetype<CancelProposal>(newMockEvent());

  cancelProposalEvent.parameters = [];

  cancelProposalEvent.parameters.push(
    new ethereum.EventParam(
      "proposal",
      ethereum.Value.fromUnsignedBigInt(proposal)
    )
  );

  return cancelProposalEvent;
}

export function createChangedGuardEvent(guard: Address): ChangedGuard {
  const changedGuardEvent = changetype<ChangedGuard>(newMockEvent());

  changedGuardEvent.parameters = [];

  changedGuardEvent.parameters.push(
    new ethereum.EventParam("guard", ethereum.Value.fromAddress(guard))
  );

  return changedGuardEvent;
}

export function createGovernanceConfigSetEvent(
  voting: BigInt,
  grace: BigInt,
  newOffering: BigInt,
  quorum: BigInt,
  sponsor: BigInt,
  minRetention: BigInt
): GovernanceConfigSet {
  const governanceConfigSetEvent = changetype<GovernanceConfigSet>(
    newMockEvent()
  );

  governanceConfigSetEvent.parameters = [];

  governanceConfigSetEvent.parameters.push(
    new ethereum.EventParam("voting", ethereum.Value.fromUnsignedBigInt(voting))
  );
  governanceConfigSetEvent.parameters.push(
    new ethereum.EventParam("grace", ethereum.Value.fromUnsignedBigInt(grace))
  );
  governanceConfigSetEvent.parameters.push(
    new ethereum.EventParam(
      "newOffering",
      ethereum.Value.fromUnsignedBigInt(newOffering)
    )
  );
  governanceConfigSetEvent.parameters.push(
    new ethereum.EventParam("quorum", ethereum.Value.fromUnsignedBigInt(quorum))
  );
  governanceConfigSetEvent.parameters.push(
    new ethereum.EventParam(
      "sponsor",
      ethereum.Value.fromUnsignedBigInt(sponsor)
    )
  );
  governanceConfigSetEvent.parameters.push(
    new ethereum.EventParam(
      "minRetention",
      ethereum.Value.fromUnsignedBigInt(minRetention)
    )
  );

  return governanceConfigSetEvent;
}

export function createInitializedEvent(version: i32): Initialized {
  const initializedEvent = changetype<Initialized>(newMockEvent());

  initializedEvent.parameters = [];

  initializedEvent.parameters.push(
    new ethereum.EventParam(
      "version",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(version))
    )
  );

  return initializedEvent;
}

export function createLockAdminEvent(adminLock: boolean): LockAdmin {
  const lockAdminEvent = changetype<LockAdmin>(newMockEvent());

  lockAdminEvent.parameters = [];

  lockAdminEvent.parameters.push(
    new ethereum.EventParam("adminLock", ethereum.Value.fromBoolean(adminLock))
  );

  return lockAdminEvent;
}

export function createLockGovernorEvent(governorLock: boolean): LockGovernor {
  const lockGovernorEvent = changetype<LockGovernor>(newMockEvent());

  lockGovernorEvent.parameters = [];

  lockGovernorEvent.parameters.push(
    new ethereum.EventParam(
      "governorLock",
      ethereum.Value.fromBoolean(governorLock)
    )
  );

  return lockGovernorEvent;
}

export function createLockManagerEvent(managerLock: boolean): LockManager {
  const lockManagerEvent = changetype<LockManager>(newMockEvent());

  lockManagerEvent.parameters = [];

  lockManagerEvent.parameters.push(
    new ethereum.EventParam(
      "managerLock",
      ethereum.Value.fromBoolean(managerLock)
    )
  );

  return lockManagerEvent;
}

export function createLockRagequitEvent(ragequitLock: boolean): LockRagequit {
  const lockRagequitEvent = changetype<LockRagequit>(newMockEvent());

  lockRagequitEvent.parameters = [];

  lockRagequitEvent.parameters.push(
    new ethereum.EventParam(
      "ragequitLock",
      ethereum.Value.fromBoolean(ragequitLock)
    )
  );

  return lockRagequitEvent;
}

export function createLootPausedEvent(paused: boolean): LootPaused {
  const lootPausedEvent = changetype<LootPaused>(newMockEvent());

  lootPausedEvent.parameters = [];

  lootPausedEvent.parameters.push(
    new ethereum.EventParam("paused", ethereum.Value.fromBoolean(paused))
  );

  return lootPausedEvent;
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  const ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  );

  ownershipTransferredEvent.parameters = [];

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  );
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  );

  return ownershipTransferredEvent;
}

export function createProcessProposalEvent(
  proposal: BigInt,
  passed: boolean,
  actionFailed: boolean
): ProcessProposal {
  const processProposalEvent = changetype<ProcessProposal>(newMockEvent());

  processProposalEvent.parameters = [];

  processProposalEvent.parameters.push(
    new ethereum.EventParam(
      "proposal",
      ethereum.Value.fromUnsignedBigInt(proposal)
    )
  );
  processProposalEvent.parameters.push(
    new ethereum.EventParam("passed", ethereum.Value.fromBoolean(passed))
  );
  processProposalEvent.parameters.push(
    new ethereum.EventParam(
      "actionFailed",
      ethereum.Value.fromBoolean(actionFailed)
    )
  );

  return processProposalEvent;
}

export function createRagequitEvent(
  member: Address,
  to: Address,
  lootToBurn: BigInt,
  sharesToBurn: BigInt,
  tokens: Array<Address>
): Ragequit {
  const ragequitEvent = changetype<Ragequit>(newMockEvent());

  ragequitEvent.parameters = [];

  ragequitEvent.parameters.push(
    new ethereum.EventParam("member", ethereum.Value.fromAddress(member))
  );
  ragequitEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  );
  ragequitEvent.parameters.push(
    new ethereum.EventParam(
      "lootToBurn",
      ethereum.Value.fromUnsignedBigInt(lootToBurn)
    )
  );
  ragequitEvent.parameters.push(
    new ethereum.EventParam(
      "sharesToBurn",
      ethereum.Value.fromUnsignedBigInt(sharesToBurn)
    )
  );
  ragequitEvent.parameters.push(
    new ethereum.EventParam("tokens", ethereum.Value.fromAddressArray(tokens))
  );

  return ragequitEvent;
}

export function createSetTrustedForwarderEvent(
  forwarder: Address
): SetTrustedForwarder {
  const setTrustedForwarderEvent = changetype<SetTrustedForwarder>(
    newMockEvent()
  );

  setTrustedForwarderEvent.parameters = [];

  setTrustedForwarderEvent.parameters.push(
    new ethereum.EventParam("forwarder", ethereum.Value.fromAddress(forwarder))
  );

  return setTrustedForwarderEvent;
}

export function createSetupCompleteEvent(
  lootPaused: boolean,
  sharesPaused: boolean,
  gracePeriod: BigInt,
  votingPeriod: BigInt,
  proposalOffering: BigInt,
  quorumPercent: BigInt,
  sponsorThreshold: BigInt,
  minRetentionPercent: BigInt,
  name: string,
  symbol: string,
  totalShares: BigInt,
  totalLoot: BigInt
): SetupComplete {
  const setupCompleteEvent = changetype<SetupComplete>(newMockEvent());

  setupCompleteEvent.parameters = [];

  setupCompleteEvent.parameters.push(
    new ethereum.EventParam(
      "lootPaused",
      ethereum.Value.fromBoolean(lootPaused)
    )
  );
  setupCompleteEvent.parameters.push(
    new ethereum.EventParam(
      "sharesPaused",
      ethereum.Value.fromBoolean(sharesPaused)
    )
  );
  setupCompleteEvent.parameters.push(
    new ethereum.EventParam(
      "gracePeriod",
      ethereum.Value.fromUnsignedBigInt(gracePeriod)
    )
  );
  setupCompleteEvent.parameters.push(
    new ethereum.EventParam(
      "votingPeriod",
      ethereum.Value.fromUnsignedBigInt(votingPeriod)
    )
  );
  setupCompleteEvent.parameters.push(
    new ethereum.EventParam(
      "proposalOffering",
      ethereum.Value.fromUnsignedBigInt(proposalOffering)
    )
  );
  setupCompleteEvent.parameters.push(
    new ethereum.EventParam(
      "quorumPercent",
      ethereum.Value.fromUnsignedBigInt(quorumPercent)
    )
  );
  setupCompleteEvent.parameters.push(
    new ethereum.EventParam(
      "sponsorThreshold",
      ethereum.Value.fromUnsignedBigInt(sponsorThreshold)
    )
  );
  setupCompleteEvent.parameters.push(
    new ethereum.EventParam(
      "minRetentionPercent",
      ethereum.Value.fromUnsignedBigInt(minRetentionPercent)
    )
  );
  setupCompleteEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  );
  setupCompleteEvent.parameters.push(
    new ethereum.EventParam("symbol", ethereum.Value.fromString(symbol))
  );
  setupCompleteEvent.parameters.push(
    new ethereum.EventParam(
      "totalShares",
      ethereum.Value.fromUnsignedBigInt(totalShares)
    )
  );
  setupCompleteEvent.parameters.push(
    new ethereum.EventParam(
      "totalLoot",
      ethereum.Value.fromUnsignedBigInt(totalLoot)
    )
  );

  return setupCompleteEvent;
}

export function createShamanSetEvent(
  shaman: Address,
  permission: BigInt
): ShamanSet {
  const shamanSetEvent = changetype<ShamanSet>(newMockEvent());

  shamanSetEvent.parameters = [];

  shamanSetEvent.parameters.push(
    new ethereum.EventParam("shaman", ethereum.Value.fromAddress(shaman))
  );
  shamanSetEvent.parameters.push(
    new ethereum.EventParam(
      "permission",
      ethereum.Value.fromUnsignedBigInt(permission)
    )
  );

  return shamanSetEvent;
}

export function createSharesPausedEvent(paused: boolean): SharesPaused {
  const sharesPausedEvent = changetype<SharesPaused>(newMockEvent());

  sharesPausedEvent.parameters = [];

  sharesPausedEvent.parameters.push(
    new ethereum.EventParam("paused", ethereum.Value.fromBoolean(paused))
  );

  return sharesPausedEvent;
}

export function createSponsorProposalEvent(
  member: Address,
  proposal: BigInt,
  votingStarts: BigInt
): SponsorProposal {
  const sponsorProposalEvent = changetype<SponsorProposal>(newMockEvent());

  sponsorProposalEvent.parameters = [];

  sponsorProposalEvent.parameters.push(
    new ethereum.EventParam("member", ethereum.Value.fromAddress(member))
  );
  sponsorProposalEvent.parameters.push(
    new ethereum.EventParam(
      "proposal",
      ethereum.Value.fromUnsignedBigInt(proposal)
    )
  );
  sponsorProposalEvent.parameters.push(
    new ethereum.EventParam(
      "votingStarts",
      ethereum.Value.fromUnsignedBigInt(votingStarts)
    )
  );

  return sponsorProposalEvent;
}

export function createSubmitProposalEvent(
  proposal: BigInt,
  proposalDataHash: Bytes,
  votingPeriod: BigInt,
  proposalData: Bytes,
  expiration: BigInt,
  baalGas: BigInt,
  selfSponsor: boolean,
  timestamp: BigInt,
  details: string
): SubmitProposal {
  const submitProposalEvent = changetype<SubmitProposal>(newMockEvent());

  submitProposalEvent.parameters = [];

  submitProposalEvent.parameters.push(
    new ethereum.EventParam(
      "proposal",
      ethereum.Value.fromUnsignedBigInt(proposal)
    )
  );
  submitProposalEvent.parameters.push(
    new ethereum.EventParam(
      "proposalDataHash",
      ethereum.Value.fromFixedBytes(proposalDataHash)
    )
  );
  submitProposalEvent.parameters.push(
    new ethereum.EventParam(
      "votingPeriod",
      ethereum.Value.fromUnsignedBigInt(votingPeriod)
    )
  );
  submitProposalEvent.parameters.push(
    new ethereum.EventParam(
      "proposalData",
      ethereum.Value.fromBytes(proposalData)
    )
  );
  submitProposalEvent.parameters.push(
    new ethereum.EventParam(
      "expiration",
      ethereum.Value.fromUnsignedBigInt(expiration)
    )
  );
  submitProposalEvent.parameters.push(
    new ethereum.EventParam(
      "baalGas",
      ethereum.Value.fromUnsignedBigInt(baalGas)
    )
  );
  submitProposalEvent.parameters.push(
    new ethereum.EventParam(
      "selfSponsor",
      ethereum.Value.fromBoolean(selfSponsor)
    )
  );
  submitProposalEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  );
  submitProposalEvent.parameters.push(
    new ethereum.EventParam("details", ethereum.Value.fromString(details))
  );

  return submitProposalEvent;
}

export function createSubmitVoteEvent(
  member: Address,
  balance: BigInt,
  proposal: BigInt,
  approved: boolean
): SubmitVote {
  const submitVoteEvent = changetype<SubmitVote>(newMockEvent());

  submitVoteEvent.parameters = [];

  submitVoteEvent.parameters.push(
    new ethereum.EventParam("member", ethereum.Value.fromAddress(member))
  );
  submitVoteEvent.parameters.push(
    new ethereum.EventParam(
      "balance",
      ethereum.Value.fromUnsignedBigInt(balance)
    )
  );
  submitVoteEvent.parameters.push(
    new ethereum.EventParam(
      "proposal",
      ethereum.Value.fromUnsignedBigInt(proposal)
    )
  );
  submitVoteEvent.parameters.push(
    new ethereum.EventParam("approved", ethereum.Value.fromBoolean(approved))
  );

  return submitVoteEvent;
}

export function createTargetSetEvent(
  previousTarget: Address,
  newTarget: Address
): TargetSet {
  const targetSetEvent = changetype<TargetSet>(newMockEvent());

  targetSetEvent.parameters = [];

  targetSetEvent.parameters.push(
    new ethereum.EventParam(
      "previousTarget",
      ethereum.Value.fromAddress(previousTarget)
    )
  );
  targetSetEvent.parameters.push(
    new ethereum.EventParam("newTarget", ethereum.Value.fromAddress(newTarget))
  );

  return targetSetEvent;
}
