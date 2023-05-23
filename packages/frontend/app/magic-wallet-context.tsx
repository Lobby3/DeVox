import { useToast } from "@chakra-ui/react";
import { Magic } from "magic-sdk";
import React, { useEffect } from "react";

const defaultContext = {
  magic: undefined as Magic | undefined,
  isMagicReady: false,
  connected: false,
  connecting: false,
  connect: async () => {},
  disconnect: async () => {},
  address: undefined as string | null | undefined,
};

const MagicWalletContext = React.createContext(defaultContext);

export const MagicWalletProvider = ({ children }: React.PropsWithChildren) => {
  const [isMagicReady, setIsMagicReady] = React.useState(false);
  const [magic, setMagic] = React.useState<Magic>();
  const [connecting, setConnecting] = React.useState(false);
  const [connected, setConnected] = React.useState(false);
  const [address, setAddress] = React.useState<string | null>();

  const toast = useToast();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const magic = new Magic(
        process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_API_KEY!,
        {
          network: "mainnet",
          testMode: true,
        }
      );

      if (magic) {
        setMagic(magic);
        setIsMagicReady(true);
      }
    }
  }, []);

  const connect = async () => {
    try {
      setConnecting(true);
      const accounts = await magic?.wallet.connectWithUI();
      setConnected(true);
      const loginAddress = await magic?.user
        .getInfo()
        .then((info) => info?.publicAddress);
      setAddress(loginAddress);
      toast({
        title: `Connected as ${accounts?.[0]}`,
        status: "success",
      });
      setConnecting(false);
    } catch (e) {
      toast({
        title: e?.toString?.(),
        status: "error",
      });
    }
  };

  const disconnect = async () => {
    const logoutResult = await magic?.user.logout();
    setConnected(false);
    toast({
      title: "Disconnected",
    });
    console.log("Logged out", logoutResult);
  };

  const values = {
    magic,
    isMagicReady,
    connected,
    connect,
    disconnect,
    address,
    connecting,
  };

  return (
    <MagicWalletContext.Provider value={values}>
      {children}
    </MagicWalletContext.Provider>
  );
};

export const useMagicWallet = () => {
  const context = React.useContext(MagicWalletContext);
  if (context === undefined) {
    throw new Error("useMagicWallet must be used within a MagicWalletProvider");
  }
  return context;
};
