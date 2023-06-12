import { LOCAL_ABI } from "@daohaus/abis";
import {
  SummonParams,
  encodeMintParams,
  encodeTokenParams,
} from "@daohaus/contract-utils";
import { ValidNetwork } from "@daohaus/keychain-utils";
import {
  encodeFunction,
  encodeValues,
  getNonce,
  isNumberish,
  isString,
} from "@daohaus/utils";
import { BigNumber } from "ethers";
import { FORM_KEYS } from "./formKeys";
import { TreasuryTokenKeychains } from "./wellKnown";

export type ArgType = string | number | boolean | BigNumber | ArgType[];

export const assembleTxArgs = (
  formValues: Record<string, unknown>,
  chainId: ValidNetwork
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

  const mintParams = encodeMintParams(formValues);
  const tokenParams = encodeTokenParams(formValues);

  const baalInitActions = [governanceConfigTX(formValues)];

  const shamanArgs = getShamanInitParams(formValues, chainId);
  const args = [getNonce(), mintParams, tokenParams, baalInitActions, shamanArgs];
  console.log("args", args);

  return args;
};

const getShamanInitParams = function (
  formValues: Record<string, unknown>,
  chainId: ValidNetwork,
) {
  const tokenSymbol = formValues[FORM_KEYS.TREASURY_TOKEN];
  if (!isString(tokenSymbol)) throw new Error("tokenSymbol is not a string");
  const tokenAddress = TreasuryTokenKeychains[tokenSymbol][chainId];
  if (!isString(tokenAddress)) throw new Error("tokenAddress is not a string");
  const daoName = formValues[FORM_KEYS.DAO_NAME];
  if (!isString(daoName)) throw new Error("daoName is not a string");
  const target = Number(formValues[FORM_KEYS.CAMPAIGN_TARGET]);
  if (!isNumberish(target)) throw new Error("target is not a number");

  return encodeValues(
    ["address", "uint256", "uint256", "uint256", "string"],
    [
      tokenAddress,
      1000000, // shamanArgs.pricePerUnit,
      1, // shamanArgs.tokensPerUnit,
      target, // shamanArgs.target,
      daoName, // shamanArgs.name,
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
