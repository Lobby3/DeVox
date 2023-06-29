// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.12;

import {AccessControlUpgradeable} from "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

import {IUserRegistry} from "./IUserRegistry.sol";

/// @notice This contract is used to manage the registry of users
/// @dev This contract is AccessControlUpgradeable to allow for future security upgrades
contract DeVoxUserRegistryV0 is
    Initializable,
    AccessControlUpgradeable,
    UUPSUpgradeable,
    IUserRegistry
{
    /// @notice User role required in order to upgrade the contract
    bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");

    /// @notice User role required in order to write to the registry
    bytes32 public constant WRITE_ROLE = keccak256("WRITE_ROLE");

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
    function initialize() public initializer {
        __AccessControl_init();
        __UUPSUpgradeable_init();

        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(UPGRADER_ROLE, msg.sender);
    }

    /*******************
     * IUserRegistry
     ******************/

    /// @notice Check if a user is in the registry
    /// @param user user address
    /// @return true if user is in the registry
    function getUser(address user) external view override returns (bool) {
        return _getUser(user);
    }

    /// @notice Remove a user from the registry
    /// @param user user address
    function removeUser(address user) external override {
        _removeUser(user);
    }

    /// @notice Save a user to the registry
    /// @param user user address
    /// @param metadata user metadata
    function saveUser(address user, bytes calldata metadata) external override {
        _saveUser(user, metadata);
    }

    /*******************
     * INTERNAL
     ******************/

    function _getUser(address user) internal view virtual returns (bool) {
        return _registry[user];
    }

    /// @dev e.g. can override with onlyRole(WRITE_ROLE) in a future version
    function _removeUser(address user) internal virtual {
        require(_registry[user], "removeUser: user not found");
        delete _registry[user];

        emit UserRemoved(user);
    }

    /// @dev e.g. can override with onlyRole(WRITE_ROLE) in a future version
    function _saveUser(address user, bytes calldata metadata) internal virtual {
        _registry[user] = true;

        emit UserSaved(user, metadata);
    }

    /*******************
     * OWNER
     ******************/

    /// @notice Update the contract version number
    /// @dev onlyRole(UPGRADER_ROLE)
    function updateVersion() external onlyRole(UPGRADER_ROLE) {
        _version += 1;
    }

    /// @notice upgrade authorization logic
    /// @dev adds onlyRole(UPGRADER_ROLE) requirement
    function _authorizeUpgrade(
        address /*newImplementation*/
    )
        internal
        view
        override
        onlyRole(UPGRADER_ROLE) // solhint-disable-next-line no-empty-blocks
    {
        //empty block
    }
}
