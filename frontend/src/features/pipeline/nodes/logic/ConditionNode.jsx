import { Handle, Position } from '@xyflow/react';
import { BaseNode } from '../ui/BaseNode';
import { GitFork } from 'lucide-react';

export const ConditionNode = ({ id, selected, data }) => {
  const config = {
    fields: [
      { key: 'left', label: 'Left operand', type: 'text', placeholder: 'x' },
      { key: 'operator', label: 'Operator', type: 'select', options: [
        { label: '==', value: '==' },
        { label: '!=', value: '!=' },
        { label: '>', value: '>' },
        { label: '<', value: '<' },
      ]},
      { key: 'right', label: 'Right operand', type: 'text', placeholder: '10' },
    ],
  };
  return (
    <div className="relative">
      <BaseNode
        id={id}
        data={data}
        selected={selected}
        title="Condition"
        subtitle="Route based on condition"
        category="logic"
        icon={<GitFork size={14} />}
        config={config}
      />
      <Handle type="target" position={Position.Left} id={`${id}-in`} className="!bg-rose-400/80 hover:!bg-rose-300 shadow-[0_0_12px_2px_rgba(244,63,94,0.35)]" style={{ top: '50%', transform: 'translateY(-50%)' }} />
      <Handle type="source" position={Position.Right} id={`${id}-true`} className="!bg-rose-400/80 hover:!bg-rose-300 shadow-[0_0_12px_2px_rgba(244,63,94,0.35)]" style={{ top: '35%', transform: 'translateY(-50%)' }} />
      <Handle type="source" position={Position.Right} id={`${id}-false`} className="!bg-rose-400/80 hover:!bg-rose-300 shadow-[0_0_12px_2px_rgba(244,63,94,0.35)]" style={{ top: '65%', transform: 'translateY(-50%)' }} />
    </div>
  );
}; 