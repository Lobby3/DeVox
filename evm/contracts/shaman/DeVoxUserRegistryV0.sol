// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.12;

import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

import {IUserRegistry} from "./IUserRegistry.sol";

// import "hardhat/console.sol";

/// @notice Shaman contract for Baal v3 DAOhaus
/// @dev This contract is used to issue voting shares (quadratic) and loot (1:1) for donations
contract DeVoxUserRegistryV0 is
    Initializable,
    OwnableUpgradeable,
    UUPSUpgradeable,
    IUserRegistry
{
    /// @notice Current version of the contract
    uint16 internal _version;

    /// @notice Whitelist of addresses that can join the DAO
    mapping(address => bool) private _registry;

    /*******************
     * DEPLOY
     ******************/

    /// @notice Contract constructor logic
    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    /// @notice Contract initialization logic
    function initialize() external initializer {
        __Ownable_init();
        __UUPSUpgradeable_init();

        // console.log("DeVoxUserRegistryV0 deployed by %s", msg.sender);
    }

    /*******************
     * IUserRegistry
     ******************/

    /// @notice Check if a user is in the registry
    /// @param user user address
    /// @return true if user is in the registry
    function getUser(address user) external view override returns (bool) {
        return _registry[user];
    }

    /// @notice Remove a user from the registry
    /// @param user user address
    function removeUser(address user) external override {
        require(_registry[user], "removeUser: user not found");
        delete _registry[user];

        emit UserRemoved(user);
    }

    /// @notice Save a user to the registry
    /// @param user user address
    /// @param metadata user metadata
    function saveUser(address user, bytes calldata metadata) external override {
        _registry[user] = true;

        emit UserSaved(user, metadata);
    }

    /*******************
     * OWNER
     ******************/

    /// @notice Update the contract version number
    /// @dev onlyOwner
    function updateVersion() external onlyOwner {
        _version += 1;
    }

    /// @notice upgrade authorization logic
    /// @dev adds onlyOwner requirement
    function _authorizeUpgrade(
        address /*newImplementation*/
    )
        internal
        view
        override
        onlyOwner // solhint-disable-next-line no-empty-blocks
    {
        //empty block
    }
}
