import { Keychain } from "@daohaus/keychain-utils";
import {
  AddressDisplay,
  Bold,
  Button,
  H1,
  Link,
  ParMd,
  useBreakpoint,
  widthQuery,
} from "@daohaus/ui";
import { ReactSetter } from "@daohaus/utils";
import React from "react";
import styled from "styled-components";

import { SummonStates } from "../types";
import { InfoSection } from "./FormLayouts";

type SuccessProps = {
  daoAddress: string;
  chainId?: string;
  setSummonState: ReactSetter<SummonStates>;
};

const AddressInfoSection = styled(InfoSection)`
  p,
  div {
    margin-bottom: 1rem;
  }

  a {
    margin-bottom: 1rem;
    align-items: flex-start;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 3rem;
  a {
    button {
      width: 200px;
      justify-content: center;
    }
  }
  @media ${widthQuery.sm} {
    flex-direction: column;
    button {
      margin-bottom: 2rem;
    }
  }
  /* justify-content: flex-start; */
`;

export const SummonerSuccess = ({
  daoAddress,
  chainId,
  setSummonState,
}: SuccessProps) => {
  const handleResetSummon = () => {
    setSummonState("idle");
  };
  const isMobile = useBreakpoint(widthQuery.sm);

  return (
    <div>
      <H1 className="title">
        <Bold>Campaign DAO Created</Bold>
      </H1>
      <AddressInfoSection>
        <ParMd className="info">DAO contract:</ParMd>
        <AddressDisplay
          address={daoAddress}
          copy
          explorerNetworkId={chainId as keyof Keychain}
          truncate={isMobile}
        />
      </AddressInfoSection>
      <ButtonGroup>
        <Button
          color="secondary"
          onClick={handleResetSummon}
          // centerAlign={isMobile}
          fullWidth={isMobile}
        >
          <Bold>Create Another Campaign DAO</Bold>
        </Button>
        <Link
          href={`https://admin.daohaus.fun/#/molochv3/${chainId}/${daoAddress}`}
          showExternalIcon={false}
        >
          <Button
            // centerAlign={isMobile}
            fullWidth={isMobile}
          >
            View DAO
          </Button>
        </Link>
      </ButtonGroup>
    </div>
  );
};
