import { create } from 'zustand';
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
} from '@xyflow/react';

export const useStore = create((set, get) => ({
  nodes: [],
  edges: [],
  lastAnalysis: null, // { num_nodes, num_edges, is_dag }

  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },

  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  onConnect: (connection) => {
    set({
      edges: addEdge(connection, get().edges),
    });
  },
  
  addNode: (newNode) => {
    set({
      nodes: get().nodes.concat(newNode),
    });
  },
  
  updateNodeData: (nodeId, newData) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          return { ...node, data: { ...node.data, ...newData } };
        }
        return node;
      }),
    });
  },

  updateNodeStyle: (nodeId, newStyle) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          return { ...node, style: { ...(node.style || {}), ...newStyle } };
        }
        return node;
      }),
    });
  },

  setLastAnalysis: (analysis) => set({ lastAnalysis: analysis }),
}));