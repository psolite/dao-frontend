import { useState, useEffect } from 'react';
import { CanvasClient } from '@dscvr-one/canvas-client-sdk';
import { registerCanvasWallet } from '@dscvr-one/canvas-wallet-adapter';
import { Transaction } from '@solana/web3.js';

const SOLANA_MAINNET_CHAIN_ID = "solana:101"; // Solana mainnet chain ID

const useCanvasWallet = () => {
  const [canvasClient, setCanvasClient] = useState<CanvasClient | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [iframe, setIframe] = useState<boolean | false>(false);

  useEffect(() => {
    const isIframe = () => {
      try {
        return window.self !== window.top;
      } catch (e) {
        return true;
      }
    };
    setIframe(isIframe())
    if (isIframe()) {
      const client = new CanvasClient();
      registerCanvasWallet(client);
      setCanvasClient(client);
    }
  }, []);

  const connectWallet = async () => {
    try {
      console.log(canvasClient)
      if (canvasClient) {
        try {
          const response = await canvasClient.connectWallet(SOLANA_MAINNET_CHAIN_ID);
          
          console.log("yes")
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
    } catch (e) {
      console.log(e)
    }
  };

  const signTransaction = async (transaction: Transaction) => {
    if (canvasClient && walletAddress) {
      try {
        const serializedTx = transaction.serialize({
          requireAllSignatures: false,
          verifySignatures: false,
        }).toString('base64');

        const results = await canvasClient.signAndSendTransaction({
          unsignedTx: serializedTx,
          awaitCommitment: "confirmed",
          chainId: SOLANA_MAINNET_CHAIN_ID,
        });

        if (results?.untrusted?.success) {
          console.log('Transaction signed:', results.untrusted.signedTx);
          return results.untrusted.signedTx;
        } else {
          console.error('Failed to sign transaction');
        }
      } catch (error) {
        console.error('Error signing transaction:', error);
      }
    }
    return null;
  };

  return { connectWallet, walletAddress, signTransaction, iframe };
};

export default useCanvasWallet;
