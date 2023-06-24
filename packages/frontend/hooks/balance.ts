import { useWeb3React } from "@web3-react/core";
import { BigNumber, ethers } from "ethers";
import { useEffect, useState } from "react";

import { useTokenContract } from "./contracts";
import { useTokenInfo } from "./token";

export const useBalance = (tokenAddress?: string) => {
  const contract = useTokenContract(tokenAddress);
  const [balance, setBalance] = useState(BigNumber.from(0));
  const { account } = useWeb3React();
  const { decimals } = useTokenInfo(tokenAddress);

  useEffect(() => {
    const getBalance = async () => {
      if (!contract) {
        console.log("No token contract", tokenAddress);
        return;
      }

      const balance = await contract.balanceOf(account);
      setBalance(balance);
    };
    getBalance();
  }, [contract, tokenAddress]);

  return {
    balance,
    formattedBalance: ethers.utils.formatUnits(balance, decimals),
    tokenAddress,
  };
};
