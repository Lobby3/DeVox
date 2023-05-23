// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.7;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

import "./DeVoxShamanV1.sol";

contract DeVoxShamanSummonerV1 is
    Initializable,
    OwnableUpgradeable,
    UUPSUpgradeable
{
    /// @notice Current version of the contract
    uint16 internal _version;

    address payable public template;

    event SummonComplete(
        address indexed baal,
        address shaman,
        address token,
        uint256 pricePerUnit,
        uint256 lootPerUnit,
        uint256 sharesPerMember,
        uint256 target
    );

    /// @notice Contract constructor logic
    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    /// @notice Contract initialization logic
    function initialize(address payable _template) public initializer {
        __Ownable_init();
        __UUPSUpgradeable_init();

        template = _template;
    }

    function summonDeVoxShaman(
        address _moloch,
        address payable _token,
        uint256 _pricePerUnit,
        uint256 _lootPerUnit,
        uint256 _sharesPerMember,
        uint256 _target
    ) public returns (address) {
        DeVoxShamanV1 shaman = DeVoxShamanV1(payable(Clones.clone(template)));

        shaman.initialize(
            _moloch,
            _token,
            _pricePerUnit,
            _lootPerUnit,
            _sharesPerMember,
            _target
        );

        emit SummonComplete(
            _moloch,
            address(shaman),
            address(_token),
            _pricePerUnit,
            _lootPerUnit,
            _sharesPerMember,
            _target
        );

        return address(shaman);
    }

    /// @notice gets the current version of the contract
    function version() public view virtual returns (uint256) {
        return _version;
    }

    /// @notice Update the contract version number
    /// @dev onlyOwner
    function updateVersion() external onlyOwner {
        _version += 1;
    }

    /*******************
     * INTERNAL
     ******************/

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
