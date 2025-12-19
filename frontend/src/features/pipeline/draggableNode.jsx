import { useStore } from './store';
import { getDefaultNodeData } from './nodes/registry';

export const DraggableNode = ({ type, label, className }) => {
  const { addNode } = useStore();

  // Desktop: drag and drop
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  // Mobile: tap to add (since drag doesn't work on touch)
  const handleTapToAdd = (event) => {
    // Only for touch devices - check if it's a touch event or small screen
    if (window.innerWidth > 768) return;
    
    event.preventDefault();
    
    // Add node to center of visible canvas area
    const newNode = {
      id: `${type}-${Date.now()}`,
      type: type,
      position: { 
        x: 100 + Math.random() * 200, 
        y: 100 + Math.random() * 200 
      },
      data: getDefaultNodeData(type),
      style: { width: 250 },
    };
    
    addNode(newNode);
  };

  return (
    <div
      className={className || "cursor-grab select-none rounded-lg px-3 py-2 text-sm text-stone-200 bg-white/5 border border-white/10 hover:bg-white/10 active:scale-[0.98] transition w-full"}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      onClick={handleTapToAdd}
      draggable
      data-node-type={type}
    >
      {label}
    </div>
  );
};