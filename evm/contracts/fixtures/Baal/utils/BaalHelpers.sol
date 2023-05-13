//SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "@gnosis.pm/safe-contracts/contracts/base/Executor.sol";
import "@gnosis.pm/zodiac/contracts/core/Module.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

import "../interfaces/IBaalHelper.sol";
import "../interfaces/IBaalToken.sol";
import "../types/BaalTypes.sol";

contract BaalHelpers is
    Executor,
    Module,
    AccessControlUpgradeable,
    UUPSUpgradeable,
    IBaalHelper
{
    /// @notice User role required in order to upgrade the contract
    bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");
    
    address private constant ETH =
        0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE; /*ETH reference for redemptions*/

    IBaalToken private lootToken; 
    IBaalToken private sharesToken; 

    function setUp(bytes memory initializeParams) public override {
        // no-op
    }

    /// @notice Contract constructor logic
    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    /// @notice Summon Baal with voting configuration & initial array of `members` accounts with `shares` & `loot` weights.
    function initialize(address _lootToken, address _sharesToken) public initializer {
        __AccessControl_init();
        __UUPSUpgradeable_init();

        lootToken = IBaalToken(_lootToken);
        sharesToken = IBaalToken(_sharesToken);
    }

    /***************
    HELPER FUNCTIONS
    ***************/
    /// @notice Returns the keccak256 hash of calldata
    function hashOperation(
        bytes memory _transactions
    ) public pure override returns (bytes32 hash) {
        return keccak256(abi.encode(_transactions));
    }

    function proposalState(
        BaalTypes.Proposal memory prop
    ) external view returns (BaalTypes.ProposalState) {
        if (prop.id == 0) {
            /*Uninitialized state*/
            return BaalTypes.ProposalState.Unborn;
        } else if (prop.status[0] /* cancelled */) {
            return BaalTypes.ProposalState.Cancelled;
        } else if (prop.votingStarts == 0 /*Voting has not started*/) {
            return BaalTypes.ProposalState.Submitted;
        } else if (block.timestamp <= prop.votingEnds /*Voting in progress*/) {
            return BaalTypes.ProposalState.Voting;
        } else if (
            block.timestamp <= prop.graceEnds /*Proposal in grace period*/
        ) {
            return BaalTypes.ProposalState.Grace;
        } else if (
            prop.noVotes >=
            prop.yesVotes /*Voting has concluded and failed to pass*/
        ) {
            return BaalTypes.ProposalState.Defeated;
        } else if (prop.status[1] /* processed */) {
            return BaalTypes.ProposalState.Processed;
        }
        /* Proposal is ready to be processed*/
        else {
            return BaalTypes.ProposalState.Ready;
        }
    }

    /// @notice Transfer of rage quit
    /// @param to Account that receives 'fair share'.
    /// @param lootToBurn Baal pure economic weight to burn.
    /// @param sharesToBurn Baal voting weight to burn.
    /// @param totalSupply Baal total supply of tokens.
    /// @param tokens Array of tokens to include in rage quit calculation
    function ragequitTransfer(
        address to,
        uint256 sharesToBurn,
        uint256 lootToBurn,
        uint256 totalSupply,
        address[] memory tokens
    ) external override {
                
        if (lootToBurn != 0) {
            /*gas optimization*/
            _burnLoot(
                _msgSender(),
                lootToBurn
            ); /*subtract `loot` from user account & Baal totals*/
        }

        if (sharesToBurn != 0) {
            /*gas optimization*/
            _burnShares(
                _msgSender(),
                sharesToBurn
            ); /*subtract `shares` from user account & Baal totals with erc20 accounting*/
        }

        for (uint256 i = 0; i < tokens.length; i++) {
            uint256 balance;
            if (tokens[i] == ETH) {
                balance = address(target).balance;
            } else {
                (, bytes memory balanceData) = tokens[i].staticcall(
                    abi.encodeWithSelector(0x70a08231, address(target))
                ); /*get Baal token balances - 'balanceOf(address)'*/
                balance = abi.decode(balanceData, (uint256));
            }

            uint256 amountToRagequit = ((lootToBurn + sharesToBurn) * balance) /
                totalSupply; /*calculate 'fair shair' claims*/

            if (amountToRagequit != 0) {
                /*gas optimization to allow higher maximum token limit*/
                tokens[i] == ETH
                    ? _safeTransferETH(
                        to,
                        amountToRagequit
                    ) /*execute 'safe' ETH transfer*/
                    : _safeTransfer(
                        tokens[i],
                        to,
                        amountToRagequit
                    ); /*execute 'safe' token transfer*/
            }
        }
    }

    /// @notice Burn function for Baal `loot`.
    /// @param from Address to lose loot
    /// @param loot Amount to burn
    function _burnLoot(address from, uint256 loot) private {
        lootToken.burn(from, loot);
    }

    /// @notice Burn function for Baal `shares`.
    /// @param from Address to lose shares
    /// @param shares Amount to burn
    function _burnShares(address from, uint256 shares) private {
        sharesToken.burn(from, shares);
    }

    /// @notice Provides 'safe' {transfer} for ETH.
    function _safeTransferETH(address to, uint256 amount) internal {
        // transfer eth from target
        (bool success, ) = execAndReturnData(
            to,
            amount,
            "",
            Enum.Operation.Call
        );

        require(success, "ETH_TRANSFER_FAILED");
    }

    /// @notice Provides 'safe' {transfer} for tokens that do not consistently return 'true/false'.
    function _safeTransfer(
        address token,
        address to,
        uint256 amount
    ) internal {
        (bool success, bytes memory data) = execAndReturnData(
            token,
            0,
            abi.encodeWithSelector(0xa9059cbb, to, amount),
            Enum.Operation.Call
        ); /*'transfer(address,uint)'*/
        require(
            success && (data.length == 0 || abi.decode(data, (bool))),
            "transfer failed"
        ); /*checks success & allows non-conforming transfers*/
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
