import React, { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { program } from "./anchor/setup";
import useCanvasWallet from '../app/components/hook/useCanvasWallet';
import { PublicKey } from '@solana/web3.js';


const TotalPoint = () => {

    let { publicKey } = useWallet();
    const {walletAddress, iframe} = useCanvasWallet()
    if(iframe && walletAddress){
        console.log(walletAddress)
        const pubKey = new PublicKey(walletAddress)
        publicKey = pubKey
    }
    const [totalRewardPoints, setTotalRewardPoints] = useState(0);

    const fetchTotalPoints = async () => {
        if (!publicKey) return;

        const voterAccounts = await program.account.voter.all();
        const proposals = await program.account.proposal.all();

        let totalPoints = 0;
        const userVoterAccounts = voterAccounts.filter(voter =>
            voter.account.user.equals(publicKey)
        );

        for (const voter of userVoterAccounts) {
            const proposal = proposals.find(proposal =>
                proposal.publicKey.equals(voter.account.proposal)
            );

            if (proposal) {
                totalPoints += proposal.account.point; // Assuming point is a number
            }
        }

        setTotalRewardPoints(totalPoints);
    };

    useEffect(() => {
        fetchTotalPoints();
    }, [publicKey]); 

    return (
        <div>
            <h2>Points: {totalRewardPoints}</h2>
        </div>
    );
}
 
export default TotalPoint;