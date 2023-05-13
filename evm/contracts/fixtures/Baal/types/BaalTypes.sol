// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

library BaalTypes {

    struct Proposal {
        /*Baal proposal details*/
        uint32 id /*id of this proposal, used in existence checks (increments from 1)*/;
        uint32 prevProposalId /* id of the previous proposal - set at sponsorship from latestSponsoredProposalId */;
        uint32 votingStarts /*starting time for proposal in seconds since unix epoch*/;
        uint32 votingEnds /*termination date for proposal in seconds since unix epoch - derived from `votingPeriod` set on proposal*/;
        uint32 graceEnds /*termination date for proposal in seconds since unix epoch - derived from `gracePeriod` set on proposal*/;
        uint32 expiration /*timestamp after which proposal should be considered invalid and skipped. */;
        uint256 baalGas /* gas needed to process proposal */;
        uint256 yesVotes /*counter for `members` `approved` 'votes' to calculate approval on processing*/;
        uint256 noVotes /*counter for `members` 'dis-approved' 'votes' to calculate approval on processing*/;
        uint256 maxTotalSharesAndLootAtVote /* highest share+loot count during any individual yes vote*/;
        uint256 maxTotalSharesAtSponsor /* highest share+loot count during any individual yes vote*/;
        bool[4] status /* [cancelled, processed, passed, actionFailed] */;
        address sponsor /* address of the sponsor - set at sponsor proposal - relevant for cancellation */;
        bytes32 proposalDataHash /*hash of raw data associated with state updates*/;
    }

    /* Unborn -> Submitted -> Voting -> Grace -> Ready -> Processed -> Cancelled  \-> Defeated   */
    enum ProposalState {
        Unborn /* 0 - can submit */,
        Submitted /* 1 - can sponsor -> voting */,
        Voting /* 2 - can be cancelled, otherwise proceeds to grace */,
        Cancelled /* 3 - terminal state, counts as processed */,
        Grace /* 4 - proceeds to ready/defeated */,
        Ready /* 5 - can be processed */,
        Processed /* 6 - terminal state */,
        Defeated /* 7 - terminal state, yes votes <= no votes, counts as processed */
    }
}