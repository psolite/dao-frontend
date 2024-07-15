import React, { useState } from 'react';
import { Button } from "./ui/Button";

interface FormData {
  title: string;
  description: string;
  point: number | '';
}
interface Form {
  createProposal: (title: string, description: string, point: number) => void;
}

const Dashboard: React.FC<Form> = ({ createProposal }) => {

  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    point: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'number' ? parseInt(value) : value
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (typeof formData.point === 'number') {
      createProposal(formData.title, formData.description, formData.point);
    } else {
      console.error('Point must be a number');
    }
  };

  return (
    <section className="w-full py-[50px]">
      <form onSubmit={handleSubmit} >
      <div className="container max-w-5xl mx-auto w-full">
        <div className="rounded-[10px] border-[1px] border-secondary p-6 flex flex-col items-center gap-[32px]">
          <h2 className="text-[24px] font-extrabold leading-[31.2px] text-center">Make a new Proposal</h2>
          
            <div className="grid  grid-cols-12 gap-6 w-full contact-form">

              <div className="form-group  col-span-12 sm:col-span-6 flex flex-col">
                <label className="">Title *</label>
                <input type="text" placeholder="Title for your proposal" className="form-control" name="title" value={formData.title}
                  onChange={handleChange} />
              </div>
              <div className="form-group  col-span-12 sm:col-span-6 flex flex-col">
                <label className="">Point *</label>
                <input type="number" placeholder="..." className="form-control" name="point" value={formData.point}
                  onChange={handleChange} />
              </div>
              <div className="col-span-12 flex flex-col form-group">
                <label>Description *</label>
                <textarea className="form-control" placeholder="Explain your proposal" name="description" value={formData.description}
                  onChange={handleChange} />
              </div>

            </div>
            <Button type="submit" className="w-fit">Create Proposal</Button>
          
        </div>
      </div>
      </form>
    </section>
  );
};

export default Dashboard;
