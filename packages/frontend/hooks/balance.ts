import { useWeb3React } from "@web3-react/core";
import { BigNumber, ethers } from "ethers";
import { useEffect, useState } from "react";

import { useTokenContract } from "./contracts";

export const useBalance = (tokenAddress?: string) => {
  const contract = useTokenContract(tokenAddress);
  const [balance, setBalance] = useState(BigNumber.from(0));
  const [decimals, setDecimals] = useState(0);
  const [symbol, setSymbol] = useState("");
  const { account } = useWeb3React();

  useEffect(() => {
    const getBalance = async () => {
      if (!contract) {
        return;
      }

      const [balance, decimals, symbol] = await Promise.all([
        contract.balanceOf(account),
        contract.decimals(),
        contract.symbol(),
      ]);
      setBalance(balance);
      setDecimals(decimals);
      setSymbol(symbol);
    };
    getBalance();
  }, [contract]);

  return {
    balance,
    decimals,
    symbol,
    formattedBalance: ethers.utils.formatUnits(balance, decimals),
    tokenAddress,
  };
};
