"use client"
import Dashboard from "@/components/Dashboard";
import Proposals from "@/components/Proposals";
import Image from "next/image";
import { useWallet } from '@solana/wallet-adapter-react';
import { Buffer } from 'buffer';
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Navbar from "@/components/Navbar";
import CreateProposal from "@/components/create";
import useCanvasWallet from "@/components/hook/useCanvasWallet";
import { Button } from "@/components/ui/Button";
import { PublicKey } from "@solana/web3.js";
// import { CanvasClient } from "@dscvr-one/canvas-client-sdk";

if (typeof window !== 'undefined') {
  window.Buffer = Buffer;
}

export default function Home() {
  let { publicKey } = useWallet();
  const { connectWallet, walletAddress, iframe } = useCanvasWallet();
  // if (walletAddress) {
  //   const pubKey = new PublicKey(walletAddress)
  //   publicKey = pubKey
  // }

  return (
    <main className="">

      {(publicKey || walletAddress) ?
        (
          <>
            <Navbar />
            <CreateProposal />
            <Proposals />
          </>
        ) : (
          <div className="flex items-center justify-center min-h-screen">
            <div className="border hover:border-slate-900 rounded">
              {iframe ? <Button onClick={connectWallet}>Connect Wallet</Button> : <WalletMultiButton style={{}} />}
            </div>
          </div>
        )
      }
    </main>
  );
}
