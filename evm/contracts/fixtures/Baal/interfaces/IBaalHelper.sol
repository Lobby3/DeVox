//SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "../types/BaalTypes.sol";

interface IBaalHelper {
    function hashOperation(
        bytes memory _transactions
    ) external view returns (bytes32);

    function proposalState(
        BaalTypes.Proposal memory proposal
    ) external view returns (BaalTypes.ProposalState);

    function ragequitTransfer(
        address to,
        uint256 sharesToBurn,
        uint256 lootToBurn,
        uint256 totalSupply,
        address[] memory tokens
    ) external;
}
