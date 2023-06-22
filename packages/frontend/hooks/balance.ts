import { useWeb3React } from "@web3-react/core";
import { BigNumber, ethers } from "ethers";
import { useEffect, useState } from "react";

import { useTokenContract } from "./contracts";

export const useBalance = () => {
  const contract = useTokenContract();
  const [balance, setBalance] = useState(BigNumber.from(0));
  const [decimals, setDecimals] = useState(0);
  const [symbol, setSymbol] = useState("");
  const [tokenAddress, setTokenAddress] = useState("");
  const { account } = useWeb3React();

  useEffect(() => {
    const getBalance = async () => {
      if (!contract) {
        return;
      }

      setTokenAddress(contract.address);

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
