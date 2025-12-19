import { Position } from '@xyflow/react';
import { BaseNode } from '../ui/BaseNode';
import { NodeHandle } from '../ui/handleUtils';
import { SquareArrowOutUpRight } from 'lucide-react';
import { useStore } from '../../store';

export const OutputNode = ({ id, data, selected }) => {
  const { updateNodeData } = useStore();

  const handleNameChange = (e) => {
    updateNodeData(id, { outputName: e.target.value });
  };

  const handleTypeChange = (e) => {
    updateNodeData(id, { outputType: e.target.value });
  };

  return (
    <div className="relative">
      <BaseNode
        id={id}
        data={data}
        selected={selected}
        title="Output"
        subtitle="Expose pipeline results"
        category="output"
        icon={<SquareArrowOutUpRight size={14} />}
      >
        <div className="flex flex-col gap-3 mt-2">
          <label className="flex flex-col gap-1">
            <span className="text-[11px] font-semibold text-stone-200/90">Name</span>
            <input
              type="text"
              value={data.outputName || ''}
              onChange={handleNameChange}
              className="p-2 rounded-md bg-black/20 border border-white/10 text-stone-50 placeholder-stone-300/60 focus:outline-none focus:ring-2 focus:ring-white/30"
              placeholder="output_name"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-[11px] font-semibold text-stone-200/90">Type</span>
            <select
              value={data.outputType || 'Text'}
              onChange={handleTypeChange}
              className="p-2 rounded-md bg-black/20 border border-white/10 text-stone-50 focus:outline-none focus:ring-2 focus:ring-white/30"
            >
              <option value="Text">Text</option>
              <option value="Image">Image</option>
            </select>
          </label>
        </div>
      </BaseNode>
      <NodeHandle type="target" position={Position.Left} id={`${id}-value`} category="output" />
    </div>
  );
};