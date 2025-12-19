import { Handle, Position } from '@xyflow/react';

// Handle color schemes based on node category
const HANDLE_COLORS = {
  input: {
    bg: '!bg-emerald-400/80',
    hover: 'hover:!bg-emerald-300',
    shadow: 'shadow-[0_0_12px_2px_rgba(16,185,129,0.35)]',
  },
  output: {
    bg: '!bg-sky-400/80',
    hover: 'hover:!bg-sky-300',
    shadow: 'shadow-[0_0_12px_2px_rgba(56,189,248,0.35)]',
  },
  service: {
    bg: '!bg-violet-400/80',
    hover: 'hover:!bg-violet-300',
    shadow: 'shadow-[0_0_12px_2px_rgba(139,92,246,0.35)]',
  },
  data: {
    bg: '!bg-amber-400/80',
    hover: 'hover:!bg-amber-300',
    shadow: 'shadow-[0_0_12px_2px_rgba(245,158,11,0.35)]',
  },
  logic: {
    bg: '!bg-rose-400/80',
    hover: 'hover:!bg-rose-300',
    shadow: 'shadow-[0_0_12px_2px_rgba(244,63,94,0.35)]',
  },
  default: {
    bg: '!bg-stone-400/80',
    hover: 'hover:!bg-stone-300',
    shadow: 'shadow-[0_0_12px_2px_rgba(168,162,158,0.35)]',
  },
};

/**
 * Get handle className for a given category
 */
export const getHandleClassName = (category = 'default') => {
  const colors = HANDLE_COLORS[category] || HANDLE_COLORS.default;
  return `${colors.bg} ${colors.hover} ${colors.shadow}`;
};

/**
 * NodeHandle component - renders a styled handle based on category
 */
export const NodeHandle = ({
  type,
  position,
  id,
  category = 'default',
  top = '50%',
  style = {},
  ...props
}) => {
  return (
    <Handle
      type={type}
      position={position}
      id={id}
      className={getHandleClassName(category)}
      style={{ top, transform: 'translateY(-50%)', ...style }}
      {...props}
    />
  );
};

/**
 * Render multiple handles from a config array
 * @param {string} nodeId - The node's ID
 * @param {string} category - Node category for styling
 * @param {Array} handles - Array of handle configs: { type, position, id, top }
 */
export const renderHandles = (nodeId, category, handles = []) => {
  return handles.map((handle, index) => (
    <NodeHandle
      key={handle.id || `${nodeId}-handle-${index}`}
      type={handle.type}
      position={handle.position || (handle.type === 'source' ? Position.Right : Position.Left)}
      id={`${nodeId}-${handle.id}`}
      category={category}
      top={handle.top || '50%'}
      style={handle.style}
    />
  ));
};

export { HANDLE_COLORS, Position };
