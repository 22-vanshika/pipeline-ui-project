import { Handle, Position } from '@xyflow/react';
import { BaseNode } from '../ui/BaseNode';
import { Network } from 'lucide-react';

export const APICallNode = ({ id, selected, data }) => {
  const config = {
    fields: [
      { key: 'method', label: 'Method', type: 'select', options: [
        { label: 'GET', value: 'GET' },
        { label: 'POST', value: 'POST' },
      ]},
      { key: 'url', label: 'URL', type: 'text', placeholder: 'https://api.example.com' },
      { key: 'body', label: 'Body', type: 'textarea', placeholder: '{ "key": "value" }' },
    ],
  };

  return (
    <div className="relative">
      <BaseNode
        id={id}
        data={data}
        selected={selected}
        title="API Call"
        subtitle="Fetch from URL"
        category="service"
        icon={<Network size={14} />}
        config={config}
      />
      <Handle type="target" position={Position.Left} id={`${id}-params`} className="!bg-violet-400/80 hover:!bg-violet-300 shadow-[0_0_12px_2px_rgba(139,92,246,0.35)]" style={{ top: '35%', transform: 'translateY(-50%)' }} />
      <Handle type="target" position={Position.Left} id={`${id}-headers`} className="!bg-violet-400/80 hover:!bg-violet-300 shadow-[0_0_12px_2px_rgba(139,92,246,0.35)]" style={{ top: '65%', transform: 'translateY(-50%)' }} />
      <Handle type="source" position={Position.Right} id={`${id}-response`} className="!bg-violet-400/80 hover:!bg-violet-300 shadow-[0_0_12px_2px_rgba(139,92,246,0.35)]" style={{ top: '50%', transform: 'translateY(-50%)' }} />
    </div>
  );
}; 