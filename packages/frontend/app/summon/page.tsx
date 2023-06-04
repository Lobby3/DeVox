"use client";

import { useHausConnect } from "@daohaus/daohaus-connect-feature";
import { TXBuilder } from "@daohaus/tx-builder";
import { Footer, widthQuery } from "@daohaus/ui";
import styled from "@emotion/styled";
import { useWeb3React } from "@web3-react/core";
import { useState } from "react";

import { CenterLayout } from "./layouts/FormLayouts";
import { SummonError } from "./layouts/SummonError";
import { SummonerForm } from "./layouts/SummonerForm";
import { SummonerLoading } from "./layouts/SummonerLoading";
import { SummonerSuccess } from "./layouts/SummonerSuccess";
import { SummonStates } from "./types";

const TemporaryLayout = styled.div`
  width: 100%;
  padding-top: 2.7rem;
  padding: 4rem;
  @media ${widthQuery.sm} {
    .title {
      font-size: 3.5rem;
      margin-bottom: 2rem;
    }
  }
`;

const SummonerPage = () => {
  // TODO: Wire this up with magic.link
  // TODO: Summon at the same time
  // TODO: Remove the shaman input box, and fire up our own
  //
  const { provider, chainId } = useWeb3React();
  console.log(`0x${chainId?.toString()}`);

  const [summonState, setSummonState] = useState<SummonStates>("idle");
  const [txHash, setTxHash] = useState<string>("");
  const [daoAddress, setDaoAddress] = useState<string>("");
  const [errMsg, setErrMsg] = useState<string>("");

  return (
    <TXBuilder
      provider={provider}
      chainId={`0x${chainId?.toString()}`}
      appState={{}}
    >
      <TemporaryLayout>
        <CenterLayout>
          {summonState === "idle" && (
            <SummonerForm
              setSummonState={setSummonState}
              setTxHash={setTxHash}
              setDaoAddress={setDaoAddress}
              setErrMsg={setErrMsg}
            />
          )}
          {summonState === "loading" && <SummonerLoading txHash={txHash} />}
          {summonState === "success" && (
            <SummonerSuccess
              chainId={chainId?.toString()}
              daoAddress={daoAddress}
              setSummonState={setSummonState}
            />
          )}
          {summonState === "error" && (
            <SummonError
              errMsg={errMsg}
              setSummonState={setSummonState}
              daoAddress={daoAddress}
            />
          )}
        </CenterLayout>
        <Footer />
      </TemporaryLayout>
    </TXBuilder>
  );
};

export default SummonerPage;
