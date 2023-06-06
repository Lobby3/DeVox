// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.12;

interface IShaman {
    /// @notice Contract initialization logic
    function initialize(
        address _moloch,
        address payable _token,
        uint256 _id,
        uint256 _pricePerUnit,
        uint256 _tokensPerUnit,
        uint256 _target
    ) external;

    /// @notice Set BaaL contract address
    /// @param _baal BaaL contract address
    function setBaal(address _baal) external;

    /// @notice Make a donation, join the DAO and receive voting shares
    /// @param _value amount donated
    /// @param _message message accompanying donation
    function donate(uint256 _value, string calldata _message) external;

    /// Whitelist a user, enabling them to join the DAO
    /// @param _status whitelist status
    /// @param _metadata user metadata
    function whitelist(bool _status, bytes calldata _metadata) external;
}
