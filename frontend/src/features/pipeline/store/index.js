import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { createNodesSlice } from "./slices/nodesSlice";
import { createEdgesSlice } from "./slices/edgesSlice";
import { createAnalysisSlice } from "./slices/analysisSlice";
import config from "@/config";

const storeCreator = (set, get) => ({
  ...createNodesSlice(set, get),
  ...createEdgesSlice(set, get),
  ...createAnalysisSlice(set, get),

  clearPipeline: () => {
    set({
      nodes: [],
      edges: [],
      lastAnalysis: null,
      analysisError: null,
      isAnalyzing: false,
    });
  },

  exportPipeline: () => {
    const { nodes, edges } = get();
    return JSON.stringify({ nodes, edges, exportedAt: new Date().toISOString() }, null, 2);
  },

  importPipeline: (jsonString) => {
    try {
      const data = JSON.parse(jsonString);
      if (data.nodes && Array.isArray(data.nodes)) {
        set({ nodes: data.nodes, edges: data.edges || [] });
        return { success: true };
      }
      return { success: false, error: 'Invalid pipeline format' };
    } catch (e) {
      return { success: false, error: e.message };
    }
  },
});

// Persist to localStorage if enabled
export const useStore = config.enablePersistence
  ? create(
      persist(storeCreator, {
        name: 'vectorflow-pipeline',
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          nodes: state.nodes,
          edges: state.edges,
        }),
      })
    )
  : create(storeCreator);

export const useNodes = () => useStore((state) => state.nodes);
export const useEdges = () => useStore((state) => state.edges);
export const useAnalysis = () => useStore((state) => state.lastAnalysis);
