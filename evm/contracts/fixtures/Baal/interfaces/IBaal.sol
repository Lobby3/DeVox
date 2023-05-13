//SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

interface IBaal {
    function burnLoot(
        address[] calldata from,
        uint256[] calldata amount
    ) external;

    function burnShares(
        address[] calldata from,
        uint256[] calldata amount
    ) external;

    function mintLoot(
        address[] calldata to,
        uint256[] calldata amount
    ) external;

    function mintShares(
        address[] calldata to,
        uint256[] calldata amount
    ) external;

    function setAdminConfig(bool pauseShares, bool pauseLoot) external;

    function setGovernanceConfig(bytes memory _governanceConfig) external;

    function shamans(address shaman) external returns (uint256);

    function isManager(address shaman) external returns (bool);

    function target() external returns (address);

    function totalSupply() external view returns (uint256);

    function sharesToken() external view returns (address);

    function lootToken() external view returns (address);
}
