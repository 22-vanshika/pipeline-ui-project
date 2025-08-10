import { Handle, Position } from '@xyflow/react';
import { BaseNode } from '../ui/BaseNode';
import { FileCode } from 'lucide-react';

export const ParseJsonNode = ({ id, ...props }) => {
  const config = {
    title: 'Data: Parse JSON',
    subtitle: 'Parse JSON string into object',
    icon: <FileCode size={14} />,
    category: 'data',
    fields: [
      { key: 'fallback', label: 'Fallback value', type: 'text', placeholder: '{}' },
      { key: 'strict', label: 'Strict mode', type: 'select', options: [
        { label: 'Enabled', value: 'true' },
        { label: 'Disabled', value: 'false' },
      ]},
    ],
  };

  return (
    <div className="relative">
      <BaseNode id={id} data={props?.data} selected={props?.selected} title="Data: Parse JSON" subtitle="Parse JSON string into object" category="data" icon={<FileCode size={14} />} config={config} />
      <Handle type="target" position={Position.Left} id={`${id}-json`} className="!bg-amber-400/80 hover:!bg-amber-300 shadow-[0_0_12px_2px_rgba(245,158,11,0.35)]" style={{ top: '50%', transform: 'translateY(-50%)' }} />
      <Handle type="source" position={Position.Right} id={`${id}-object`} className="!bg-amber-400/80 hover:!bg-amber-300 shadow-[0_0_12px_2px_rgba(245,158,11,0.35)]" style={{ top: '50%', transform: 'translateY(-50%)' }} />
    </div>
  );
}; 