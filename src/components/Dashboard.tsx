import { FC } from "react";
import { Button } from "./ui/Button";

interface DashboardProps {}

const Dashboard: FC<DashboardProps> = ({}) => {
  return (
    <section className="w-full py-[50px]">
      <div className="container max-w-5xl mx-auto w-full">
        <div className="rounded-[10px] border-[1px] border-secondary p-6 flex flex-col items-center gap-[32px]">
          <h2 className="text-[24px] font-extrabold leading-[31.2px] text-center">Make a new Proposal</h2>
          <div className="grid  grid-cols-12 gap-6 w-full contact-form">
            <div className="form-group  col-span-12 sm:col-span-6 flex flex-col">
              <label className="">Title *</label>
              <input type="text" placeholder="Title for your proposal" className="form-control" name="subject" />
            </div>
            <div className="form-group  col-span-12 sm:col-span-6 flex flex-col">
              <label className="">Point *</label>
              <input type="text" placeholder="..." className="form-control" name="subject" />
            </div>
            <div className="col-span-12 flex flex-col form-group">
              <label>Description *</label>
              <textarea className="form-control" placeholder="Explain your proposal" name="message" />
            </div>
          </div>
          <Button className="w-fit">Create Proposal</Button>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
