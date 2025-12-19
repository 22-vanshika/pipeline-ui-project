import { useState, useRef, useCallback } from "react";
import { ReactFlow, Controls, Background, MiniMap } from "@xyflow/react";
import { useStore } from "./store";
import "@xyflow/react/dist/style.css";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";

// Import from registry instead of individual files (OCP)
import { NODE_TYPES, getDefaultNodeData } from "./nodes/registry";
import { PipelineToolbar } from "./toolbar";
import { SubmitButton } from "./submit";

function Flow() {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [toolbarExpanded, setToolbarExpanded] = useState(true);
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, addNode } =
    useStore();

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const appData = JSON.parse(
        event.dataTransfer.getData("application/reactflow")
      );
      if (typeof appData === "undefined" || !appData || !reactFlowInstance)
        return;

      // Use clientX/Y directly - screenToFlowPosition handles the conversion
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      // Use registry helper for default data (OCP)
      const newNodeData = getDefaultNodeData(appData.nodeType);

      const newNode = {
        id: `${appData.nodeType}-${Date.now()}`,
        type: appData.nodeType,
        position,
        data: newNodeData,
        style: { width: 275 },
      };

      addNode(newNode);
    },
    [reactFlowInstance, addNode]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const defaultEdgeOptions = {
    type: "smoothstep",
    style: { strokeWidth: 2, stroke: "#64748b" },
    animated: true,
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* Header - minimal, no branding */}
      <header className="flex items-center justify-between px-4 py-2 bg-black/60 backdrop-blur-xl border-b border-white/10 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition lg:hidden"
          aria-label="Toggle sidebar"
        >
          {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
        
        <div className="flex items-center gap-2 text-xs font-medium text-stone-400">
          <span className="px-2.5 py-1.5 rounded-md bg-white/5 border border-white/10">
            {nodes.length} nodes
          </span>
          <span className="px-2.5 py-1.5 rounded-md bg-white/5 border border-white/10">
            {edges.length} edges
          </span>
        </div>
      </header>

      <div className="flex-1 relative flex">
        {/* Sidebar - responsive */}
        <aside
          className={`
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            absolute lg:relative z-40 h-full
            w-[280px] sm:w-[300px] lg:w-[280px]
            transition-transform duration-300 ease-out
            bg-black/60 lg:bg-black/40 backdrop-blur-xl
            border-r border-white/10
            flex flex-col
          `}
        >
          {/* Sidebar Header */}
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center justify-between">
              <h2 className="text-sm uppercase tracking-wider font-bold text-stone-300">
                Node Library
              </h2>
              <button
                onClick={() => setToolbarExpanded(!toolbarExpanded)}
                className="p-1 rounded hover:bg-white/10 transition"
              >
                {toolbarExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
            </div>
          </div>

          {/* Scrollable Nodes Area */}
          <div className={`flex-1 overflow-y-auto p-4 ${toolbarExpanded ? '' : 'hidden'}`}>
            <PipelineToolbar />
          </div>

          {/* Submit Button - Fixed at Bottom */}
          <div className="p-4 border-t border-white/10 bg-black/20">
            <SubmitButton />
          </div>
        </aside>

        {/* Backdrop for mobile sidebar */}
        {sidebarOpen && (
          <div
            className="lg:hidden absolute inset-0 bg-black/50 z-30"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Canvas */}
        <div ref={reactFlowWrapper} className="flex-1 relative">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06),rgba(0,0,0,0.98))]" />
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={NODE_TYPES}
            onInit={setReactFlowInstance}
            proOptions={{ hideAttribution: true }}
            defaultEdgeOptions={defaultEdgeOptions}
            className="[&_.react-flow__node]:transition-all [&_.react-flow__node]:duration-150"
            defaultViewport={{ x: 0, y: 0, zoom: 0.75 }}
            minZoom={0.3}
            maxZoom={1.5}
          >
            <Controls
              position="bottom-right"
              className="!bg-black/40 !backdrop-blur-xl !border !border-white/20 !rounded-lg !shadow-xl [&>button]:!bg-white/10 [&>button]:!border-white/10 [&>button]:!m-1 [&>button_svg]:!fill-white"
            />
            <Background color="#2b3440" variant="dots" gap={20} size={1} />
            <MiniMap
              className="!bg-black/40 !border !border-white/20 !rounded-lg !backdrop-blur-xl hidden lg:block"
              nodeColor={() => "#ffffff30"}
              maskColor="rgba(0,0,0,0.5)"
              pannable
              zoomable
            />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
}

export default Flow;
