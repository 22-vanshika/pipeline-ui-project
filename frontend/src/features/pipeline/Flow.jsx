import { useState, useRef, useCallback } from "react";
import { ReactFlow, Controls, Background, MiniMap } from "@xyflow/react";
import { useStore } from "./store";
import "@xyflow/react/dist/style.css";

import { InputNode } from "./nodes/io/InputNode";
import { OutputNode } from "./nodes/io/OutputNode";
import { LLMNode } from "./nodes/services/LLMNode";
import { TextNode } from "./nodes/data/TextNode";
import { MathAddNode } from "./nodes/logic/MathAddNode";
import { APICallNode } from "./nodes/services/APICallNode";
import { ImageTransformNode } from "./nodes/services/ImageTransformNode";
import { ConditionNode } from "./nodes/logic/ConditionNode";
import { ParseJsonNode } from "./nodes/data/ParseJsonNode";
import { PipelineToolbar } from "./toolbar";
import { SubmitButton } from "./submit";

const nodeTypes = {
  customInput: InputNode,
  customOutput: OutputNode,
  llm: LLMNode,
  text: TextNode,
  mathAdd: MathAddNode,
  apiCall: APICallNode,
  imageTransform: ImageTransformNode,
  condition: ConditionNode,
  parseJson: ParseJsonNode,
};

function Flow() {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
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

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      let newNodeData;
      switch (appData.nodeType) {
        case "text":
          newNodeData = { text: "{{input}}" };
          break;
        case "customInput":
          newNodeData = { inputName: "input", inputType: "Text" };
          break;
        case "customOutput":
          newNodeData = { outputName: "output", outputType: "Text" };
          break;
        default:
          newNodeData = { label: `${appData.nodeType} node` };
      }

      const newNode = {
        id: `${appData.nodeType}-${Math.random()}`,
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
    <div className="w-full h-full relative">
      {/* Floating transparent sidebar, vertically centered */}
      <div className="pointer-events-none absolute left-6 top-1/2 -translate-y-1/2 z-40">
        <div className="pointer-events-auto rounded-xl border border-white/10 bg-transparent backdrop-blur-xl shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)] p-3 w-[260px]">
          <div className="flex items-center justify-center gap-2 mb-3 px-1">
            {/* <Blocks className="h-4 w-4 text-stone-400" /> */}
            <h2 className="text-sm uppercase tracking-wider font-bold text-stone-300">
              Nodes
            </h2>
          </div>
          <PipelineToolbar />
          <div className="mt-4 pt-3 border-t border-white/10">
            <SubmitButton />
          </div>
        </div>
      </div>

      {/* Canvas */}
      <div ref={reactFlowWrapper} className="absolute inset-0">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.08),rgba(0,0,0,0.96))]" />
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          nodeTypes={nodeTypes}
          onInit={setReactFlowInstance}
          proOptions={{ hideAttribution: true }}
          defaultEdgeOptions={defaultEdgeOptions}
          className="[&_.react-flow__node]:transition-all [&_.react-flow__node]:duration-150"
        >
          <Controls
            position="top-left"
            style={{ flexDirection: "row" }}
            className="!left-4 !top-4 bg-white/5 backdrop-blur-xl border border-white/30 text-stone-200 rounded [&>button]:!m-1 [&>button]:!bg-white/10 [&>button]:!border [&>button]:!border-white/10 [&>button_svg]:!text-white"
          />
          <Background color="#2b3440" variant="dots" gap={18} size={1} />
          <MiniMap
            className="!bg-transparent !border !border-white/30 !rounded-lg !p-1"
            nodeColor={() => "#ffffff20"}
            maskColor="transparent"
          />
        </ReactFlow>
      </div>
    </div>
  );
}

export default Flow;
