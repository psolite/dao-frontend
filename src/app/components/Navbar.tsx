import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Button } from "../../components/ui/Button";
import { useEffect, useState } from "react";
import TotalPoint from "../../components/Point";
import { useWallet } from "@solana/wallet-adapter-react";
import { registerCanvasWallet } from '@dscvr-one/canvas-wallet-adapter';
import useCanvasWallet from "./hook/useCanvasWallet";
import Image from "next/image";

const Navbar = () => {
  const { connectWallet, walletAddress, walletIcon, iframe } = useCanvasWallet();
  console.log("wallet address",walletAddress)

  return (
    <nav className={`flex items-center justify-between`}>
      <div className="container max-w-5xl mx-auto w-full">
        <div className="flex justify-between items-center transition py-[20px]">
          <h1 className="text-[24px] font-extrabold leading-[31.2px]">DAO Voting</h1>

          <TotalPoint />
          {walletAddress ?
            <Button>
              <Image
                src={walletIcon || ''}
                alt={walletIcon || ''}
                height={20}
                width={20}
                className="mr-5 "
              />
              {walletAddress?.slice(0, 4)}...{walletAddress?.slice(-4)}
            </Button> 
            :
            <WalletMultiButton style={{}} />
          }
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
