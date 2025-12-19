import { Position } from '@xyflow/react';
import { BaseNode } from '../ui/BaseNode';
import { NodeHandle } from '../ui/handleUtils';
import { GitFork } from 'lucide-react';

export const ConditionNode = ({ id, data, selected }) => {
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
      <NodeHandle type="target" position={Position.Left} id={`${id}-in`} category="logic" />
      <NodeHandle type="source" position={Position.Right} id={`${id}-true`} category="logic" top="35%" />
      <NodeHandle type="source" position={Position.Right} id={`${id}-false`} category="logic" top="65%" />
    </div>
  );
};