"use client"
import Dashboard from "@/components/Dashboard";
import Proposals from "@/components/Proposals";
import Image from "next/image";
import { useWallet } from '@solana/wallet-adapter-react';
import { Buffer } from 'buffer';
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Navbar from "@/components/Navbar";
import CreateProposal from "@/components/create";
// import { CanvasClient } from "@dscvr-one/canvas-client-sdk";

if (typeof window !== 'undefined') {
  window.Buffer = Buffer;
}

export default function Home() {
  const { publicKey } = useWallet();

  return (
    <main className="">
      
       {/* {publicKey ?
        (
         <>
        <Navbar /> */}
        <CreateProposal />
        {/* <Proposals />
      </>
        ) : (
          <div className="flex items-center justify-center min-h-screen">
            <div className="border hover:border-slate-900 rounded">
              <WalletMultiButton style={{}} />
            </div>
          </div>
        )
      }  */}
    </main>
  );
}
