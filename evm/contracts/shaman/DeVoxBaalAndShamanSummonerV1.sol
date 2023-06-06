// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

import {IBaal} from "../fixtures/Baal/interfaces/IBaal.sol";
import {IBaalSummoner} from "../fixtures/Baal/interfaces/IBaalSummoner.sol";
import {IShaman} from "./IShaman.sol";
import {IShamanSummoner} from "./IShamanSummoner.sol";

import {console} from "hardhat/console.sol";

/// @title Higher-order summoner contract for Baal and Shaman in a single transaction
contract DeVoxBaalAndShamanSummonerV1 is
    Initializable,
    OwnableUpgradeable,
    UUPSUpgradeable
{
    IBaalSummoner public _baalSummoner;
    IShamanSummoner public _shamanSummoner;

    function initialize(
        address baalSummoner,
        address shamanSummoner
    ) public initializer {
        require(baalSummoner != address(0), "baalSummoner: zero address");
        require(shamanSummoner != address(0), "shamanSummoner: zero address");

        __Ownable_init();
        __UUPSUpgradeable_init();

        _baalSummoner = IBaalSummoner(baalSummoner);
        _shamanSummoner = IShamanSummoner(shamanSummoner);
    }

    /// @notice Summon a new Baal and DeVoxShaman
    /// @param _initializationParams Baal initialization params
    /// @param _initializationActions Baal initialization actions
    /// @param _saltNonce Salt nonce for baal summoning
    /// @param _referrer Referrer data - can be used to track the source of the summoning
    /// @param _shamanInitializationParams Shaman initialization params
    function summonBaalAndShaman(
        bytes calldata _initializationParams,
        bytes[] calldata _initializationActions,
        uint256 _saltNonce,
        bytes32 _referrer,
        bytes calldata _shamanInitializationParams
    ) external returns (address _baalAddress, address _shamanAddress) {
        _shamanAddress = _shamanSummoner.summonDeVoxShaman(_shamanInitializationParams);
        require(_shamanAddress != address(0), "shamanAddress: zero address");

        bytes[] memory _baalInitializationActions = new bytes[](
            _initializationActions.length + 1
        );
        for (uint256 i = 0; i < _initializationActions.length; i++) {
            _baalInitializationActions[i] = _initializationActions[i];
        }
        address[] memory _shamans = new address[](1);
        _shamans[0] = _shamanAddress;
        uint256[] memory _permissions = new uint256[](1);
        _permissions[0] = 7;
        _baalInitializationActions[_baalInitializationActions.length - 1] = abi
            .encodeWithSelector(
                IBaal.setShamans.selector,
                _shamans, 
                _permissions
            );

        _baalAddress = _baalSummoner.summonBaalFromReferrer(
            _initializationParams,
            _baalInitializationActions,
            _saltNonce,
            _referrer
        );

        IShaman(_shamanAddress).setBaal(_baalAddress);
    }

    function _authorizeUpgrade(
        address newImplementation
    ) internal override onlyOwner {}
}
