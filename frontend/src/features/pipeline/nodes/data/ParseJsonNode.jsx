import { Position } from '@xyflow/react';
import { BaseNode } from '../ui/BaseNode';
import { NodeHandle } from '../ui/handleUtils';
import { FileCode } from 'lucide-react';

export const ParseJsonNode = ({ id, data, selected }) => {
  const config = {
    fields: [
      { key: 'fallback', label: 'Fallback value', type: 'text', placeholder: '{}' },
      { key: 'strict', label: 'Strict mode', type: 'select', options: [
        { label: 'Enabled', value: 'true' },
        { label: 'Disabled', value: 'false' },
      ]},
    ],
  };

  return (
    <div className="relative">
      <BaseNode
        id={id}
        data={data}
        selected={selected}
        title="Data: Parse JSON"
        subtitle="Parse JSON string into object"
        category="data"
        icon={<FileCode size={14} />}
        config={config}
      />
      <NodeHandle type="target" position={Position.Left} id={`${id}-json`} category="data" />
      <NodeHandle type="source" position={Position.Right} id={`${id}-object`} category="data" />
    </div>
  );
};