"use client"

import { ReactNode, useEffect, useRef } from "react";
import { CanvasClient } from "@dscvr-one/canvas-client-sdk";
import useCanvasWallet from "./CanvasWalletProvider";


export default function Container({ children }: { children: ReactNode }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasClientRef = useRef<CanvasClient | undefined>();
    const { iframe } = useCanvasWallet();

    useEffect(() => {
        if (iframe) {
          canvasClientRef.current = new CanvasClient();
        };
    
        const resizeObserver = new ResizeObserver((_) => {
          canvasClientRef?.current?.resize();
        });
    
        if (containerRef.current) {
          resizeObserver.observe(containerRef.current);
        }
    
        return () => {
          if (containerRef.current) {
            resizeObserver.unobserve(containerRef.current);
          }
        };
      }, [])

  return (
   
      <main ref={containerRef} className="m-5">
        { children }
      </main>
  );
}
