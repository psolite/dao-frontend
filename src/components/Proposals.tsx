import { proposals } from "@/constants";
import { FC } from "react";
import { Button } from "./ui/Button";

interface ProposalsProps {}

const Proposals: FC<ProposalsProps> = ({}) => {
  return (
    <section className="w-full py-[50px]">
      <div className="container max-w-5xl mx-auto w-full">
        {proposals.map(({ id, title, votes }) => (
          <div key={id}>
            <div className="flex flex-col gap-[32px] rounded-[10px] border-[1px] border-secondary p-6">
              <h2 className="text-[24px] font-extrabold leading-[31.2px] text-center">{title}</h2>
              <div className="flex gap-[32px] items-center">
                <div className="w-full flex flex-col gap-[16px] rounded-[5px] border-[1px] border-primary p-2">
                  <span className="text-[16px] font-bold leading-[20px] text-center">Votes For:</span>
                  <span className="text-[16px] font-bold leading-[20px] text-center">{votes.for}</span>
                </div>
                <div className="w-full flex flex-col gap-[16px] rounded-[5px] border-[1px] border-secondary p-2">
                  <span className="text-[16px] font-bold leading-[20px] text-center">Votes Against:</span>
                  <span className="text-[16px] font-bold leading-[20px] text-center">{votes.against}</span>
                </div>
                <div className="w-full flex flex-col gap-[16px] rounded-[5px] border-[1px] border-tertiary p-2">
                  <span className="text-[16px] font-bold leading-[20px] text-center">Votes Abstain:</span>
                  <span className="text-[16px] font-bold leading-[20px] text-center">{votes.neutral}</span>
                </div>
              </div>
              <div className="flex items-center justify-center gap-[32px]">
                <Button variant="primary">Vote For</Button>
                <Button variant="secondary">Vote Against</Button>
                <Button variant="outline">Vote Abstain</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Proposals;
