import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
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
  TargetSet
} from "../generated/BaalV1/BaalV1"

export function createApprovalEvent(
  owner: Address,
  spender: Address,
  amount: BigInt
): Approval {
  let approvalEvent = changetype<Approval>(newMockEvent())

  approvalEvent.parameters = new Array()

  approvalEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("spender", ethereum.Value.fromAddress(spender))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return approvalEvent
}

export function createAvatarSetEvent(
  previousAvatar: Address,
  newAvatar: Address
): AvatarSet {
  let avatarSetEvent = changetype<AvatarSet>(newMockEvent())

  avatarSetEvent.parameters = new Array()

  avatarSetEvent.parameters.push(
    new ethereum.EventParam(
      "previousAvatar",
      ethereum.Value.fromAddress(previousAvatar)
    )
  )
  avatarSetEvent.parameters.push(
    new ethereum.EventParam("newAvatar", ethereum.Value.fromAddress(newAvatar))
  )

  return avatarSetEvent
}

export function createCancelProposalEvent(proposal: BigInt): CancelProposal {
  let cancelProposalEvent = changetype<CancelProposal>(newMockEvent())

  cancelProposalEvent.parameters = new Array()

  cancelProposalEvent.parameters.push(
    new ethereum.EventParam(
      "proposal",
      ethereum.Value.fromUnsignedBigInt(proposal)
    )
  )

  return cancelProposalEvent
}

export function createChangedGuardEvent(guard: Address): ChangedGuard {
  let changedGuardEvent = changetype<ChangedGuard>(newMockEvent())

  changedGuardEvent.parameters = new Array()

  changedGuardEvent.parameters.push(
    new ethereum.EventParam("guard", ethereum.Value.fromAddress(guard))
  )

  return changedGuardEvent
}

export function createGovernanceConfigSetEvent(
  voting: BigInt,
  grace: BigInt,
  newOffering: BigInt,
  quorum: BigInt,
  sponsor: BigInt,
  minRetention: BigInt
): GovernanceConfigSet {
  let governanceConfigSetEvent = changetype<GovernanceConfigSet>(newMockEvent())

  governanceConfigSetEvent.parameters = new Array()

  governanceConfigSetEvent.parameters.push(
    new ethereum.EventParam("voting", ethereum.Value.fromUnsignedBigInt(voting))
  )
  governanceConfigSetEvent.parameters.push(
    new ethereum.EventParam("grace", ethereum.Value.fromUnsignedBigInt(grace))
  )
  governanceConfigSetEvent.parameters.push(
    new ethereum.EventParam(
      "newOffering",
      ethereum.Value.fromUnsignedBigInt(newOffering)
    )
  )
  governanceConfigSetEvent.parameters.push(
    new ethereum.EventParam("quorum", ethereum.Value.fromUnsignedBigInt(quorum))
  )
  governanceConfigSetEvent.parameters.push(
    new ethereum.EventParam(
      "sponsor",
      ethereum.Value.fromUnsignedBigInt(sponsor)
    )
  )
  governanceConfigSetEvent.parameters.push(
    new ethereum.EventParam(
      "minRetention",
      ethereum.Value.fromUnsignedBigInt(minRetention)
    )
  )

  return governanceConfigSetEvent
}

export function createInitializedEvent(version: i32): Initialized {
  let initializedEvent = changetype<Initialized>(newMockEvent())

  initializedEvent.parameters = new Array()

  initializedEvent.parameters.push(
    new ethereum.EventParam(
      "version",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(version))
    )
  )

  return initializedEvent
}

export function createLockAdminEvent(adminLock: boolean): LockAdmin {
  let lockAdminEvent = changetype<LockAdmin>(newMockEvent())

  lockAdminEvent.parameters = new Array()

  lockAdminEvent.parameters.push(
    new ethereum.EventParam("adminLock", ethereum.Value.fromBoolean(adminLock))
  )

  return lockAdminEvent
}

export function createLockGovernorEvent(governorLock: boolean): LockGovernor {
  let lockGovernorEvent = changetype<LockGovernor>(newMockEvent())

  lockGovernorEvent.parameters = new Array()

  lockGovernorEvent.parameters.push(
    new ethereum.EventParam(
      "governorLock",
      ethereum.Value.fromBoolean(governorLock)
    )
  )

  return lockGovernorEvent
}

export function createLockManagerEvent(managerLock: boolean): LockManager {
  let lockManagerEvent = changetype<LockManager>(newMockEvent())

  lockManagerEvent.parameters = new Array()

  lockManagerEvent.parameters.push(
    new ethereum.EventParam(
      "managerLock",
      ethereum.Value.fromBoolean(managerLock)
    )
  )

  return lockManagerEvent
}

export function createLockRagequitEvent(ragequitLock: boolean): LockRagequit {
  let lockRagequitEvent = changetype<LockRagequit>(newMockEvent())

  lockRagequitEvent.parameters = new Array()

  lockRagequitEvent.parameters.push(
    new ethereum.EventParam(
      "ragequitLock",
      ethereum.Value.fromBoolean(ragequitLock)
    )
  )

  return lockRagequitEvent
}

export function createLootPausedEvent(paused: boolean): LootPaused {
  let lootPausedEvent = changetype<LootPaused>(newMockEvent())

  lootPausedEvent.parameters = new Array()

  lootPausedEvent.parameters.push(
    new ethereum.EventParam("paused", ethereum.Value.fromBoolean(paused))
  )

  return lootPausedEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createProcessProposalEvent(
  proposal: BigInt,
  passed: boolean,
  actionFailed: boolean
): ProcessProposal {
  let processProposalEvent = changetype<ProcessProposal>(newMockEvent())

  processProposalEvent.parameters = new Array()

  processProposalEvent.parameters.push(
    new ethereum.EventParam(
      "proposal",
      ethereum.Value.fromUnsignedBigInt(proposal)
    )
  )
  processProposalEvent.parameters.push(
    new ethereum.EventParam("passed", ethereum.Value.fromBoolean(passed))
  )
  processProposalEvent.parameters.push(
    new ethereum.EventParam(
      "actionFailed",
      ethereum.Value.fromBoolean(actionFailed)
    )
  )

  return processProposalEvent
}

export function createRagequitEvent(
  member: Address,
  to: Address,
  lootToBurn: BigInt,
  sharesToBurn: BigInt,
  tokens: Array<Address>
): Ragequit {
  let ragequitEvent = changetype<Ragequit>(newMockEvent())

  ragequitEvent.parameters = new Array()

  ragequitEvent.parameters.push(
    new ethereum.EventParam("member", ethereum.Value.fromAddress(member))
  )
  ragequitEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  ragequitEvent.parameters.push(
    new ethereum.EventParam(
      "lootToBurn",
      ethereum.Value.fromUnsignedBigInt(lootToBurn)
    )
  )
  ragequitEvent.parameters.push(
    new ethereum.EventParam(
      "sharesToBurn",
      ethereum.Value.fromUnsignedBigInt(sharesToBurn)
    )
  )
  ragequitEvent.parameters.push(
    new ethereum.EventParam("tokens", ethereum.Value.fromAddressArray(tokens))
  )

  return ragequitEvent
}

export function createSetTrustedForwarderEvent(
  forwarder: Address
): SetTrustedForwarder {
  let setTrustedForwarderEvent = changetype<SetTrustedForwarder>(newMockEvent())

  setTrustedForwarderEvent.parameters = new Array()

  setTrustedForwarderEvent.parameters.push(
    new ethereum.EventParam("forwarder", ethereum.Value.fromAddress(forwarder))
  )

  return setTrustedForwarderEvent
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
  let setupCompleteEvent = changetype<SetupComplete>(newMockEvent())

  setupCompleteEvent.parameters = new Array()

  setupCompleteEvent.parameters.push(
    new ethereum.EventParam(
      "lootPaused",
      ethereum.Value.fromBoolean(lootPaused)
    )
  )
  setupCompleteEvent.parameters.push(
    new ethereum.EventParam(
      "sharesPaused",
      ethereum.Value.fromBoolean(sharesPaused)
    )
  )
  setupCompleteEvent.parameters.push(
    new ethereum.EventParam(
      "gracePeriod",
      ethereum.Value.fromUnsignedBigInt(gracePeriod)
    )
  )
  setupCompleteEvent.parameters.push(
    new ethereum.EventParam(
      "votingPeriod",
      ethereum.Value.fromUnsignedBigInt(votingPeriod)
    )
  )
  setupCompleteEvent.parameters.push(
    new ethereum.EventParam(
      "proposalOffering",
      ethereum.Value.fromUnsignedBigInt(proposalOffering)
    )
  )
  setupCompleteEvent.parameters.push(
    new ethereum.EventParam(
      "quorumPercent",
      ethereum.Value.fromUnsignedBigInt(quorumPercent)
    )
  )
  setupCompleteEvent.parameters.push(
    new ethereum.EventParam(
      "sponsorThreshold",
      ethereum.Value.fromUnsignedBigInt(sponsorThreshold)
    )
  )
  setupCompleteEvent.parameters.push(
    new ethereum.EventParam(
      "minRetentionPercent",
      ethereum.Value.fromUnsignedBigInt(minRetentionPercent)
    )
  )
  setupCompleteEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )
  setupCompleteEvent.parameters.push(
    new ethereum.EventParam("symbol", ethereum.Value.fromString(symbol))
  )
  setupCompleteEvent.parameters.push(
    new ethereum.EventParam(
      "totalShares",
      ethereum.Value.fromUnsignedBigInt(totalShares)
    )
  )
  setupCompleteEvent.parameters.push(
    new ethereum.EventParam(
      "totalLoot",
      ethereum.Value.fromUnsignedBigInt(totalLoot)
    )
  )

  return setupCompleteEvent
}

export function createShamanSetEvent(
  shaman: Address,
  permission: BigInt
): ShamanSet {
  let shamanSetEvent = changetype<ShamanSet>(newMockEvent())

  shamanSetEvent.parameters = new Array()

  shamanSetEvent.parameters.push(
    new ethereum.EventParam("shaman", ethereum.Value.fromAddress(shaman))
  )
  shamanSetEvent.parameters.push(
    new ethereum.EventParam(
      "permission",
      ethereum.Value.fromUnsignedBigInt(permission)
    )
  )

  return shamanSetEvent
}

export function createSharesPausedEvent(paused: boolean): SharesPaused {
  let sharesPausedEvent = changetype<SharesPaused>(newMockEvent())

  sharesPausedEvent.parameters = new Array()

  sharesPausedEvent.parameters.push(
    new ethereum.EventParam("paused", ethereum.Value.fromBoolean(paused))
  )

  return sharesPausedEvent
}

export function createSponsorProposalEvent(
  member: Address,
  proposal: BigInt,
  votingStarts: BigInt
): SponsorProposal {
  let sponsorProposalEvent = changetype<SponsorProposal>(newMockEvent())

  sponsorProposalEvent.parameters = new Array()

  sponsorProposalEvent.parameters.push(
    new ethereum.EventParam("member", ethereum.Value.fromAddress(member))
  )
  sponsorProposalEvent.parameters.push(
    new ethereum.EventParam(
      "proposal",
      ethereum.Value.fromUnsignedBigInt(proposal)
    )
  )
  sponsorProposalEvent.parameters.push(
    new ethereum.EventParam(
      "votingStarts",
      ethereum.Value.fromUnsignedBigInt(votingStarts)
    )
  )

  return sponsorProposalEvent
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
  let submitProposalEvent = changetype<SubmitProposal>(newMockEvent())

  submitProposalEvent.parameters = new Array()

  submitProposalEvent.parameters.push(
    new ethereum.EventParam(
      "proposal",
      ethereum.Value.fromUnsignedBigInt(proposal)
    )
  )
  submitProposalEvent.parameters.push(
    new ethereum.EventParam(
      "proposalDataHash",
      ethereum.Value.fromFixedBytes(proposalDataHash)
    )
  )
  submitProposalEvent.parameters.push(
    new ethereum.EventParam(
      "votingPeriod",
      ethereum.Value.fromUnsignedBigInt(votingPeriod)
    )
  )
  submitProposalEvent.parameters.push(
    new ethereum.EventParam(
      "proposalData",
      ethereum.Value.fromBytes(proposalData)
    )
  )
  submitProposalEvent.parameters.push(
    new ethereum.EventParam(
      "expiration",
      ethereum.Value.fromUnsignedBigInt(expiration)
    )
  )
  submitProposalEvent.parameters.push(
    new ethereum.EventParam(
      "baalGas",
      ethereum.Value.fromUnsignedBigInt(baalGas)
    )
  )
  submitProposalEvent.parameters.push(
    new ethereum.EventParam(
      "selfSponsor",
      ethereum.Value.fromBoolean(selfSponsor)
    )
  )
  submitProposalEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )
  submitProposalEvent.parameters.push(
    new ethereum.EventParam("details", ethereum.Value.fromString(details))
  )

  return submitProposalEvent
}

export function createSubmitVoteEvent(
  member: Address,
  balance: BigInt,
  proposal: BigInt,
  approved: boolean
): SubmitVote {
  let submitVoteEvent = changetype<SubmitVote>(newMockEvent())

  submitVoteEvent.parameters = new Array()

  submitVoteEvent.parameters.push(
    new ethereum.EventParam("member", ethereum.Value.fromAddress(member))
  )
  submitVoteEvent.parameters.push(
    new ethereum.EventParam(
      "balance",
      ethereum.Value.fromUnsignedBigInt(balance)
    )
  )
  submitVoteEvent.parameters.push(
    new ethereum.EventParam(
      "proposal",
      ethereum.Value.fromUnsignedBigInt(proposal)
    )
  )
  submitVoteEvent.parameters.push(
    new ethereum.EventParam("approved", ethereum.Value.fromBoolean(approved))
  )

  return submitVoteEvent
}

export function createTargetSetEvent(
  previousTarget: Address,
  newTarget: Address
): TargetSet {
  let targetSetEvent = changetype<TargetSet>(newMockEvent())

  targetSetEvent.parameters = new Array()

  targetSetEvent.parameters.push(
    new ethereum.EventParam(
      "previousTarget",
      ethereum.Value.fromAddress(previousTarget)
    )
  )
  targetSetEvent.parameters.push(
    new ethereum.EventParam("newTarget", ethereum.Value.fromAddress(newTarget))
  )

  return targetSetEvent
}
