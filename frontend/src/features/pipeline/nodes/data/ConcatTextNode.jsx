import { Position } from '@xyflow/react';
import { BaseNode } from '../ui/BaseNode';
import { NodeHandle } from '../ui/handleUtils';
import { Link2 } from 'lucide-react';

export const ConcatTextNode = ({ id, data, selected }) => {
  const config = {
    fields: [
      { key: 'left', label: 'Left', type: 'text', placeholder: 'Hello' },
      { key: 'right', label: 'Right', type: 'text', placeholder: 'World' },
      { key: 'separator', label: 'Separator', type: 'text', placeholder: ' ' },
    ],
  };

  return (
    <div className="relative">
      <BaseNode
        id={id}
        data={data}
        selected={selected}
        title="Text: Concat"
        subtitle="Concatenate two strings"
        category="data"
        icon={<Link2 size={14} />}
        config={config}
      />
      <NodeHandle type="target" position={Position.Left} id={`${id}-in-left`} category="data" top="40%" />
      <NodeHandle type="target" position={Position.Left} id={`${id}-in-right`} category="data" top="60%" />
      <NodeHandle type="source" position={Position.Right} id={`${id}-out`} category="data" />
    </div>
  );
};