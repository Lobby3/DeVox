import { ExplorerLink } from "@daohaus/connect";
import { Bold, H1, Link, ParMd } from "@daohaus/ui";
import React from "react";

import { InfoSection } from "./FormLayouts";

type LoadingProps = {
  txHash: string;
};

export const SummonerLoading = ({ txHash }: LoadingProps) => {
  return (
    <div>
      <H1 className="title">
        <Bold>Create Campaign DAO</Bold>
      </H1>
      <InfoSection>
        <ParMd className="info">DAO contract deployment in progress.</ParMd>
        <ExplorerLink address={txHash} type="tx">
          Watch Transaction
        </ExplorerLink>
      </InfoSection>
    </div>
  );
};
