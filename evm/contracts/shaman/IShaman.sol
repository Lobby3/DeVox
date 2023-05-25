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
    ) external returns (bool);

    /// @notice Make a donation
    /// @param _value amount donated
    /// @param _message message accompanying donation
    function donate(uint256 _value, string calldata _message) external;
}
