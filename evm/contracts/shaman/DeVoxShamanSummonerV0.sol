// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.12;

import {AccessControlUpgradeable} from "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import {ERC1967Proxy} from "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";

import {DeVoxShamanV0} from "./DeVoxShamanV0.sol";
import {IShaman} from "./IShaman.sol";
import {IShamanSummoner} from "./IShamanSummoner.sol";

contract DeVoxShamanSummonerV0 is
    Initializable,
    AccessControlUpgradeable,
    UUPSUpgradeable,
    IShamanSummoner
{
    /// @notice User role required in order to upgrade the contract
    bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");

    /// @notice Current version of the contract
    uint16 internal _version;

    /// @notice Current version of the contract
    uint256 internal _id;

    address public template;

    /*******************
     * EVENTS
     ******************/

    /// @notice emitted when a new shaman is summoned
    /// @param baal Baal contract address
    /// @param shaman Shaman contract address
    /// @param token ERC20 token address
    /// @param userRegistry UserRegistry contract address
    /// @param id Id of the campaign
    /// @param pricePerUnit Raw amount of ERC20 required per accounting unit (USD)
    /// @param tokensPerUnit Amount of tokens issued per accounting unit (USD)
    /// @param target Target amount of accounting unit to be raised
    /// @param name Name of the campaign
    event SummonComplete(
        address indexed baal,
        address indexed shaman,
        address token,
        address userRegistry,
        uint256 id,
        uint256 pricePerUnit,
        uint256 tokensPerUnit,
        uint256 target,
        string name
    );

    /// @notice Contract constructor logic
    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    /// @notice Contract initialization logic
    function initialize(address _template) public initializer {
        __AccessControl_init();
        __UUPSUpgradeable_init();

        template = _template;

        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(UPGRADER_ROLE, msg.sender);
    }

    function summonDeVoxShaman(
        address _baal,
        bytes calldata _initializationParams
    ) external virtual override returns (address) {
        _id = _id + 1;

        (
            address _token,
            address _userRegistry,
            uint256 _pricePerUnit,
            uint256 _tokensPerUnit,
            uint256 _target,
            string memory _name,
            address[] memory _admins
        ) = abi.decode(
                _initializationParams,
                (address, address, uint256, uint256, uint256, string, address[])
            );

        require(
            _baal != address(0),
            "DeVoxShamanSummonerV1: _baal cannot be 0x0"
        );
        require(
            _token != address(0),
            "DeVoxShamanSummonerV1: _token cannot be 0x0"
        );

        address shaman = address(
            new ERC1967Proxy(
                template,
                abi.encodeWithSelector(
                    IShaman(template).initialize.selector,
                    _baal,
                    _token,
                    _userRegistry,
                    _id,
                    _pricePerUnit,
                    _tokensPerUnit,
                    _target,
                    _admins
                )
            )
        );

        require(
            address(DeVoxShamanV0(shaman).token()) == address(_token),
            "DeVoxShamanSummonerV1: token mismatch"
        );

        emit SummonComplete(
            _baal,
            shaman,
            _token,
            _userRegistry,
            _id,
            _pricePerUnit,
            _tokensPerUnit,
            _target,
            _name
        );

        return shaman;
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

    /*******************
     * INTERNAL
     ******************/

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
