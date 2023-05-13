//SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "../types/BaalTypes.sol";

interface IBaalStore {
    function getMemberVoted(
        address member,
        uint32 proposalId
    ) external view returns (bool);

    function setMemberVoted(
        address member,
        uint32 proposalId,
        bool voted
    ) external;

    function getProposal(
        uint32 id
    ) external view returns (BaalTypes.Proposal memory);

    function setProposal(BaalTypes.Proposal memory proposal) external;

    function getVotingNonce(address member) external returns (uint256);

    function incrementVotingNonce(address member) external;

    function setVotingNonce(address member, uint256 nonce) external;
}
