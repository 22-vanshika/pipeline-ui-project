import { Handle, Position } from '@xyflow/react';
import { GenericNode } from '../ui/GenericNode';
import { Link2 } from 'lucide-react';

export const ConcatTextNode = ({ id, ...props }) => {
  const config = {
    title: 'Text: Concat',
    subtitle: 'Concatenate two strings',
    icon: <Link2 size={14} />,
    category: 'data',
    fields: [
      { key: 'left', label: 'Left', type: 'text', placeholder: 'Hello' },
      { key: 'right', label: 'Right', type: 'text', placeholder: 'World' },
      { key: 'separator', label: 'Separator', type: 'text', placeholder: ' ' },
    ],
  };
  return (
    <div className="relative">
      <GenericNode {...props} id={id} config={config} />
      <Handle type="target" position={Position.Left} id={`${id}-in-left`} className="!bg-amber-400/80 hover:!bg-amber-300 shadow-[0_0_12px_2px_rgba(245,158,11,0.35)]" style={{ top: '40%', transform: 'translateY(-50%)' }} />
      <Handle type="target" position={Position.Left} id={`${id}-in-right`} className="!bg-amber-400/80 hover:!bg-amber-300 shadow-[0_0_12px_2px_rgba(245,158,11,0.35)]" style={{ top: '60%', transform: 'translateY(-50%)' }} />
      <Handle type="source" position={Position.Right} id={`${id}-out`} className="!bg-amber-400/80 hover:!bg-amber-300 shadow-[0_0_12px_2px_rgba(245,158,11,0.35)]" style={{ top: '50%', transform: 'translateY(-50%)' }} />
    </div>
  );
}; 