import React from "react";
import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";
import AppWalletProvider from "./components/AppWalletProvider";
import useCanvasWallet, { CanvasWalletProvider } from "./components/CanvasWalletProvider";

const inter = Inter({ subsets: ["latin"] });
const syne = Syne({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DAO",
  description: "Create DAO Voting",
  openGraph: {
    title: "DAO",
    description: "Create DAO Voting - Powered by Solana",
    type: "website",
    url: "https://dao-frontend-beta.vercel.app/",
    images: "https://news.miami.edu/_assets/images-stories/2023/02/dao-web3-hero-940x529.jpg"
  },
  other: {
    'dscvr:canvas:version': "vNext"
  }
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { iframe } = useCanvasWallet();

  return (
    <html lang="en" >
      <body className=''>
      {iframe ? (
         <CanvasWalletProvider>
          {children}
         </CanvasWalletProvider>
       ) : (
        <AppWalletProvider>
          {children}
        </AppWalletProvider>
       )}
      </body>
    </html>
  );
}

