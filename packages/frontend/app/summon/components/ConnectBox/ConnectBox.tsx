import { useHausConnect } from "@daohaus/daohaus-connect-feature";
import { Button, ParSm, Theme, border } from "@daohaus/ui";

export const ConnectBox = () => {
  const { connectWallet } = useHausConnect();
  return (
    <div>
      <div className="inner">
        <ParSm>Connect wallet to summon a DAO</ParSm>
        <Button onClick={connectWallet} size="sm">
          Connect
        </Button>
      </div>
    </div>
  );
};
