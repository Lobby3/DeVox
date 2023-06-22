import { useWeb3React } from "@web3-react/core";
import { Contract } from "ethers";
import { useEffect, useState } from "react";

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
      "0xc06ede2b86515956821e9ef731ba05a29634c431",
      abi,
      provider.getSigner()
    );

    setContract(contract);
  }, [provider]);
  return contract;
};
