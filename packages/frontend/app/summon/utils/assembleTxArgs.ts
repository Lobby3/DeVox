import { LOCAL_ABI } from "@daohaus/abis";
import {
  SummonParams,
  encodeMintParams,
  encodeTokenParams,
} from "@daohaus/contract-utils";
import { ValidNetwork, CONTRACT_KEYCHAINS } from "@daohaus/keychain-utils";
import {
  POSTER_TAGS,
  ZERO_ADDRESS,
  encodeFunction,
  encodeValues,
  getNonce,
  isNumberish,
  isString,
} from "@daohaus/utils";
import { randomBytes } from "crypto";
import { BigNumber } from "ethers";

import { FORM_KEYS } from "./formKeys";

const HardhatChainId = "0x31337";
export type ArgType = string | number | boolean | BigNumber | ArgType[];
export type OurValidNetwork = ValidNetwork | "0x31337";

export const assembleTxArgs = (
  formValues: Record<string, unknown>,
  chainId: OurValidNetwork,
  safeAddress?: string
): ArgType[] => {
  const tokenName = formValues["tokenName"];
  const tokenSymbol = formValues["tokenSymbol"];
  const lootTokenName = formValues["lootTokenName"];
  const lootTokenSymbol = formValues["lootTokenSymbol"];

  if (
    !isString(tokenName) ||
    !isString(tokenSymbol) ||
    !isString(lootTokenName) ||
    !isString(lootTokenSymbol)
  ) {
    console.log("ERROR: Form Values", formValues);

    throw new Error(
      "assembleSummonTx recieved arguments in the wrong shape or type"
    );
  }

  // const { POSTER } = handleKeychains(chainId);

  const mintParams = encodeMintParams(formValues);

  const tokenParams = encodeTokenParams(formValues);

  const initActions = [
    governanceConfigTX(formValues),
    // metadataConfigTX(formValues, POSTER),
  ];
  //   const args = [
  //     safeAddress || ZERO_ADDRESS,
  //     ZERO_ADDRESS,
  //     getNonce(),
  //     mintParams,
  //     tokenParams,
  //     initActions,
  //   ];

  // Baal "classic" factory summon args
  //   string memory _name /*_name Name for erc20 `shares` accounting, empty if token */,
  //   string memory _symbol /*_symbol Symbol for erc20 `shares` accounting, empty if token*/,
  //   address _safeAddr /*address of safe, 0 addr if new*/,
  //   address _forwarder /*Trusted forwarder address for meta-transactions (EIP 2771), 0 addr if initially disabled*/,
  //   address _lootToken /*predeployed loot token, 0 addr if new*/,
  //   address _sharesToken /*predeployed shares token, 0 addr if new*/
  const baalArgs = encodeValues(
    ["string", "string", "address", "address", "address", "address"],
    [
      <string>formValues[FORM_KEYS.TOKEN_NAME],
      <string>formValues[FORM_KEYS.TOKEN_SYMBOL],
      safeAddress || ZERO_ADDRESS,
      ZERO_ADDRESS,
      ZERO_ADDRESS,
      ZERO_ADDRESS,
    ]
  );

  const shamanArgs = getShamanInitParams();
  const referrer = Array.from(randomBytes(32).values());
  const args = [baalArgs, initActions, getNonce(), referrer, shamanArgs];
  console.log("args", args);

  return args;
};

const getShamanInitParams = function (
  tokenAddress: string = "0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e"
  // shamanArgs: DeVoxShamanSummonArgs
) {
  return encodeValues(
    ["address", "uint256", "uint256", "uint256", "string"],
    [
      tokenAddress,
      1000000000, // shamanArgs.pricePerUnit,
      1, // shamanArgs.tokensPerUnit,
      100000, // shamanArgs.target,
      "DeVox Campaign 1", // shamanArgs.name,
    ]
  );
};

const governanceConfigTX = (formValues: SummonParams) => {
  const {
    votingPeriodInSeconds,
    gracePeriodInSeconds,
    newOffering,
    quorum,
    sponsorThreshold,
    minRetention,
  } = formValues;

  if (
    !isNumberish(votingPeriodInSeconds) ||
    !isNumberish(gracePeriodInSeconds) ||
    !isNumberish(newOffering) ||
    !isNumberish(quorum) ||
    !isNumberish(sponsorThreshold) ||
    !isNumberish(minRetention)
  ) {
    throw new Error(
      "governanceConfigTX recieved arguments in the wrong shape or type"
    );
  }

  const encodedValues = encodeValues(
    ["uint32", "uint32", "uint256", "uint256", "uint256", "uint256"],
    [
      votingPeriodInSeconds,
      gracePeriodInSeconds,
      newOffering,
      quorum,
      sponsorThreshold,
      minRetention,
    ]
  );
  const encoded = encodeFunction(LOCAL_ABI.BAAL, "setGovernanceConfig", [
    encodedValues,
  ]);
  if (isString(encoded)) {
    return encoded;
  }
  throw new Error("Encoding Error");
};

// const metadataConfigTX = (formValues: SummonParams, posterAddress: string) => {
//   const { daoName } = formValues;
//   if (!isString(daoName)) {
//     console.log("ERROR: Form Values", formValues);
//     throw new Error("metadataTX recieved arguments in the wrong shape or type");
//   }

//   const METADATA = encodeFunction(LOCAL_ABI.POSTER, "post", [
//     JSON.stringify({ name: daoName }),
//     POSTER_TAGS.summoner,
//   ]);

//   const encoded = encodeFunction(LOCAL_ABI.BAAL, "executeAsBaal", [
//     posterAddress,
//     0,
//     METADATA,
//   ]);
//   if (isString(encoded)) {
//     return encoded;
//   }
//   throw new Error("Encoding Error");
// };
