import { Button } from "@chakra-ui/react";
import * as React from "react";

import { useMagicWallet } from "../../app/magic-wallet-context";

export interface ConnectButtonProps {}

export function ConnectButton(props: ConnectButtonProps) {
  const { address, connect, connected, disconnect, isMagicReady, connecting } =
    useMagicWallet();

  const onClickButton = async () => {
    if (connected) {
      await disconnect();
    } else {
      await connect();
    }
  };

  const getButtonMessage = () => {
    if (!isMagicReady) {
      return "Loading...";
    }

    if (connecting) {
      return "Connecting...";
    }

    if (address) {
      return address;
    }

    if (connected) {
      return "Disconnect";
    }

    if (!connected) {
      return "Connect";
    }
  };

  return (
    <Button disabled={!isMagicReady} onClick={onClickButton}>
      {getButtonMessage()}
    </Button>
  );
}

export default ConnectButton;
