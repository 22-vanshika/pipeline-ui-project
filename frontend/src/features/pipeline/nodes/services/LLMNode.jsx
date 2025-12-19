import { Position } from '@xyflow/react';
import { BaseNode } from '../ui/BaseNode';
import { NodeHandle } from '../ui/handleUtils';
import { Sparkles } from 'lucide-react';

export const LLMNode = ({ id, data, selected }) => {
  return (
    <div className="relative">
      <BaseNode
        id={id}
        data={data}
        selected={selected}
        title="LLM"
        subtitle="Large Language Model"
        category="service"
        icon={<Sparkles size={14} />}
      >
        <div className="text-xs text-stone-100/90">
          Connect system and prompt inputs and generate an output.
        </div>
      </BaseNode>
      <NodeHandle type="target" position={Position.Left} id={`${id}-system`} category="service" top="30%" />
      <NodeHandle type="target" position={Position.Left} id={`${id}-prompt`} category="service" top="70%" />
      <NodeHandle type="source" position={Position.Right} id={`${id}-response`} category="service" />
    </div>
  );
};
