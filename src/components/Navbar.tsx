import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Button } from "./ui/Button";
import TotalPoint from "./Point";
import useCanvasWallet from '@/app/components/CanvasWalletProvider';
import Image from "next/image";
import { useEffect, useRef } from "react";
import { CanvasClient, CanvasInterface } from "@dscvr-one/canvas-client-sdk";

const Navbar = () => {
  const { connectWallet, walletAddress, walletIcon, iframe } = useCanvasWallet();

  // console.log("wallet address",walletAddress)
  
  // Assume CanvasInterface.Lifecycle.userSchema is a Zod schema
  const userSchema = CanvasInterface.Lifecycle.userSchema;

  // Example content that matches the schema
  // const content = userSchema.parse({});
  // console.log(content)
  console.log(userSchema)


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
              {"xx"}
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
