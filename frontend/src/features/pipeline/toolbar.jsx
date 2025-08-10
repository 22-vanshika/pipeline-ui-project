// src/toolbar.jsx
import { DraggableNode } from './draggableNode';
import { SquarePen, Sparkles, SquareArrowOutUpRight, FileText, Plus, Network, Image, GitFork, FileCode } from 'lucide-react';

const TILE = "cursor-grab select-none rounded-md px-3 py-2 text-sm text-stone-200/90 border border-white/10 bg-white/5 hover:bg-white/10 active:scale-[0.98] transition inline-flex items-center gap-2 w-full";

export const PipelineToolbar = () => {
  return (
    <div className="flex flex-col gap-2">
      <DraggableNode type='customInput' label={<span className="inline-flex items-center gap-2"><SquarePen size={14} /> Input</span>} className={TILE} />
      <DraggableNode type='llm' label={<span className="inline-flex items-center gap-2"><Sparkles size={14} /> LLM</span>} className={TILE} />
      <DraggableNode type='customOutput' label={<span className="inline-flex items-center gap-2"><SquareArrowOutUpRight size={14} /> Output</span>} className={TILE} />
      <DraggableNode type='text' label={<span className="inline-flex items-center gap-2"><FileText size={14} /> Text</span>} className={TILE} />

      <DraggableNode type='mathAdd' label={<span className="inline-flex items-center gap-2"><Plus size={14} /> Math: Add</span>} className={TILE} />
      <DraggableNode type='parseJson' label={<span className="inline-flex items-center gap-2"><FileCode size={14} /> Data: Parse JSON</span>} className={TILE} />
      <DraggableNode type='apiCall' label={<span className="inline-flex items-center gap-2"><Network size={14} /> API Call</span>} className={TILE} />
      <DraggableNode type='imageTransform' label={<span className="inline-flex items-center gap-2"><Image size={14} /> Image Transform</span>} className={TILE} />
      <DraggableNode type='condition' label={<span className="inline-flex items-center gap-2"><GitFork size={14} /> Condition</span>} className={TILE} />
    </div>
  );
};