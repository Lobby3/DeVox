import { HausConnectProvider } from "@daohaus/daohaus-connect-feature";
import { TXBuilder } from "@daohaus/tx-builder";
import { HausThemeProvider, widthQuery } from "@daohaus/ui";
import { useWeb3React } from "@web3-react/core";
import { useState } from "react";
import styled from "styled-components";

import { CenterLayout } from "./layouts/FormLayouts";
import { SummonError } from "./layouts/SummonError";
import { SummonerForm } from "./layouts/SummonerForm";
import { SummonerLoading } from "./layouts/SummonerLoading";
import { SummonerSuccess } from "./layouts/SummonerSuccess";
import { SummonStates } from "./types";
import { hexadecimalize } from "./utils";

const TemporaryLayout = styled.div`
  background-color: #1a1a1a;
  width: 100%;
  padding-top: 2.7rem;
  padding: 4rem;
  @media ${widthQuery.sm} {
    .title {
      font-size: 3.5rem;
      margin-bottom: 2rem;
    }
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  label {
    color: #fff;
  }
`;
const Content: React.FC = () => {
  // TODO: Wire this up with magic.link
  // TODO: Summon at the same time
  //
  const { provider, chainId } = useWeb3React();

  const chainIdHex = hexadecimalize(chainId);

  const [summonState, setSummonState] = useState<SummonStates>("idle");
  const [txHash, setTxHash] = useState<string>("");
  const [daoAddress, setDaoAddress] = useState<string>("");
  const [errMsg, setErrMsg] = useState<string>("");

  if (typeof window === "undefined") {
    return null;
  }

  return (
    <HausConnectProvider>
      <HausThemeProvider>
        <TXBuilder provider={provider} chainId={chainIdHex} appState={{}}>
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
                  chainId={chainIdHex}
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
          </TemporaryLayout>
        </TXBuilder>
      </HausThemeProvider>
    </HausConnectProvider>
  );
};

export default Content;
