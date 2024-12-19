'use client';

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import FilterButtons from '@/components/templates/FilterButtons';
import CardTemplate from '@/components/templates/CardTemplate';

type Workflow = {
  id: number;
  name: string;
  description?: string;
};

export default function TemplatesPage() {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);

  useEffect(() => {
    const savedWorkflows = JSON.parse(localStorage.getItem('workflows') || '[]');
    setWorkflows(savedWorkflows);
  }, []);

  if (workflows.length === 0) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold">No workflows saved</h1>
        <p>Start creating workflows to see them listed here.</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex flex-col p-6 px-40 space-y-10">
      <div className='w-full flex flex-col items-center mt-10 space-y-4'>
        <h1 className="text-5xl font-bold">Workflow Templates</h1>
        <p className="text-lg">
          Choose from our ready-made templates to start building your workflow quickly.
        </p>
        <Input placeholder="Search a Workflow" />
      </div>
      <FilterButtons />
      <div className='grid grid-cols-2 gap-4 p-4'>
        {workflows.map((workflow) => (
          <CardTemplate key={workflow.id} id={workflow.id} name={workflow.name} description={workflow.description}/>
        ))}
      </div>
    </div>
  );
}
