'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Saved Workflows</h1>
      <ul className="space-y-4">
        {workflows.map((workflow) => (
          <li key={workflow.id} className="border p-4 rounded-md shadow-sm">
            <h2 className="text-lg font-semibold">{workflow.name}</h2>
            {workflow.description && <p className="text-sm text-gray-600">{workflow.description}</p>}
            <Link
              href={`/templates/${workflow.id}`}
              className="text-blue-500 hover:underline mt-2 inline-block"
            >
              Open Workflow
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
