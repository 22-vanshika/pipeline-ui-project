import { Position } from '@xyflow/react';
import { BaseNode } from '../ui/BaseNode';
import { NodeHandle } from '../ui/handleUtils';
import { Network } from 'lucide-react';

export const APICallNode = ({ id, data, selected }) => {
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
      <NodeHandle type="target" position={Position.Left} id={`${id}-params`} category="service" top="35%" />
      <NodeHandle type="target" position={Position.Left} id={`${id}-headers`} category="service" top="65%" />
      <NodeHandle type="source" position={Position.Right} id={`${id}-response`} category="service" />
    </div>
  );
};