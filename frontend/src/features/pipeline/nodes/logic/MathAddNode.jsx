import { Handle, Position } from '@xyflow/react';
import { BaseNode } from '../ui/BaseNode';
import { Plus } from 'lucide-react';

export const MathAddNode = ({ id, selected, data }) => {
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
      <Handle type="target" position={Position.Left} id={`${id}-in-a`} className="!bg-rose-400/80 hover:!bg-rose-300 shadow-[0_0_12px_2px_rgba(244,63,94,0.35)]" style={{ top: '35%', transform: 'translateY(-50%)' }} />
      <Handle type="target" position={Position.Left} id={`${id}-in-b`} className="!bg-rose-400/80 hover:!bg-rose-300 shadow-[0_0_12px_2px_rgba(244,63,94,0.35)]" style={{ top: '65%', transform: 'translateY(-50%)' }} />
      <Handle type="source" position={Position.Right} id={`${id}-sum`} className="!bg-rose-400/80 hover:!bg-rose-300 shadow-[0_0_12px_2px_rgba(244,63,94,0.35)]" style={{ top: '50%', transform: 'translateY(-50%)' }} />
    </div>
  );
}; 