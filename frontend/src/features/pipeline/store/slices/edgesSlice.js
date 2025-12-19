import { addEdge, applyEdgeChanges } from "@xyflow/react";

export const createEdgesSlice = (set, get) => ({
  edges: [],

  onEdgesChange: (changes) => {
    set({ edges: applyEdgeChanges(changes, get().edges) });
  },

  onConnect: (connection) => {
    set({ edges: addEdge(connection, get().edges) });
  },

  removeEdge: (edgeId) => {
    set({ edges: get().edges.filter((edge) => edge.id !== edgeId) });
  },

  clearEdges: () => {
    set({ edges: [] });
  },
});
