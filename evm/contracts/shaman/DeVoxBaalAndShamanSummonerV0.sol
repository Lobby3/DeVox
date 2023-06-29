// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import {Module} from "@gnosis.pm/zodiac/contracts/core/Module.sol";
import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import {AccessControlUpgradeable} from "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

import {IBaal} from "../fixtures/Baal/interfaces/IBaal.sol";
import {IBaalAdvTokenSummoner} from "../baal/interfaces/IBaalAdvTokenSummoner.sol";
import {IShaman} from "./IShaman.sol";
import {IShamanSummoner} from "./IShamanSummoner.sol";

// import {console} from "hardhat/console.sol";

/// @title Higher-order summoner contract for Baal and Shaman in a single transaction
contract DeVoxBaalAndShamanSummonerV0 is
    Initializable,
    AccessControlUpgradeable,
    UUPSUpgradeable
{
    /// @notice User role required in order to upgrade the contract
    bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");

    /// @notice Current version of the contract
    uint16 internal _version;

    IBaalAdvTokenSummoner public _baalSummoner;
    IShamanSummoner public _shamanSummoner;

    function initialize(
        address baalSummoner,
        address shamanSummoner
    ) public initializer {
        require(baalSummoner != address(0), "baalSummoner: zero address");
        require(shamanSummoner != address(0), "shamanSummoner: zero address");

        __AccessControl_init();
        __UUPSUpgradeable_init();

        _baalSummoner = IBaalAdvTokenSummoner(baalSummoner);
        _shamanSummoner = IShamanSummoner(shamanSummoner);
    }

    /// @notice Summon a new Baal and DeVoxShaman
    /// @param _saltNonce Salt nonce for baal summoning
    /// @param _initializationMintParams The parameters for minting the tokens
    /// @param _initializationTokenParams The parameters for deploying the tokens
    /// @param _baalInitializationActions Baal initialization actions
    /// @param _shamanInitializationParams Shaman initialization params
    /// @return _baalAddress The address of the new Baal contract
    /// @return _shamanAddress The address of the new Shaman contract
    function summonBaalAndShaman(
        uint256 _saltNonce,
        bytes calldata _initializationMintParams,
        bytes calldata _initializationTokenParams,
        bytes[] calldata _baalInitializationActions,
        bytes calldata _shamanInitializationParams
    ) external returns (address _baalAddress, address _shamanAddress) {
        bytes[] memory _newBaalInitializationActions = new bytes[](
            _baalInitializationActions.length + 1
        );
        for (uint256 i = 0; i < _baalInitializationActions.length; i++) {
            _newBaalInitializationActions[i] = _baalInitializationActions[i];
        }

        _newBaalInitializationActions[
            _newBaalInitializationActions.length - 1
        ] = abi.encodeWithSelector(
            OwnableUpgradeable.transferOwnership.selector,
            address(this)
        );

        _baalAddress = _baalSummoner.summonBaalFromReferrer(
            _saltNonce,
            _initializationMintParams,
            _initializationTokenParams,
            _newBaalInitializationActions
        );

        _shamanAddress = _shamanSummoner.summonDeVoxShaman(
            _baalAddress,
            _shamanInitializationParams
        );

        require(_shamanAddress != address(0), "shamanAddress: zero address");

        Module(_baalAddress).setAvatar(address(this));

        address[] memory _shamans = new address[](1);
        _shamans[0] = _shamanAddress;
        uint256[] memory _permissions = new uint256[](1);
        _permissions[0] = 7;
        IBaal(_baalAddress).setShamans(_shamans, _permissions);
    }

    /// @notice gets the current version of the contract
    function version() public view virtual returns (uint256) {
        return _version;
    }

    /// @notice Update the contract version number
    /// @dev onlyOwner
    function updateVersion() external onlyRole(UPGRADER_ROLE) {
        _version += 1;
    }

    function _authorizeUpgrade(
        address newImplementation
    )
        internal
        override
        onlyRole(UPGRADER_ROLE) // solhint-disable-next-line no-empty-blocks
    {}
}
