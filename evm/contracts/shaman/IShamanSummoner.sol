// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.12;

interface IShamanSummoner {
    /// @notice Summon new DeVox Shaman
    /// @param _baal BaaL contract address
    /// @param _initializationParams Shaman initialization parameters
    /// @dev _initializationParams has the form:
    ///      (address _token, address _userRegistry, uint256 _pricePerUnit, uint256 _tokensPerUnit, uint256 _target, string _name)
    function summonDeVoxShaman(
        address _baal,
        bytes calldata _initializationParams
    ) external returns (address);
}
