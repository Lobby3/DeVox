import { useWeb3React } from "@web3-react/core";
import { Contract, ethers } from "ethers";
import { useEffect, useState } from "react";

import shamanContractJson from "../contract-types/DeVoxShamanV1.json";
import { _abi } from "../contract-types/erc20";

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
  const provider = new ethers.providers.AlchemyProvider(
    "goerli",
    process.env.NEXT_PUBLIC_ALCHEMY_API_KEY
  );

  useEffect(() => {
    const getTokenContract = async () => {
      if (!tokenAddress) {
        return;
      }

      const tokenContract = new ethers.Contract(tokenAddress, _abi, provider);
      setContract(tokenContract);
    };
    getTokenContract();
  }, [tokenAddress]);
  return contract;
};
