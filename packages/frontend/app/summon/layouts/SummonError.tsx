import { ExplorerLink } from "@daohaus/connect";
import {
  Bold,
  Button,
  H1,
  Link,
  ParLg,
  ParMd,
  useBreakpoint,
  widthQuery,
} from "@daohaus/ui";
import { ReactSetter } from "@daohaus/utils";

import { HausBlockLoading } from "../components/HausBlockLoading/HausBlockLoading";
import { SummonStates } from "../types";
import { InfoSection } from "./FormLayouts";

type ErrorProps = {
  daoAddress: string;
  setSummonState: ReactSetter<SummonStates>;
  errMsg: string;
};

export const SummonError = ({
  daoAddress,
  setSummonState,
  errMsg,
}: ErrorProps) => {
  const handleResetSummon = () => {
    setSummonState("idle");
  };
  const isMobile = useBreakpoint(widthQuery.sm);
  return (
    <div>
      <H1 className="title">
        <Bold>Summon Error</Bold>
      </H1>
      <ParMd>
        Learn more about{" "}
        <Link href="https://daohaus.mirror.xyz/U_JQtheSzdpRFqQwf9Ow3LgLNG0WMZ6ibAyrjWDu_fc">
          Moloch v3
        </Link>
      </ParMd>
      <HausBlockLoading loading={false} />
      <InfoSection>
        <ParLg className="info">
          <Bold>Summon Failed:</Bold>
        </ParLg>
        {errMsg && <ParMd>{errMsg}</ParMd>}
        <ExplorerLink address={daoAddress}>View Transaction</ExplorerLink>
      </InfoSection>
      <Button
        color="secondary"
        onClick={handleResetSummon}
        fullWidth={isMobile}
        // centerAlign={isMobile}
      >
        Summon Another DAO
      </Button>
    </div>
  );
};
