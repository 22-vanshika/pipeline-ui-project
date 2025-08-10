import { Handle, Position } from '@xyflow/react';
import { useStore } from '../../store';
import { BaseNode } from '../ui/BaseNode';
import { SquarePen } from 'lucide-react';

export const InputNode = ({ id, data, selected }) => {
  const { updateNodeData } = useStore();

  const handleNameChange = (e) => {
    updateNodeData(id, { inputName: e.target.value });
  };

  const handleTypeChange = (e) => {
    updateNodeData(id, { inputType: e.target.value });
  };

  return (
    <div className="relative">
      <BaseNode
        id={id}
        data={data}
        selected={selected}
        title="Input"
        subtitle="Provide pipeline inputs"
        category="input"
        icon={<SquarePen size={14} />}
      >
        <div className="flex flex-col gap-3">
          <label className="flex flex-col gap-1">
            <span className="text-[11px] font-semibold text-stone-200/90">Name</span>
            <input
              type="text"
              value={data.inputName || ''}
              onChange={handleNameChange}
              className="p-2 rounded-md bg-black/20 border border-white/10 text-stone-50 placeholder-stone-300/60 focus:outline-none focus:ring-2 focus:ring-white/30"
              placeholder="input_name"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-[11px] font-semibold text-stone-200/90">Type</span>
            <select
              value={data.inputType || 'Text'}
              onChange={handleTypeChange}
              className="p-2 rounded-md bg-black/20 border border-white/10 text-stone-50 focus:outline-none focus:ring-2 focus:ring-white/30"
            >
              <option value="Text">Text</option>
              <option value="File">File</option>
            </select>
          </label>
        </div>
      </BaseNode>
      <Handle type="source" position={Position.Right} id={`${id}-value`} className="!bg-emerald-400/80 hover:!bg-emerald-300 shadow-[0_0_12px_2px_rgba(16,185,129,0.35)]" style={{ top: '50%', transform: 'translateY(-50%)' }} />
    </div>
  );
};