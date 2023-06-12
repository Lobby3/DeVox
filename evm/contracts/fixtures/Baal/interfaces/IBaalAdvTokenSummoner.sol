//SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

interface IBaalAdvTokenSummoner {
    /**
     * @dev Summon a new Baal contract with a new set of tokens
     * @param _saltNonce The salt nonce to be used for the Safe contract
     * @param _initializationMintParams The parameters for minting the tokens
     * @param _initializationTokenParams The parameters for deploying the tokens
     * @param _postInitializationActions The actions to be performed after the initialization
     * @return The address of the new Baal contract
     */
    function summonBaalFromReferrer(
        uint256 _saltNonce,
        bytes calldata _initializationMintParams,
        bytes calldata _initializationTokenParams,
        bytes[] calldata _postInitializationActions
    ) external payable returns (address);
}
