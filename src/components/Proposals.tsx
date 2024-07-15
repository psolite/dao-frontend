import React, { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { program } from "./anchor/setup";
import { Buffer } from 'buffer';
import { PublicKey } from "@solana/web3.js";
import Voting from "./voting";

if (typeof window !== 'undefined') {
  window.Buffer = Buffer;
}

const Proposals: React.FC = ({ }) => {
  const { wallet, publicKey } = useWallet();
  const [proposals, setProposals] = useState<any[]>([]);
  const [voters, setVoters] = useState<any[]>([]);

  useEffect(() => {
    const fetchProposals = async () => {
      if (!publicKey) return;

      try {
        const proposals = await program.account.proposal.all();
        setProposals(proposals);
        // console.log(proposals)
        const voters = await program.account.voter.all();
        setVoters(voters);
      } catch (error) {
        console.error('Error fetching proposals:', error);
      }
    };

    fetchProposals();
  }, [wallet]);

  const hasVoted = (proposalPublicKey: PublicKey) => {
    return voters.some(voter =>
      voter.account.user.equals(publicKey) &&
      voter.account.proposal.equals(proposalPublicKey)
    );
  };
  const refreshProposals = async () => {
    try {
        const updatedProposals = await program.account.proposal.all();
        setProposals(updatedProposals);
        const updatedVoters = await program.account.voter.all();
        setVoters(updatedVoters); 
    } catch (error) {
        console.error('Error refreshing proposals:', error);
    }
};
  return (
    <section className="w-full py-[50px]">
      <div className="container max-w-5xl mx-auto w-full">
        {proposals.length > 0 ? (proposals.map((proposal) => (
          <div key={proposal.publicKey.toString()}>
            <div className="flex flex-col gap-[32px] rounded-[10px] border-[1px] border-secondary p-6 mb-11">
              <h2 className="text-[24px] font-extrabold leading-[31.2px] text-center">{proposal.account.title}</h2>
              <p className="text-center">{proposal.account.description}</p>
              <div className="flex gap-[32px] items-center">
                <div className="w-full flex flex-col gap-[16px] rounded-[5px] border-[1px] border-primary p-2">
                  <span className="text-[16px] font-bold leading-[20px] text-center">Votes For:</span>
                  <span className="text-[16px] font-bold leading-[20px] text-center">{proposal.account.votesFor.toNumber()}</span>
                </div>
                <div className="w-full flex flex-col gap-[16px] rounded-[5px] border-[1px] border-secondary p-2">
                  <span className="text-[16px] font-bold leading-[20px] text-center">Votes Against:</span>
                  <span className="text-[16px] font-bold leading-[20px] text-center">{proposal.account.votesAgainst.toNumber()}</span>
                </div>
                <div className="w-full flex flex-col gap-[16px] rounded-[5px] border-[1px] border-tertiary p-2">
                  <span className="text-[16px] font-bold leading-[20px] text-center">Votes Abstain:</span>
                  <span className="text-[16px] font-bold leading-[20px] text-center">{proposal.account.votesAbstain.toNumber()}</span>
                </div>
              </div>

              <Voting proposalPDA={proposal.publicKey} voted={hasVoted(proposal.publicKey)} onVote={refreshProposals}/>
            </div>
          </div>
        ))
        ) : (
          <p>No proposals found</p>
        )}
      </div>
    </section>
  );
};

export default Proposals;
