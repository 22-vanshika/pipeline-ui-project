import { Position } from '@xyflow/react';
import { BaseNode } from '../ui/BaseNode';
import { NodeHandle } from '../ui/handleUtils';
import { Image } from 'lucide-react';

export const ImageTransformNode = ({ id, data, selected }) => {
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
      <NodeHandle type="target" position={Position.Left} id={`${id}-image-in`} category="service" />
      <NodeHandle type="source" position={Position.Right} id={`${id}-image-out`} category="service" />
    </div>
  );
};