import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { deriveVoterPDA, program } from './anchor/setup';
import { web3 } from '@coral-xyz/anchor';
import { Buffer } from 'buffer';
import { Button } from './ui/Button';
import { useState } from 'react';

if (typeof window !== 'undefined') {
    window.Buffer = Buffer;
}

const Voting: React.FC<{ proposalPDA: web3.PublicKey, voted: boolean, onVote: () => void }> = ({ proposalPDA, voted, onVote }) => {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();
    const [loading, setLoading] = useState(false);
    
    const vote = async (voteOption: "For" | "Against" | "Abstain") => {
    
        if (!publicKey) return;

        setLoading(true)
        const { voterPDA } = await deriveVoterPDA(publicKey, proposalPDA)
        try {
            let voteMethod;
            if (voteOption === "For") {
                voteMethod = program.methods.vote({ for: {} });
            } else if (voteOption === "Against") {
                voteMethod = program.methods.vote({ against: {} });
            } else {
                voteMethod = program.methods.vote({ abstain: {} });
            }
            if (!voteMethod) {
                console.log("ohh")
            }
            const trx = new web3.Transaction().add(
                await voteMethod
                    .accounts({
                        proposal: proposalPDA,
                        voter: voterPDA,
                        user: publicKey,
                        systemProgram: web3.SystemProgram.programId,
                    })
                    .instruction()

            );


            const trxSignature = await sendTransaction(trx, connection, { signers: [] });
            console.log(`Vote transaction sent: ${trxSignature}`);

            const account = await program.account.proposal.fetch(proposalPDA);
            console.log(account)

            onVote();
        } catch (error) {
            console.error('Error voting:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center gap-[32px]">
            {loading ?
                <Button onClick={() => vote('For')} disabled={true} variant="primary">Voting...</Button> :
                <>
                    <Button onClick={() => vote('For')} disabled={voted} variant="primary">Vote For</Button>
                    <Button variant="secondary" onClick={() => vote('Against')} disabled={voted}>Vote Against</Button>
                    <Button variant="outline" onClick={() => vote('Abstain')} disabled={voted}>Vote Abstain</Button>
                </>
            }

        </div>
    );
};

export default Voting;
