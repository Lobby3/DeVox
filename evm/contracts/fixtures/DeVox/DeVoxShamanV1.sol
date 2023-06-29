// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.12;

import {DeVoxShamanV0} from "../../shaman/DeVoxShamanV0.sol";

contract DeVoxShamanV1 is DeVoxShamanV0 {
    /// @notice Contract constructor logic
    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function mockedUpgradeFunction() public pure returns (bool) {
        return true;
    }
}
