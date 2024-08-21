import { useState, useEffect } from 'react';
import { CanvasClient } from '@dscvr-one/canvas-client-sdk';
import { registerCanvasWallet } from '@dscvr-one/canvas-wallet-adapter';

const SOLANA_MAINNET_CHAIN_ID = "solana:101"; // Solana mainnet chain ID

const useCanvasWallet = () => {
  const [canvasClient, setCanvasClient] = useState<CanvasClient | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  useEffect(() => {
    const isIframe = () => {
      try {
        return window.self !== window.top;
      } catch (e) {
        return true;
      }
    };
    const iframe = isIframe();
    if(iframe){
    const client = new CanvasClient();
    registerCanvasWallet(client);
    setCanvasClient(client);
    }
  }, []);

  const connectWallet = async () => {

    if (canvasClient) {
      try {
        const response = await canvasClient.connectWallet(SOLANA_MAINNET_CHAIN_ID);
        if (response?.untrusted?.success) {
          setWalletAddress(response.untrusted.address);
          console.log('Wallet connected:', response.untrusted.address);
        } else {
          console.error('Failed to connect wallet');
        }
      } catch (error) {
        console.error('Error connecting wallet:', error);
      }
    }
  };

  return { connectWallet, walletAddress };
};

export default useCanvasWallet;
