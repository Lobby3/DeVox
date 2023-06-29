// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.12;

interface IShaman {
    /// @notice Cancel the specified proposal
    /// @param proposalId proposal id
    function cancelProposal(uint32 proposalId) external;

    /// @notice Contract initialization logic
    /// @param _moloch moloch contract address
    /// @param _token ERC20 token contract address
    /// @param _id campaign id
    /// @param _pricePerUnit value of unit of ERC20 token
    /// @param _tokensPerUnit shares/loot multiplier per unit of ERC20 token
    /// @param _target campaign target amount
    /// @param _admins admin addresses
    function initialize(
        address _moloch,
        address _token,
        address _userRegistry,
        uint256 _id,
        uint256 _pricePerUnit,
        uint256 _tokensPerUnit,
        uint256 _target,
        address[] calldata _admins
    ) external;

    /// @notice Make a donation, join the DAO and receive voting shares
    /// @param _value amount donated
    /// @param _signCampaign if true, also sign the campaign
    /// @param _message message accompanying donation
    function donate(
        uint256 _value,
        bool _signCampaign,
        string calldata _message
    ) external;

    /// @notice Grant the specified user admin privileges
    /// @param user user address
    function setAdmin(address user) external;

    /// @notice Sign the campaign to indicate your support.
    function sign() external;
}
