import { Position } from '@xyflow/react';
import { BaseNode } from '../ui/BaseNode';
import { NodeHandle } from '../ui/handleUtils';
import { Plus } from 'lucide-react';

export const MathAddNode = ({ id, data, selected }) => {
  const config = {
    fields: [
      { key: 'a', label: 'A', type: 'number', placeholder: '0' },
      { key: 'b', label: 'B', type: 'number', placeholder: '0' },
    ],
  };

  return (
    <div className="relative">
      <BaseNode
        id={id}
        data={data}
        selected={selected}
        title="Math: Add"
        subtitle="Adds A + B"
        category="logic"
        icon={<Plus size={14} />}
        config={config}
      />
      <NodeHandle type="target" position={Position.Left} id={`${id}-in-a`} category="logic" top="35%" />
      <NodeHandle type="target" position={Position.Left} id={`${id}-in-b`} category="logic" top="65%" />
      <NodeHandle type="source" position={Position.Right} id={`${id}-sum`} category="logic" />
    </div>
  );
};