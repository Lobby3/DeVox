// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.12;

interface IUserRegistry {
    /// @notice emitted when a user is saved to the registry
    /// @param user user address
    /// @param metadata user metadata
    event UserSaved(address indexed user, bytes metadata);

    /// @notice emitted when a user is removed from the registry
    /// @param user user address
    event UserRemoved(address indexed user);

    /// @notice Check if a user is in the registry
    /// @param user user address
    /// @return true if user is in the registry
    function getUser(address user) external view returns (bool);

    /// @notice Remove a user from the registry
    /// @param user user address
    function removeUser(address user) external;

    /// @notice Save a user to the registry
    /// @param user user address
    /// @param metadata user metadata
    function saveUser(address user, bytes calldata metadata) external;
}
