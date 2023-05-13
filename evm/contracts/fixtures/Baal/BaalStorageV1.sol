// SPDX-License-Identifier: MIT
/*
███   ██   ██   █
█  █  █ █  █ █  █
█ ▀ ▄ █▄▄█ █▄▄█ █
█  ▄▀ █  █ █  █ ███▄
███      █    █     ▀
        █    █
       ▀    ▀*/
pragma solidity ^0.8.12;

import "./interfaces/IBaalStore.sol";
import "./types/BaalTypes.sol";

contract BaalStorageV1 is IBaalStore {
    // PROPOSAL TRACKING
    mapping(address => mapping(uint32 => bool))
        private memberVoted; /*maps members to their proposal votes (true = voted) */
    mapping(address => uint256)
        private votingNonces; /*maps members to their voting nonce*/
    mapping(uint256 => BaalTypes.Proposal)
        private proposals; /*maps `proposal id` to struct details*/

    function getProposal(
        uint32 id
    ) external view override returns (BaalTypes.Proposal memory) {
        return proposals[id];
    }

    function setProposal(
        BaalTypes.Proposal memory proposal
    ) external override {
        proposals[proposal.id] = proposal;
    }

    // function setProposal(
    //     uint32 id,
    //     uint32 prevProposalId,
    //     uint32 votingStarts,
    //     uint32 votingEnds,
    //     uint32 graceEnds,
    //     uint32 expiration,
    //     uint256 baalGas,
    //     uint256 yesVotes,
    //     uint256 noVotes,
    //     uint256 maxTotalSharesAndLootAtVote,
    //     uint256 maxTotalSharesAtSponsor,
    //     bool[4] memory status,
    //     address sponsor,
    //     bytes32 proposalDataHash
    // ) external override {
    //     proposals[id] = BaalTypes.Proposal(
    //         id,
    //         prevProposalId,
    //         votingStarts,
    //         votingEnds,
    //         graceEnds,
    //         expiration,
    //         baalGas,
    //         yesVotes,
    //         noVotes,
    //         maxTotalSharesAndLootAtVote,
    //         maxTotalSharesAtSponsor,
    //         status,
    //         sponsor,
    //         proposalDataHash
    //     );
    // }

    function getMemberVoted(
        address member,
        uint32 proposalId
    ) external view override returns (bool) {
        return memberVoted[member][proposalId];
    }

    function setMemberVoted(
        address member,
        uint32 proposalId,
        bool voted
    ) external override {
        memberVoted[member][proposalId] = voted;
    }

    function getVotingNonce(
        address member
    ) external view override returns (uint256) {
        return votingNonces[member];
    }

    function incrementVotingNonce(address member) external override {
        votingNonces[member]++;
    }

    function setVotingNonce(address member, uint256 nonce) external override {
        votingNonces[member] = nonce;
    }
}
