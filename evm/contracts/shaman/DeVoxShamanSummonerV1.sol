// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.12;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";

import "./DeVoxShamanV1.sol";

contract DeVoxShamanSummonerV1 is
    Initializable,
    OwnableUpgradeable,
    UUPSUpgradeable
{
    /// @notice Current version of the contract
    uint16 internal _version;

    /// @notice Current version of the contract
    uint256 internal _id;

    address payable public template;

    /*******************
     * EVENTS
     ******************/

    /// @notice emitted when a new shaman is summoned
    /// @param baal Baal contract address
    /// @param shaman Shaman contract address
    /// @param token ERC20 token address
    /// @param id Id of the campaign
    /// @param pricePerUnit Raw amount of ERC20 required for 1 USD
    /// @param tokensPerUnit Amount of tokens issued per 1 USD
    /// @param target Target amount of USD to be raised
    event SummonComplete(
        address indexed baal,
        address shaman,
        address token,
        uint256 id,
        uint256 pricePerUnit,
        uint256 tokensPerUnit,
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
        uint256 _tokensPerUnit,
        uint256 _target
    ) public returns (address) {
        _id = _id + 1;

        address shaman = address(
            new ERC1967Proxy(
                template,
                abi.encodeWithSelector(
                    IShaman(template).initialize.selector,
                    _moloch,
                    _token,
                    _id,
                    _pricePerUnit,
                    _tokensPerUnit,
                    _target
                )
            )
        );

        emit SummonComplete(
            _moloch,
            shaman,
            address(_token),
            _id,
            _pricePerUnit,
            _tokensPerUnit,
            _target
        );

        return shaman;
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
