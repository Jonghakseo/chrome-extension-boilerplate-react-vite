import { createContext, useContext, useCallback, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import * as sapphire from '@oasisprotocol/sapphire-paratime';
import { initializeProvider } from '@metamask/providers';
import PortStream from 'extension-port-stream';

declare global {
  interface Window {
    ethereum: any;
  }
}

export interface EthereumData {
  provider: ethers.providers.Web3Provider | null;
  signer: ethers.Signer | null;
  connectToMetaMask: () => Promise<boolean>;
  disconnect: () => void;
  isConnected: boolean;
  connectedAddress?: string;
}

const EthereumContext = createContext<EthereumData | undefined>(undefined);

export function useEthereum() {
  return useContext(EthereumContext);
}

export const EthereumProvider = ({ children }) => {
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [connectedAddress, setConnectedAddress] = useState<string | undefined>(undefined);

  const METAMASK_EXT_ID = import.meta.env.VITE_METAMASK_EXT_ID;

  const disconnect = useCallback(() => {
    setProvider(null);
    setSigner(null);
    setIsConnected(false);
  }, []);

  const connectToMetaMask = useCallback(async () => {
    const metamaskPort = chrome.runtime.connect(METAMASK_EXT_ID);
    const pluginStream = new PortStream(metamaskPort);
    initializeProvider({
      connectionStream: pluginStream,
    });
    console.log(window.ethereum);
    if (window.ethereum) {
      const ethProvider = new ethers.providers.Web3Provider(window.ethereum);
      await ethProvider.send('eth_requestAccounts', []);
      const ethSigner = sapphire.wrap(await ethProvider.getSigner());
      setProvider(ethProvider);
      setSigner(ethSigner);
      const accounts = await ethProvider.listAccounts();
      if (accounts.length > 0) {
        setIsConnected(true);
        setConnectedAddress(accounts[0]);
        return true;
      }
    } else {
      console.error('MetaMask (or another provider) is not installed.');
    }
  }, []);

  return (
    <EthereumContext.Provider
      value={{ provider, signer, connectToMetaMask, isConnected, disconnect, connectedAddress }}>
      {children}
    </EthereumContext.Provider>
  );
};
