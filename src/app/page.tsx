import Dashboard from "@/components/Dashboard";
import Proposals from "@/components/Proposals";
import Image from "next/image";

export default function Home() {
  return (
    <main className="">
      <Dashboard />
      <Proposals />
    </main>
  );
}
