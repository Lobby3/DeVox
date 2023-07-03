import { ValidNetwork } from "@daohaus/keychain-utils";
import { useWeb3React } from "@web3-react/core";
import { Contract, ethers } from "ethers";
import { useEffect, useState } from "react";

import {
  DeVoxContractKeychains,
  DeVoxUserRegistryContract,
  hexadecimalize,
} from "../app/summon/utils";
import shamanContractJson from "../contract-types/DeVoxShamanV1.json";
import { _abi } from "../contract-types/erc20";
import { getChainInfo } from "../utils/chain-info";

export const useShamanContract = (shamanAddress?: string) => {
  const [contract, setContract] = useState<Contract | null>(null);
  const {
    hooks: { usePriorityProvider },
  } = useWeb3React();
  const provider = usePriorityProvider();

  useEffect(() => {
    const abi = shamanContractJson.abi;

    if (!provider) {
      return;
    }

    if (!shamanAddress) {
      return;
    }

    const contract = new Contract(shamanAddress, abi, provider.getSigner());

    setContract(contract);
  }, [provider, shamanAddress]);
  return contract;
};

export const useTokenContract = (tokenAddress?: string) => {
  const [contract, setContract] = useState<Contract | null>(null);
  const {
    hooks: { usePriorityProvider },
  } = useWeb3React();
  const provider = usePriorityProvider();

  useEffect(() => {
    const getTokenContract = async () => {
      if (!provider) {
        return;
      }

      if (!tokenAddress) {
        return;
      }

      const tokenContract = new ethers.Contract(
        tokenAddress,
        _abi,
        provider.getSigner()
      );
      setContract(tokenContract);
    };
    getTokenContract();
  }, [provider, tokenAddress]);
  return contract;
};

export const usePublicTokenContract = (tokenAddress?: string) => {
  const [contract, setContract] = useState<Contract | null>(null);

  useEffect(() => {
    const getTokenContract = async () => {
      if (!tokenAddress) {
        return;
      }

      const networkInfo = getChainInfo();

      const provider = new ethers.providers.AlchemyProvider(
        networkInfo.alchemyName,
        process.env.NEXT_PUBLIC_ALCHEMY_API_KEY
      );

      const tokenContract = new ethers.Contract(tokenAddress, _abi, provider);
      setContract(tokenContract);
    };
    getTokenContract();
  }, [tokenAddress]);

  return contract;
};

export const useUserRegistryContract = () => {
  const [contract, setContract] = useState<Contract | null>(null);
  const {
    hooks: { usePriorityProvider },
    chainId,
  } = useWeb3React();

  const provider = usePriorityProvider();

  useEffect(() => {
    const getContract = async () => {
      if (!provider) {
        return;
      }

      const chainIdHex = hexadecimalize(chainId) as ValidNetwork;
      const contractAddress =
        DeVoxContractKeychains.DeVoxUserRegistry[chainIdHex];
      if (!contractAddress) {
        return;
      }

      const contract = new ethers.Contract(
        contractAddress,
        DeVoxUserRegistryContract.abi,
        provider.getSigner()
      );

      setContract(contract);
    };

    getContract();
  }, [chainId, provider]);

  return contract;
};
