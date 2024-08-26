"use client"
import React, { useState, useEffect, useRef } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Buffer } from 'buffer';
import { PublicKey } from "@solana/web3.js";
import { program } from '@/components/anchor/setup';
import useCanvasWallet from '@/app/components/CanvasWalletProvider';
import Voting from '@/components/voting';
import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/Button';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { CanvasClient } from '@dscvr-one/canvas-client-sdk';

if (typeof window !== 'undefined') {
    window.Buffer = Buffer;
}

interface ProposalType {
    title: string;
    description: string;
    votesFor: any;
    votesAgainst: any;
    votesAbstain: any;
}

const Proposals = () => {
    const { proposalPDA } = useParams();
    let { publicKey } = useWallet();
    const [hasVoted, setHasVoted] = useState<boolean>(false);
    const [proposal, setProposal] = useState<ProposalType>();
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasClientRef = useRef<CanvasClient | undefined>();
    const { connectWallet, walletAddress, iframe } = useCanvasWallet()
    if (iframe && walletAddress) {

        const pubKey = new PublicKey(walletAddress)
        publicKey = pubKey
    }

    useEffect(() => {
        const fetchProposal = async () => {
            try {
                console.log(proposalPDA as string)
                const proposal = await program.account.proposal.fetch(proposalPDA as string);
                console.log(proposal)
                setProposal(proposal)
                if (!publicKey) { return }
                const voters = await program.account.voter.all();
                const userHasVoted = voters.some(voter =>
                    voter.account.user.equals(publicKey) &&
                    voter.account.proposal.equals(new PublicKey(proposalPDA as string))
                );
                setHasVoted(userHasVoted);

            } catch (error) {
                console.error('Error fetching proposal:', error);
            }
        };

        fetchProposal();
       
}, [publicKey]);

const refreshProposals = async () => {
    try {
        if (!publicKey) { return }
        const voters = await program.account.voter.all();
        const userHasVoted = voters.some(voter =>
            voter.account.user.equals(publicKey) &&
            voter.account.proposal.equals(new PublicKey(proposalPDA as string))
        );
        setHasVoted(userHasVoted);
    } catch (error) {
        console.error('Error refreshing proposals:', error);
    }
}
return (
    <main className="m-5">
        {(publicKey || walletAddress) ?
            <>
                <Navbar />
                <section className="w-full py-[50px]">
                    <div className="container max-w-5xl mx-auto w-full">
                        {proposal ?
                            <div>
                                <div className="flex flex-col gap-[32px] rounded-[10px] border-[1px] border-secondary p-6 mb-11">
                                    <h2 className="text-[24px] font-extrabold leading-[31.2px] text-center">{proposal.title}</h2>
                                    <p className="text-center">{proposal.description}</p>
                                    <div className="flex gap-[32px] items-center">
                                        <div className="w-full flex flex-col gap-[16px] rounded-[5px] border-[1px] border-primary p-2">
                                            <span className="text-[16px] font-bold leading-[20px] text-center">Votes For:</span>
                                            <span className="text-[16px] font-bold leading-[20px] text-center">{proposal.votesFor.toNumber()}</span>
                                        </div>
                                        <div className="w-full flex flex-col gap-[16px] rounded-[5px] border-[1px] border-secondary p-2">
                                            <span className="text-[16px] font-bold leading-[20px] text-center">Votes Against:</span>
                                            <span className="text-[16px] font-bold leading-[20px] text-center">{proposal.votesAgainst.toNumber()}</span>
                                        </div>
                                        <div className="w-full flex flex-col gap-[16px] rounded-[5px] border-[1px] border-tertiary p-2">
                                            <span className="text-[16px] font-bold leading-[20px] text-center">Votes Abstain:</span>
                                            <span className="text-[16px] font-bold leading-[20px] text-center">{proposal.votesAbstain.toNumber()}</span>
                                        </div>
                                    </div>

                                    <Voting proposalPDA={new PublicKey(proposalPDA as string)} voted={hasVoted} onVote={refreshProposals} />
                                    {hasVoted ? <p className='text-[16px] font-bold text-center text-red-600'>You Have Voted</p> : ""}
                                </div>
                            </div>

                            :
                            <p>proposal not found</p>
                        }
                    </div>
                </section>
            </>
            : (
                <div className="flex items-center justify-center min-h-screen">
                    <div className="border hover:border-slate-900 rounded">
                        {iframe ? <Button onClick={connectWallet}>Connect Wallet</Button> : <WalletMultiButton style={{}} />}
                    </div>
                </div>
            )
        }
    </main>
);
};

export default Proposals;
