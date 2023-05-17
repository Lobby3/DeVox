import { BigInt } from "@graphprotocol/graph-ts"
import {
  BaalV1,
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
import { ExampleEntity } from "../generated/schema"

export function handleApproval(event: Approval): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = ExampleEntity.load(event.transaction.from)

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new ExampleEntity(event.transaction.from)

    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0)
  }

  // BigInt and BigDecimal math are supported
  entity.count = entity.count + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters
  entity.owner = event.params.owner
  entity.spender = event.params.spender

  // Entities can be written to the store with `.save()`
  entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.adminLock(...)
  // - contract.avatar(...)
  // - contract.encodeMultisend(...)
  // - contract.getGuard(...)
  // - contract.getProposalStatus(...)
  // - contract.governorLock(...)
  // - contract.gracePeriod(...)
  // - contract.guard(...)
  // - contract.hashOperation(...)
  // - contract.isAdmin(...)
  // - contract.isGovernor(...)
  // - contract.isManager(...)
  // - contract.isTrustedForwarder(...)
  // - contract.latestSponsoredProposalId(...)
  // - contract.lootToken(...)
  // - contract.managerLock(...)
  // - contract.memberVoted(...)
  // - contract.minRetentionPercent(...)
  // - contract.multisendLibrary(...)
  // - contract.owner(...)
  // - contract.proposalCount(...)
  // - contract.proposalOffering(...)
  // - contract.proposals(...)
  // - contract.quorumPercent(...)
  // - contract.ragequitLock(...)
  // - contract.shamans(...)
  // - contract.sharesToken(...)
  // - contract.sponsorThreshold(...)
  // - contract.state(...)
  // - contract.target(...)
  // - contract.totalLoot(...)
  // - contract.totalShares(...)
  // - contract.totalSupply(...)
  // - contract.trustedForwarder(...)
  // - contract.versionRecipient(...)
  // - contract.votingNonces(...)
  // - contract.votingPeriod(...)
}

export function handleAvatarSet(event: AvatarSet): void {}

export function handleCancelProposal(event: CancelProposal): void {}

export function handleChangedGuard(event: ChangedGuard): void {}

export function handleGovernanceConfigSet(event: GovernanceConfigSet): void {}

export function handleInitialized(event: Initialized): void {}

export function handleLockAdmin(event: LockAdmin): void {}

export function handleLockGovernor(event: LockGovernor): void {}

export function handleLockManager(event: LockManager): void {}

export function handleLockRagequit(event: LockRagequit): void {}

export function handleLootPaused(event: LootPaused): void {}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

export function handleProcessProposal(event: ProcessProposal): void {}

export function handleRagequit(event: Ragequit): void {}

export function handleSetTrustedForwarder(event: SetTrustedForwarder): void {}

export function handleSetupComplete(event: SetupComplete): void {}

export function handleShamanSet(event: ShamanSet): void {}

export function handleSharesPaused(event: SharesPaused): void {}

export function handleSponsorProposal(event: SponsorProposal): void {}

export function handleSubmitProposal(event: SubmitProposal): void {}

export function handleSubmitVote(event: SubmitVote): void {}

export function handleTargetSet(event: TargetSet): void {}
