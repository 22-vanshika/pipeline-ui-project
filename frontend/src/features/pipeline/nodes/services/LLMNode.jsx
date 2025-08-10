import { Handle, Position } from '@xyflow/react';
import { BaseNode } from '../ui/BaseNode';
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
      <Handle type="target" position={Position.Left} id={`${id}-system`} className="!bg-violet-400/80 hover:!bg-violet-300 shadow-[0_0_12px_2px_rgba(139,92,246,0.35)]" style={{ top: '30%', transform: 'translateY(-50%)' }} />
      <Handle type="target" position={Position.Left} id={`${id}-prompt`} className="!bg-violet-400/80 hover:!bg-violet-300 shadow-[0_0_12px_2px_rgba(139,92,246,0.35)]" style={{ top: '70%', transform: 'translateY(-50%)' }} />
      <Handle type="source" position={Position.Right} id={`${id}-response`} className="!bg-violet-400/80 hover:!bg-violet-300 shadow-[0_0_12px_2px_rgba(139,92,246,0.35)]" style={{ top: '50%', transform: 'translateY(-50%)' }} />
    </div>
  );
};
