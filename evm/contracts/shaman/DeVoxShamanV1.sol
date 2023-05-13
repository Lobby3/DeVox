// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";
import "../fixtures/Baal/interfaces/IBaal.sol";

/// @notice Shamom administers the cookie jar
contract DeVoxShamanV1 is
    Initializable,
    AccessControlUpgradeable,
    ReentrancyGuardUpgradeable,
    UUPSUpgradeable
{
    /*  shaman should
     *  - limit donating users to 1 voting share each
     *  - allow more than one donation; still max 1 v.s. ea.
     *
     *
     */

    enum TokenType {
        LOOT,
        SHARES
    }

    /// @notice User role required in order to upgrade the contract
    bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");
    /// @notice Role required in order to access admin methods
    // bytes32 public constant DEFAULT_ADMIN_ROLE =
    //     keccak256('DEFAULT_ADMIN_ROLE');
    /// @notice Current version of the contract
    uint16 internal _version;

    IBaal public baal;
    IERC20 public token;
    uint256 public pricePerUnit;
    uint256 public lootPerUnit;
    uint256 public sharesPerMember;
    uint256 public target;

    /// @notice Last cookie claims made by members
    /// @dev This is only a cache and claims older than period are deleted
    mapping(address => uint256) public donations;

    /*******************
     * EVENTS
     ******************/

    /// @notice emitted when a donation is received
    /// @param contributorAddress wallet sending the donation
    /// @param baal DAO contract address
    /// @param amount amount donated
    /// @param total total donated from this wallet
    /// @param target campaign target amount
    /// @param balance current campaign balance
    /// @param lootIssued loot issued for this donation
    /// @param sharesIssued shares issued for this donation
    /// @param message message accompanying the donation
    event DonationReceived(
        address indexed contributorAddress,
        address baal,
        uint256 amount,
        uint256 total,
        uint256 target,
        uint256 balance,
        uint256 lootIssued,
        uint256 sharesIssued,
        string message
    );

    /// @notice emitted when campaign target is updated
    /// @param target campaign target amount
    /// @param balance current campaign balance
    event TargetUpdated(uint256 target, uint256 balance);

    /*******************
     * DEPLOY
     ******************/

    /// @notice Contract constructor logic
    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    /// @notice Contract initialization logic
    function initialize(
        address _moloch,
        address payable _token,
        uint256 _pricePerUnit,
        uint256 _lootPerUnit,
        uint256 _sharesPerMember,
        uint256 _target
    ) public initializer {
        __AccessControl_init();
        __UUPSUpgradeable_init();

        baal = IBaal(_moloch);
        token = IERC20(_token);
        pricePerUnit = _pricePerUnit;
        lootPerUnit = _lootPerUnit;
        sharesPerMember = _sharesPerMember;
        target = _target;

        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(UPGRADER_ROLE, msg.sender);
    }

    /// @notice Grant membership to the specified address
    /// @param applicant New member address
    // function grantMembership(
    //     address applicant
    // ) external onlyRole(DEFAULT_ADMIN_ROLE) {
    //     _grantRole(MEMBER_ROLE, applicant);
    // }

    /// @notice Make a donation
    /// @param _value amount donated
    /// @param _message message accompanying donation
    function donate(
        uint256 _value,
        string calldata _message
    ) public nonReentrant {
        require(address(baal) != address(0), "!init");
        require(baal.isManager(address(this)), "Shaman not manager");
        require(_value % pricePerUnit == 0, "invalid amount"); // require value as multiple of units

        uint256 numUnits = _value / pricePerUnit;

        // send to DAO
        require(
            token.transferFrom(msg.sender, baal.target(), _value),
            "Transfer failed"
        );

        uint256 lootIssued = (numUnits * lootPerUnit);
        _mintTokens(msg.sender, lootIssued, TokenType.LOOT);

        uint256 total = donations[msg.sender];
        uint256 sharesIssued;
        if (total == 0) {
            sharesIssued = sharesPerMember;
            _mintTokens(msg.sender, sharesIssued, TokenType.SHARES);
        }

        total = total + _value;
        donations[msg.sender] = total;

        emit DonationReceived(
            msg.sender,
            address(baal),
            _value,
            total,
            target,
            getTokenBalance(),
            lootIssued,
            sharesIssued,
            _message
        );
    }

    function _mintTokens(
        address to,
        uint256 lootToGive,
        TokenType _tokenType
    ) private {
        address[] memory _receivers = new address[](1);
        _receivers[0] = to;

        uint256[] memory _amounts = new uint256[](1);
        _amounts[0] = lootToGive;

        if (_tokenType == TokenType.SHARES) {
            baal.mintShares(_receivers, _amounts);
        } else {
            baal.mintLoot(_receivers, _amounts);
        }
    }

    /// @notice Gets the total token balance of the contract
    function getTokenBalance() public returns (uint) {
        return token.balanceOf(baal.target());
    }

    function setTarget(uint256 _target) public {
        target = _target;
    }

    /// @notice gets the current version of the contract
    function version() public view virtual returns (uint256) {
        return _version;
    }

    /// @notice Update the contract version number
    /// @notice Only allowed for member of UPGRADER_ROLE
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

contract DeVoxShamanSummonerV1 {
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

    constructor(address payable _template) {
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
}
