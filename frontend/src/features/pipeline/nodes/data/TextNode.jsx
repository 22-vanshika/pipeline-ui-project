import { Handle, Position, useUpdateNodeInternals } from '@xyflow/react';
import TextareaAutosize from 'react-textarea-autosize';
import { BaseNode } from '../ui/BaseNode';
import { useStore } from '@/features/pipeline/store';
import { useVariableParser } from '@/hooks/useVariableParser';
import { useRef, useEffect, useState } from 'react';
import { FileText } from 'lucide-react';
import { getHandleClassName, NodeHandle } from '../ui/handleUtils';

export const TextNode = ({ id, data, selected }) => {
  const { updateNodeData, updateNodeStyle } = useStore();
  const [text, setText] = useState(data.text || '{{input}}');
  const variables = useVariableParser(text);
  const textareaRef = useRef(null);

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    updateNodeData(id, { text: newText });
  };

  const updateNodeInternals = useUpdateNodeInternals();
  useEffect(() => {
    updateNodeInternals(id);
  }, [variables.length, id]);

  useEffect(() => {
    if (textareaRef.current) {
      const { scrollWidth, scrollHeight } = textareaRef.current;
      const newWidth = Math.max(275, scrollWidth + 20);
      const newHeight = Math.max(160, scrollHeight + 48);
      updateNodeStyle(id, { width: `${newWidth}px`, height: `${newHeight}px` });
    }
  }, [text, id, updateNodeStyle]);

  const HANDLE_INITIAL_TOP = 40;
  const HANDLE_SPACING = 30;
  const LABEL_GAP = 8;

  return (
    <div className="relative">
      <BaseNode
        id={id}
        data={data}
        selected={selected}
        title="Text"
        subtitle="Supports variables via {{var}}"
        category="data"
        icon={<FileText size={14} />}
      >
        <div className="flex flex-col gap-2">
          <label className="flex flex-col gap-1">
            <span className="text-[11px] font-semibold text-stone-200/90">Text</span>
            <TextareaAutosize
              ref={textareaRef}
              value={text}
              onChange={handleTextChange}
              className="p-2 rounded-md bg-black/20 border border-white/10 text-stone-50 placeholder-stone-300/60 focus:outline-none focus:ring-2 focus:ring-white/30 resize-none"
              minRows={3}
            />
          </label>
        </div>
      </BaseNode>

      {variables.map((varName, index) => (
        <div key={varName} className="absolute flex items-center" style={{ top: HANDLE_INITIAL_TOP + index * HANDLE_SPACING }}>
          <span className="text-[12px] text-stone-50 bg-black/40 border border-white/10 rounded px-2 py-0.5 mr-2" style={{ transform: 'translateX(-100%)', marginRight: LABEL_GAP }}>
            {varName}
          </span>
          <Handle
            type="target"
            position={Position.Left}
            id={`${id}-${varName}`}
            className={getHandleClassName('data')}
          />
        </div>
      ))}

      <NodeHandle type="source" position={Position.Right} id={`${id}-output`} category="data" />
    </div>
  );
};

