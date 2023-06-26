// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.12;

interface IShaman {
    /// @notice Cancel the specified proposal
    /// @param proposalId proposal id
    function cancelProposal(uint32 proposalId) external;

    /// @notice Contract initialization logic
    function initialize(
        address _moloch,
        address payable _token,
        uint256 _id,
        uint256 _pricePerUnit,
        uint256 _tokensPerUnit,
        uint256 _target,
        address[] calldata _admins
    ) external;

    /// @notice Make a donation, join the DAO and receive voting shares
    /// @param _value amount donated
    /// @param _message message accompanying donation
    function donate(uint256 _value, string calldata _message) external;

    /// Whitelist a user, enabling them to join the DAO
    /// @param _status whitelist status
    /// @param _metadata user metadata
    function whitelist(bool _status, bytes calldata _metadata) external;

    /// @notice Grant the specified user admin privileges
    /// @param user user address
    function setAdmin(address user) external;

    /// @notice Sign the campaign to indicate your support.
    function sign() external;
}
