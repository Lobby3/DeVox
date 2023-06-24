import { useEffect, useState } from "react";

import { usePublicTokenContract } from "./contracts";

export const useTokenInfo = (tokenAddress?: string) => {
  const publicTokenContract = usePublicTokenContract(tokenAddress);
  const [decimals, setDecimals] = useState(0);
  const [symbol, setSymbol] = useState("");

  useEffect(() => {
    const getSymbol = async () => {
      if (!publicTokenContract) {
        return;
      }

      const [decimals, symbol] = await Promise.all([
        publicTokenContract.decimals(),
        publicTokenContract.symbol(),
      ]);
      setDecimals(decimals);
      setSymbol(symbol);
    };
    getSymbol();
  }, [tokenAddress, publicTokenContract]);

  return {
    decimals,
    symbol,
  };
};
