// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.12;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";

import "../fixtures/Baal/interfaces/IBaal.sol";
import "../lib/FixedPointMathLib.sol";
import "./IShaman.sol";

import "hardhat/console.sol";

/// @notice Shaman contract for Baal v3 DAOhaus
/// @dev This contract is used to issue voting shares (quadratic) and loot (1:1) for donations
contract DeVoxShamanV1 is
    Initializable,
    OwnableUpgradeable,
    ReentrancyGuardUpgradeable,
    UUPSUpgradeable,
    IShaman
{
    enum TokenType {
        LOOT,
        SHARES
    }

    /// @notice Role required in order to access admin methods
    // bytes32 public constant DEFAULT_ADMIN_ROLE =
    //     keccak256('DEFAULT_ADMIN_ROLE');
    /// @notice Current version of the contract
    uint16 internal _version;

    IBaal public baal;
    IERC20 public token;
    uint256 public id;
    uint256 public pricePerUnit;
    uint256 public tokensPerUnit;
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
    /// @param id campaign id
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
        uint256 id,
        uint256 amount,
        uint256 total,
        uint256 target,
        uint256 balance,
        uint256 lootIssued,
        uint256 sharesIssued,
        string message
    );

    /// @notice emitted when campaign target is updated
    /// @param id campaign id
    /// @param target campaign target amount
    /// @param balance current campaign balance
    event TargetUpdated(uint256 id, uint256 target, uint256 balance);

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
        uint256 _id,
        uint256 _pricePerUnit,
        uint256 _tokensPerUnit,
        uint256 _target
    ) external initializer returns(bool) {
        __Ownable_init();
        __UUPSUpgradeable_init();

        baal = IBaal(_moloch);
        token = IERC20(_token);
        id = _id;
        pricePerUnit = _pricePerUnit;
        tokensPerUnit = _tokensPerUnit;
        target = _target;

        console.log("DeVoxShamanV1 initialized at: %s", address(this));
        console.log(
            "DeVoxShamanV1 params: pricePerUnit %d, tokensPerUnit %d, target %d",
            pricePerUnit,
            tokensPerUnit,
            target
        );

        return true;
    }

    /// @notice Make a donation
    /// @param _value amount donated
    /// @param _message message accompanying donation
    function donate(
        uint256 _value,
        string calldata _message
    ) external nonReentrant {
        require(address(baal) != address(0), "!init");
        require(baal.isManager(address(this)), "Shaman not manager");
        require(_value % pricePerUnit == 0, "invalid amount"); // require value as multiple of units

        // send to DAO
        require(
            token.transferFrom(msg.sender, baal.target(), _value),
            "Transfer failed"
        );

        uint256 lootIssued = _lootToIssue(_value);
        _mintTokens(msg.sender, lootIssued, TokenType.LOOT);

        uint256 sharesIssued = _sharesToIssue(_value);
        _mintTokens(msg.sender, sharesIssued, TokenType.SHARES);

        uint256 total = donations[msg.sender];
        total = total + _value;
        donations[msg.sender] = total;

        emit DonationReceived(
            msg.sender,
            address(baal),
            id,
            _value,
            total,
            target,
            getTokenBalance(),
            lootIssued,
            sharesIssued,
            _message
        );
    }

    /// @notice Calculate the amount of loot to issue for a given donation
    function _lootToIssue(
        uint256 _value
    ) internal view virtual returns (uint256) {
        return (_value / pricePerUnit) * tokensPerUnit;
    }

    /// @notice Calculate the amount of shares to issue for a given donation
    /// @dev Use a square root function to give a Quadratic Voting effect
    function _sharesToIssue(
        uint256 _value
    ) internal view virtual returns (uint256) {
        return (FixedPointMathLib.sqrt(_value) / pricePerUnit) * tokensPerUnit;
    }

    /// @notice Mint tokens for a given address
    /// @param to Recipient of tokens
    /// @param amount Amount of tokens to mint
    /// @param _tokenType Shares or Loot
    function _mintTokens(
        address to,
        uint256 amount,
        TokenType _tokenType
    ) private {
        address[] memory _receivers = new address[](1);
        _receivers[0] = to;

        uint256[] memory _amounts = new uint256[](1);
        _amounts[0] = amount;

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
