export const createAnalysisSlice = (set) => ({
  lastAnalysis: null,
  isAnalyzing: false,
  analysisError: null,

  setLastAnalysis: (analysis) => {
    set({ lastAnalysis: analysis, analysisError: null });
  },

  setIsAnalyzing: (isAnalyzing) => {
    set({ isAnalyzing });
  },

  setAnalysisError: (error) => {
    set({ analysisError: error, isAnalyzing: false });
  },

  clearAnalysis: () => {
    set({ lastAnalysis: null, analysisError: null, isAnalyzing: false });
  },
});
