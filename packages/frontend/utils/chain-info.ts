export const chainInfo: Record<
  string,
  {
    chainId: number;
    subgraph: string;
    daoHausSubgraph: string;
    alchemyName: string;
  }
> = {
  polygon: {
    chainId: 137,
    subgraph: "https://api.thegraph.com/subgraphs/name/seanmgonzalez/devox",
    daoHausSubgraph:
      "https://api.thegraph.com/subgraphs/name/hausdao/daohaus-v3-matic",
    alchemyName: "matic",
  },
  goerli: {
    chainId: 5,
    subgraph:
      "https://api.thegraph.com/subgraphs/name/moconnell/lobby3-devox-goerli",
    daoHausSubgraph:
      "https://api.thegraph.com/subgraphs/name/hausdao/daohaus-v3-goerli",
    alchemyName: "goerli",
  },
};

export const getChainInfo = () => {
  const chainName = process.env.NEXT_PUBLIC_NETWORK_NAME;

  if (!chainName) {
    throw new Error("No chain name set");
  }

  const chainInfoForChain = chainInfo[chainName];

  if (!chainInfoForChain) {
    throw new Error(`No chain info for chain ${chainName}`);
  }

  return chainInfoForChain;
};
