import { useWeb3React } from "@web3-react/core";
import { BigNumber, ethers } from "ethers";
import { useEffect, useState } from "react";

import { ERC20__factory } from "../../../evm/src/types";
import { useShamanContract } from "./contracts";

export const useBalance = () => {
  const contract = useShamanContract();
  const { provider, account } = useWeb3React();
  const [balance, setBalance] = useState(BigNumber.from(0));
  const [decimals, setDecimals] = useState(0);
  const [symbol, setSymbol] = useState("");

  useEffect(() => {
    const getBalance = async () => {
      if (!contract) {
        return;
      }
      const tokenAddress = await contract.token();

      if (!provider || !account) {
        return;
      }

      const tokenContract = new ethers.Contract(
        tokenAddress,
        ERC20__factory.abi,
        provider.getSigner()
      );

      const [balance, decimals, symbol] = await Promise.all([
        tokenContract.balanceOf(account),
        tokenContract.decimals(),
        tokenContract.symbol(),
      ]);
      setBalance(balance);
      setDecimals(decimals);
      setSymbol(symbol);
    };
    getBalance();
  }, [contract]);

  return { balance, decimals, symbol };
};
