import { applyNodeChanges } from "@xyflow/react";

export const createNodesSlice = (set, get) => ({
  nodes: [],

  onNodesChange: (changes) => {
    set({ nodes: applyNodeChanges(changes, get().nodes) });
  },

  addNode: (newNode) => {
    set({ nodes: [...get().nodes, newNode] });
  },

  updateNodeData: (nodeId, newData) => {
    set({
      nodes: get().nodes.map((node) =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, ...newData } }
          : node
      ),
    });
  },

  updateNodeStyle: (nodeId, newStyle) => {
    set({
      nodes: get().nodes.map((node) =>
        node.id === nodeId
          ? { ...node, style: { ...(node.style || {}), ...newStyle } }
          : node
      ),
    });
  },

  removeNode: (nodeId) => {
    set({ nodes: get().nodes.filter((node) => node.id !== nodeId) });
  },

  clearNodes: () => {
    set({ nodes: [] });
  },
});
