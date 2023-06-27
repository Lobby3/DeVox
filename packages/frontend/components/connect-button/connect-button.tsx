import { Button, HStack } from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";
import { Connector } from "@web3-react/types";
import * as React from "react";
import { useEffect, useState } from "react";
import { MagicConnect } from "web3-react-magic";

import { formatAddress } from "../../utils/formatting";

export interface ConnectButtonProps {
  showWalletButton?: boolean;
}

export function ConnectButton({
  showWalletButton = false,
}: ConnectButtonProps) {
  const { isActive, account, connector, isActivating } = useWeb3React();
  const [showButton, setShowButton] = useState(false);

  const handleConnect = async (connector: Connector) => {
    try {
      await connector.activate();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDisconnect = async () => {
    try {
      if (connector?.deactivate) {
        void connector.deactivate();
      } else {
        void connector.resetState();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenWallet = async () => {
    if (connector instanceof MagicConnect) {
      await connector.magic?.wallet.showUI();
    }
  };

  useEffect(() => {
    const checkWalletType = async () => {
      if (connector instanceof MagicConnect) {
        const walletInfo = await connector.magic?.wallet.getInfo();

        const isMagicWallet = walletInfo?.walletType === "magic";

        setShowButton(isMagicWallet);
      }
    };
    checkWalletType();
  }, [connector]);

  const getButtonMessage = () => {
    if (isActivating) {
      return "Loading...";
    }

    // if (connector) {
    //   return "Connecting...";
    // }

    if (account) {
      return formatAddress(account);
    }

    if (isActive) {
      return "Disconnect";
    }

    if (!isActive) {
      return "Connect";
    }
  };

  return (
    <HStack>
      <Button
        variant={isActive ? "solid" : "outline"}
        disabled={isActivating}
        onClick={isActive ? handleDisconnect : () => handleConnect(connector)}
      >
        {getButtonMessage()}
      </Button>
      {showWalletButton && showButton ? (
        <Button variant={"solid"} onClick={handleOpenWallet}>
          Wallet
        </Button>
      ) : null}
    </HStack>
  );
}

export default ConnectButton;
