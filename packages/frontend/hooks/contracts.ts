import { useWeb3React } from "@web3-react/core";
import { Contract, ethers } from "ethers";
import { useEffect, useState } from "react";

import { ERC20__factory } from "../../../evm/src/types";
import { _abi } from "../contract-types/erc20";

const shamanContractJson = require("../contract-types/DeVoxShamanV1.json");

export const useShamanContract = () => {
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

    const contract = new Contract(
      "0x2586e966863be18288c60c743bb945a45ec9e86b",
      abi,
      provider.getSigner()
    );

    setContract(contract);
  }, [provider]);
  return contract;
};

export const useTokenContract = () => {
  const [contract, setContract] = useState<Contract | null>(null);
  const {
    hooks: { usePriorityProvider },
  } = useWeb3React();
  const provider = usePriorityProvider();
  const shamanContract = useShamanContract();

  useEffect(() => {
    const getTokenContract = async () => {
      if (!shamanContract) {
        return;
      }
      const tokenAddress = await shamanContract.token();

      if (!provider) {
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
  }, [provider, shamanContract]);
  return contract;
};
