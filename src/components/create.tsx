import { useEffect, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { program, deriveProposalPDA } from "./anchor/setup";
import { web3, BN } from "@coral-xyz/anchor";
import { Buffer } from 'buffer';
import Dashboard from "./Dashboard";
import useCanvasWallet from '@/app/components/CanvasWalletProvider';
import { PublicKey, Transaction } from "@solana/web3.js";

if (typeof window !== 'undefined') {
    window.Buffer = Buffer;
}


const CreateProposal = () => {
    const { publicKey: walletPublicKey, sendTransaction: walletSendTransaction } = useWallet();
    const { connection } = useConnection();
    const [proposal, setProposal] = useState<any>(null);
    const { connectWallet, walletAddress, iframe, signTransaction } = useCanvasWallet();
  

  let publicKey = walletPublicKey;
  let sendTransaction = walletSendTransaction;

  if (walletAddress) {
    publicKey = new PublicKey(walletAddress);
    sendTransaction = signTransaction as unknown as typeof walletSendTransaction;
  }


    const proposalId = new BN(Date.now());

    const createProposal = async (title: string, description: string, point: number) => {
        if (!publicKey) return;
        // console.log(publicKey)
        try {
            const { proposalPDA } = await deriveProposalPDA(publicKey, proposalId)

            console.log('Creating transaction...');
            const trx = await program.methods.createProposal(title, description, proposalId, point)
                .accounts({
                    proposal: proposalPDA,
                    user: publicKey,
                    systemProgram: web3.SystemProgram.programId,
                })
                .transaction();

            console.log('Transaction created:', trx);

            console.log('Sending transaction...');
            const trxSign = await sendTransaction(
                trx,
                connection,
                { signers: [] }
            );
            console.log(
                `View on explorer: https://solana.fm/tx/${trxSign}?cluster=devnet-alpha`
            );

            const confirmation = await connection.confirmTransaction(trxSign, 'confirmed');
            console.log('Transaction confirmed:', confirmation);

            const account = await program.account.proposal.fetch(proposalPDA);
            setProposal(account);
            console.log(account)
        } catch (error) {
            console.error('Error creating proposal:', error);
        }
    };





    return (
        <>
            <Dashboard createProposal={createProposal} />

        </>
    );
}

export default CreateProposal;
