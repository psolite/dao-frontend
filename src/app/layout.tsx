import React from "react";
import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import AppWalletProvider from "./components/AppWalletProvider";

const inter = Inter({ subsets: ["latin"] });
const syne = Syne({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DAO",
  description: "Create DAO Voting",
  other: {
    'dscvr:canvas:version': "vNext"
  },
  openGraph: {
    title: "Airbills Pay",
    description: "Pay Bills with Crypto - Powered by Solana",
    type: "website",
    locale: "en-NG",
    images: "https://news.miami.edu/_assets/images-stories/2023/02/dao-web3-hero-940x529.jpg"
  }
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={syne.className}>
        <AppWalletProvider>{children}

        </AppWalletProvider>
        {/* <> 
            <Navbar />
            {children}
           </>  */}
      </body>
    </html>
  );
}
