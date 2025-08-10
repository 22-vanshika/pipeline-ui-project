import { Handle, Position } from '@xyflow/react';
import { BaseNode } from '../ui/BaseNode';
import { Image } from 'lucide-react';

export const ImageTransformNode = ({ id, selected, data }) => {
  const config = {
    fields: [
      { key: 'action', label: 'Action', type: 'select', options: [
        { label: 'Resize', value: 'resize' },
        { label: 'Grayscale', value: 'grayscale' },
      ]},
      { key: 'width', label: 'Width', type: 'number', placeholder: '256' },
      { key: 'height', label: 'Height', type: 'number', placeholder: '256' },
    ],
  };

  return (
    <div className="relative">
      <BaseNode
        id={id}
        data={data}
        selected={selected}
        title="Image: Transform"
        subtitle="Resize or convert"
        category="service"
        icon={<Image size={14} />}
        config={config}
      />
      <Handle type="target" position={Position.Left} id={`${id}-image-in`} className="!bg-violet-400/80 hover:!bg-violet-300 shadow-[0_0_12px_2px_rgba(139,92,246,0.35)]" style={{ top: '50%', transform: 'translateY(-50%)' }} />
      <Handle type="source" position={Position.Right} id={`${id}-image-out`} className="!bg-violet-400/80 hover:!bg-violet-300 shadow-[0_0_12px_2px_rgba(139,92,246,0.35)]" style={{ top: '50%', transform: 'translateY(-50%)' }} />
    </div>
  );
}; 