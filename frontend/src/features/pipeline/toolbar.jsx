/**
 * Pipeline Toolbar - uses NODE_CATEGORIES from registry (OCP).
 * Adding a new node only requires updating the registry.
 */
import { DraggableNode } from './draggableNode';
import { NODE_CATEGORIES } from './nodes/registry';
import { 
  SquarePen, 
  Sparkles, 
  SquareArrowOutUpRight, 
  FileText, 
  Plus, 
  Network, 
  Image, 
  GitFork, 
  FileCode, 
  Link2 
} from 'lucide-react';

// Icon mapping
const ICONS = {
  SquarePen,
  Sparkles,
  SquareArrowOutUpRight,
  FileText,
  Plus,
  Network,
  Image,
  GitFork,
  FileCode,
  Link2,
};

// Map node types to their icons
const NODE_ICONS = {
  customInput: SquarePen,
  customOutput: SquareArrowOutUpRight,
  llm: Sparkles,
  text: FileText,
  concatText: Link2,
  parseJson: FileCode,
  mathAdd: Plus,
  condition: GitFork,
  apiCall: Network,
  imageTransform: Image,
};

const TILE = `
  cursor-grab select-none rounded-lg px-3 py-2.5
  text-xs text-stone-200 font-display font-medium tracking-wide
  border border-white/10 
  bg-gradient-to-r from-white/5 to-transparent
  hover:from-white/10 hover:to-white/5
  hover:border-white/20
  active:scale-[0.98] 
  transition-all duration-150
  inline-flex items-center gap-2.5 w-full
  touch-manipulation
`;

const SECTION_TITLE = "text-[10px] uppercase tracking-widest font-semibold text-stone-500 mb-2 mt-4 first:mt-0";

export const PipelineToolbar = () => {
  return (
    <div className="flex flex-col gap-1.5">
      {Object.entries(NODE_CATEGORIES).map(([categoryKey, category]) => (
        <div key={categoryKey} className="flex flex-col gap-2">
          <span className={SECTION_TITLE}>{category.label}</span>
          {category.nodes.map((node) => {
            const Icon = NODE_ICONS[node.type];
            return (
              <DraggableNode
                key={node.type}
                type={node.type}
                label={
                  <span className="inline-flex items-center gap-2">
                    {Icon && <Icon size={16} className={node.iconColor} />}
                    {node.label}
                  </span>
                }
                className={TILE}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};