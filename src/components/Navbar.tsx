import { Button } from "./ui/Button";

const Navbar = () => {
  return (
    <nav className={`flex items-center justify-between`}>
      <div className="container max-w-5xl mx-auto w-full">
        <div className="flex justify-between items-center transition py-[20px]">
          <h1 className="text-[24px] font-extrabold leading-[31.2px]">DAO Voting</h1>
          <Button>Connect Wallet</Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
