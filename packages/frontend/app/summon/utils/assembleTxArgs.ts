import { LOCAL_ABI } from "@daohaus/abis";
import {
  SummonParams,
  encodeMintParams,
  encodeTokenParams,
  handleKeychains,
} from "@daohaus/contract-utils";
import { ValidNetwork } from "@daohaus/keychain-utils";
import {
  POSTER_TAGS,
  encodeFunction,
  encodeValues,
  getNonce,
  isArray,
  isNumberish,
  isString,
} from "@daohaus/utils";
import { isAddress } from "@ethersproject/address";
import { BigNumber } from "ethers";

import { FORM_KEYS } from "./formKeys";
import { DeVoxContractKeychains, TreasuryTokenKeychains } from "./keychains";

export type ArgType = string | number | boolean | BigNumber | ArgType[];

export type ExtendedSummonParams = SummonParams & {
  daoDescription?: string;
  daoAvatarImg?: string;
};

export const assembleTxArgs = (
  formValues: Record<string, unknown>,
  chainId: ValidNetwork
): ArgType[] => {
  const tokenName = formValues[FORM_KEYS.TOKEN_NAME];
  const tokenSymbol = formValues[FORM_KEYS.TOKEN_SYMBOL];
  const lootTokenName = formValues[FORM_KEYS.LOOT_TOKEN_NAME];
  const lootTokenSymbol = formValues[FORM_KEYS.LOOT_TOKEN_SYMBOL];

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

  addDeadLoot(formValues);

  const { POSTER } = handleKeychains(chainId);
  const mintParams = encodeMintParams(formValues);
  const tokenParams = encodeTokenParams(formValues);

  const baalInitActions = [
    governanceConfigTX(formValues),
    metadataConfigTX(formValues, POSTER),
  ];

  const shamanArgs = getShamanInitParams(formValues, chainId);
  const args = [
    getNonce(),
    mintParams,
    tokenParams,
    baalInitActions,
    shamanArgs,
  ];
  // console.log("args", args);

  return args;
};

const getShamanInitParams = function (
  formValues: Record<string, unknown>,
  chainId: ValidNetwork
) {
  const tokenSymbol = formValues[FORM_KEYS.TREASURY_TOKEN];
  if (!isString(tokenSymbol)) throw new Error("tokenSymbol is not a string");
  const tokenAddress = TreasuryTokenKeychains[tokenSymbol][chainId] ?? "";
  if (!isAddress(tokenAddress))
    throw new Error(`tokenAddress is not a valid address: ${tokenAddress}`);
  const userRegistryAddress =
    DeVoxContractKeychains.DeVoxUserRegistryContract[chainId];
  if (!isString(userRegistryAddress))
    throw new Error(`userRegistryAddress not found for chainId: ${chainId}`);
  if (!isAddress(userRegistryAddress))
    throw new Error(
      `userRegistryAddress is not a valid address: ${userRegistryAddress}`
    );
  const tokenDecimals = formValues[FORM_KEYS.TREASURY_TOKEN_DECIMALS];
  if (!isNumberish(tokenDecimals))
    throw new Error("tokenDecimals is not a number");
  const pricePerUnit = BigNumber.from(10).pow(tokenDecimals);
  const tokensPerUnit = Number(
    process.env.NEXT_PUBLIC_SHAMAN_TOKENS_PER_UNIT ?? 1
  );
  if (!isNumberish(tokensPerUnit))
    throw new Error("tokensPerUnit is not a number");
  const target = Number(formValues[FORM_KEYS.CAMPAIGN_TARGET]);
  if (!isNumberish(target)) throw new Error("target is not a number");
  const daoName = formValues[FORM_KEYS.DAO_NAME];
  if (!isString(daoName)) throw new Error("daoName is not a string");
  const adminAddresses =
    process.env.NEXT_PUBLIC_SHAMAN_ADMINS?.split(",") || [];
  if (!adminAddresses.every((address) => isAddress(address)))
    throw new Error("adminAddresses contains invalid addresses");

  const shamanArgs = [
    tokenAddress,
    userRegistryAddress,
    pricePerUnit,
    tokensPerUnit,
    target,
    daoName,
    adminAddresses,
  ];
  // console.log("shamanArgs", shamanArgs);

  return encodeValues(
    [
      "address",
      "address",
      "uint256",
      "uint256",
      "uint256",
      "string",
      "address[]",
    ],
    shamanArgs
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

const metadataConfigTX = (
  formValues: ExtendedSummonParams,
  posterAddress: string
) => {
  const { daoName, daoDescription, daoAvatarImg } = formValues;
  if (!isString(daoName)) {
    console.error("ERROR: Form Values", formValues);
    throw new Error("metadataTX recieved arguments in the wrong shape or type");
  }

  const METADATA = encodeFunction(LOCAL_ABI.POSTER, "post", [
    JSON.stringify({
      name: daoName,
      description: daoDescription,
      avatarImg: daoAvatarImg,
    }),
    POSTER_TAGS.summoner,
  ]);

  const encoded = encodeFunction(LOCAL_ABI.BAAL, "executeAsBaal", [
    posterAddress,
    0,
    METADATA,
  ]);
  if (isString(encoded)) {
    return encoded;
  }
  throw new Error("Encoding Error");
};

function addDeadLoot(formValues: Record<string, unknown>) {
  const deadLoot = process.env.NEXT_PUBLIC_SHAMAN_DEAD_LOOT;
  if (!isNumberish(deadLoot))
    throw new Error(".env key NEXT_PUBLIC_SHAMAN_DEAD_LOOT is not a number");

  const { members } = formValues as SummonParams;
  if (
    !members ||
    !isArray(members?.memberAddresses) ||
    members.memberAddresses.some((addr: string) => !isString(addr)) ||
    !isArray(members?.memberShares) ||
    members.memberShares.some((shares: string) => !isNumberish(shares)) ||
    !isArray(members?.memberLoot) ||
    members.memberLoot.some((shares: string) => !isNumberish(shares))
  ) {
    console.log("ERROR: Form Values", formValues);
    throw new Error(
      "encodeMintParams recieved arguments in the wrong shape or type"
    );
  }

  const { memberAddresses, memberShares, memberLoot } = members;
  memberAddresses.push("0x000000000000000000000000000000000000dEaD");
  memberShares.push("0");
  memberLoot.push(deadLoot);

  // console.log("members", formValues.members);
}
