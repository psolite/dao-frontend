"use client";

import { useState, useContext, createContext, useEffect, ReactNode } from 'react';
import { CanvasClient } from '@dscvr-one/canvas-client-sdk';
import { registerCanvasWallet } from '@dscvr-one/canvas-wallet-adapter';
import { clusterApiUrl, Connection, PublicKey, Transaction } from '@solana/web3.js';
import { encode } from 'bs58';

interface WalletContextType {
    connectWallet: () => Promise<void>;
    walletAddress: string | null;
    walletIcon: string | null;
    signTransaction: (transaction: Transaction) => Promise<string | null>;
    iframe: boolean;
}

const WalletContext = createContext<WalletContextType | null>(null);

const SOLANA_MAINNET_CHAIN_ID = "solana:101"; // Solana mainnet chain ID


export const CanvasWalletProvider = ({ children }: { children: ReactNode }) => {
    const [canvasClient, setCanvasClient] = useState<CanvasClient | null>(null);
    const [walletAddress, setWalletAddress] = useState<string | null>(null);
    const [walletIcon, setWalletIcon] = useState<string | null>(null);
    const [iframe, setIframe] = useState<boolean>(false);

    useEffect(() => {
        const isIframe = () => {
            try {
                return window.self !== window.top;
            } catch (e) {
                return true;
            }
        };

        setIframe(isIframe());

        if (isIframe()) {
            const client = new CanvasClient();
            registerCanvasWallet(client);
            setCanvasClient(client);
            console.log("CanvasClient initialized");
        }
    }, []);

    const connectWallet = async () => {
        if (canvasClient) {
            try {
                await canvasClient.ready();
                console.log("CanvasClient is ready");

                const response = await canvasClient.connectWallet(SOLANA_MAINNET_CHAIN_ID);

                if (response?.untrusted?.success) {
                    setWalletAddress(response.untrusted.address);
                    setWalletIcon(response.untrusted.walletIcon);
                    console.log('Wallet connected:', response.untrusted.address);
                } else {
                    console.error('Failed to connect wallet');
                }
            } catch (error) {
                console.error('Error connecting wallet:', error);
            }
        } else {
            console.error('CanvasClient is not initialized');
        }
    };

    const signTransaction = async (transaction: Transaction) => {
        if (!canvasClient || !walletAddress) {
            console.error('CanvasClient or walletAddress is not available');
            return null;
        }

        try {
            const network = "https://api.devnet.solana.com/";
            const connection = new Connection(network, 'confirmed');

            // Fetch the latest blockhash
            const { blockhash } = await connection.getLatestBlockhash({ commitment: "finalized" });
            transaction.recentBlockhash = blockhash;
            transaction.feePayer = new PublicKey(walletAddress);

            // Serialize the transaction
            const serializedTx = transaction.serialize({
                requireAllSignatures: false,
                verifySignatures: false,
            });

            const base58Tx = encode(serializedTx)

            // Sign and send the transaction via canvasClient
            const results = await canvasClient.signAndSendTransaction({
                unsignedTx: base58Tx,
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

        return null;
    };


    const value: WalletContextType = {
        connectWallet,
        walletAddress,
        walletIcon,
        signTransaction,
        iframe,
    };

    return (
        <WalletContext.Provider value={value}>
            {children}
        </WalletContext.Provider>
    );


};
const useCanvasWallet = () => {
    const context = useContext(WalletContext);
    if (!context) {
        throw new Error('useCanvasWallet must be used within a CanvasWalletProvider');
    }
    return context;
};

export default useCanvasWallet;
