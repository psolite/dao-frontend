// src/setup.ts

import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { BN, Program } from '@coral-xyz/anchor';
import { DaoVoting, IDL } from './idl';

const network = clusterApiUrl('devnet');
const connection = new Connection(network, 'confirmed');
const programID = new PublicKey('tePm5Z6oFWmFcPNkbm1t86Ki7SpCm2Qq7Da9uTPM1GZ');

export const program = new Program<DaoVoting>(IDL, programID, {
  connection
});


export const deriveProposalPDA = async (publicKey: PublicKey, proposalId: BN) => {
  const proposalIdBuffer = proposalId.toArrayLike(Buffer, 'le', 8);
  const [proposalPDA, bump] = PublicKey.findProgramAddressSync(
    [Buffer.from("proposal"),
    publicKey.toBuffer(),
      proposalIdBuffer],
    program.programId
  );
  return { proposalPDA, bump };
};

export const deriveVoterPDA = async (publicKey: PublicKey, proposal: PublicKey) => {
  const [voterPDA, bump] = PublicKey.findProgramAddressSync(
    [Buffer.from("voter"), publicKey.toBuffer(), proposal.toBuffer()],
    program.programId
  );
  return { voterPDA, bump }
}
