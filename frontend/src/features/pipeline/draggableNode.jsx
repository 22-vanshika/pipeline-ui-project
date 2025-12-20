import { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useStore } from './store';
import { getDefaultNodeData } from './nodes/registry';

export const DraggableNode = ({ type, label, className }) => {
  const { addNode } = useStore();
  const [showTooltip, setShowTooltip] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const hoverTimer = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });

  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
    setShowTooltip(false);
    clearTimeout(hoverTimer.current);
  };

  const handleTapToAdd = (event) => {
    if (window.innerWidth > 768) {
      const x = event.clientX;
      const y = event.clientY;
      setCoords({ x, y });
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 3000);
      return;
    }
    
    event.preventDefault();
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

  const handleMouseMove = (e) => {
    mousePos.current = { x: e.clientX, y: e.clientY };
    if (showTooltip) {
      setCoords({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseEnter = (e) => {
    mousePos.current = { x: e.clientX, y: e.clientY };
    hoverTimer.current = setTimeout(() => {
      setCoords(mousePos.current);
      setShowTooltip(true);
    }, 500);
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimer.current);
    setShowTooltip(false);
  };

  return (
    <>
      <div
        className={className || "cursor-grab select-none rounded-lg px-3 py-2 text-sm text-stone-200 bg-white/5 border border-white/10 hover:bg-white/10 active:scale-[0.98] transition w-full"}
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.target.style.cursor = 'grab')}
        onClick={handleTapToAdd}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        draggable
        data-node-type={type}
      >
        {label}
      </div>

      {showTooltip && createPortal(
        <div 
          className="fixed z-50 pointer-events-none flex flex-col items-start"
          style={{ 
            left: coords.x + 16, 
            top: coords.y + 16,
          }}
        >
          <div className="px-3 py-2 rounded-lg bg-black/90 backdrop-blur-md border border-white/10 
            text-xs text-stone-300 shadow-xl animate-in fade-in zoom-in-95 duration-200">
            <div className="font-medium text-white mb-0.5">Drag to Add</div>
            <div className="text-[10px] opacity-80">Drop on canvas</div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};