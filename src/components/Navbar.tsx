import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Button } from "./ui/Button";
import TotalPoint from "./Point";
import useCanvasWallet from '@/app/components/CanvasWalletProvider';
import Image from "next/image";
import { useEffect, useRef } from "react";
import { CanvasClient } from "@dscvr-one/canvas-client-sdk";

const Navbar = () => {
  const { connectWallet, walletAddress, walletIcon, iframe, userInfo } = useCanvasWallet();
  
  // console.log("wallet address",walletAddress)


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
              {userInfo?.username}
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
