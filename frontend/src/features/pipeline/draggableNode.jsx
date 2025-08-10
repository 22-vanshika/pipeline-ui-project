export const DraggableNode = ({ type, label, className }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className={className || "cursor-grab select-none rounded-lg px-3 py-2 text-sm text-stone-200 bg-white/5 border border-white/10 hover:bg-white/10 active:scale-[0.98] transition w-full"}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      draggable
      data-node-type={type}
    >
      {label}
    </div>
  );
};
  