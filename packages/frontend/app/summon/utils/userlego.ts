import { StaticContract } from "@daohaus/utils";

import IUserRegistryAbi from "../../../abi/IUserRegistry";
import { DeVoxContractKeychains } from "./keychains";

export const DeVoxUserRegistryContract: StaticContract = {
  contractName: "DeVoxUserRegistryV0",
  type: "static",
  abi: IUserRegistryAbi,
  targetAddress: DeVoxContractKeychains.DeVoxUserRegistry,
};
