import { useEffect, useRef, useState } from 'react';
import { useStore } from './store';
import { analyzePipeline } from '@/services/pipelineService';
import { X, CheckCircle, AlertTriangle, Boxes, Share2, Check, RefreshCw, Zap } from 'lucide-react';
import { createPortal } from 'react-dom';

export const SubmitButton = () => {
  const { nodes, edges, setLastAnalysis } = useStore();
  const [isLoading, setIsLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [animateIn, setAnimateIn] = useState(false);
  const okButtonRef = useRef(null);

  useEffect(() => {
    if (!modalOpen) return;

    setAnimateIn(false);
    const t = setTimeout(() => setAnimateIn(true), 10);

    const onKeyDown = (e) => {
      if (e.key === 'Escape') setModalOpen(false);
    };

    document.addEventListener('keydown', onKeyDown);
    const f = setTimeout(() => okButtonRef.current?.focus(), 20);

    return () => {
      clearTimeout(t);
      clearTimeout(f);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [modalOpen]);

  const handleSubmit = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const result = await analyzePipeline(nodes, edges);
      const { num_nodes, num_edges, is_dag } = result;
      setModalContent({ type: 'result', num_nodes, num_edges, is_dag });
      setLastAnalysis({ num_nodes, num_edges, is_dag });
      setModalOpen(true);
    } catch (error) {
      const errorMessage = error.response?.data?.detail || error.message || 'An unexpected error occurred.';
      setModalContent({ type: 'error', message: errorMessage });
      setModalOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const isResult = modalContent?.type === 'result';
  const isDag = isResult ? !!modalContent.is_dag : false;
  const TitleIcon = isResult ? (isDag ? CheckCircle : AlertTriangle) : AlertTriangle;
  const titleText = isResult ? (isDag ? 'Analysis Complete' : 'Cycle Detected') : 'Error';

  return (
    <>
      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className="group w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg
          font-display font-semibold text-sm tracking-wide
          bg-white/5 hover:bg-white/10
          border border-white/15 hover:border-white/25
          text-stone-200 hover:text-white
          active:scale-[0.98]
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-all duration-200"
      >
        <Zap size={16} className="text-amber-400 group-hover:text-amber-300 transition-colors" />
        {isLoading ? 'Analyzing...' : 'Analyze'}
      </button>

      {modalOpen && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-200 ${animateIn ? 'opacity-100' : 'opacity-0'}`} 
            onClick={() => setModalOpen(false)} 
          />
          <div 
            className={`relative z-10 w-full max-w-lg rounded-xl border border-white/10 bg-stone-900/95 backdrop-blur-xl shadow-2xl overflow-hidden transition-all duration-200 ${animateIn ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
            role="dialog" 
            aria-modal="true"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <TitleIcon size={18} className={isResult ? (isDag ? 'text-emerald-400' : 'text-amber-400') : 'text-red-400'} />
                <h3 className="font-display font-semibold text-lg">{titleText}</h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-md hover:bg-white/10 transition-colors"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5">
              {isResult && (
                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-lg bg-white/5 border border-white/10 p-4">
                    <div className="flex items-center gap-2 text-stone-400 mb-2">
                      <Boxes size={14} />
                      <span className="text-xs uppercase tracking-wider font-medium">Nodes</span>
                    </div>
                    <div className="text-2xl font-display font-bold">{modalContent.num_nodes}</div>
                  </div>
                  <div className="rounded-lg bg-white/5 border border-white/10 p-4">
                    <div className="flex items-center gap-2 text-stone-400 mb-2">
                      <Share2 size={14} />
                      <span className="text-xs uppercase tracking-wider font-medium">Edges</span>
                    </div>
                    <div className="text-2xl font-display font-bold">{modalContent.num_edges}</div>
                  </div>
                  <div className="rounded-lg bg-white/5 border border-white/10 p-4">
                    <div className="flex items-center gap-2 text-stone-400 mb-2">
                      {isDag ? <Check size={14} className="text-emerald-400" /> : <RefreshCw size={14} className="text-amber-400" />}
                      <span className="text-xs uppercase tracking-wider font-medium">Valid</span>
                    </div>
                    <div className={`text-xl font-display font-semibold ${isDag ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {isDag ? 'Yes' : 'No'}
                    </div>
                  </div>
                </div>
              )}

              {modalContent?.type === 'error' && (
                <div className="text-sm text-red-300 bg-red-500/10 rounded-lg p-4 border border-red-500/20">
                  {modalContent?.message || 'An error occurred while analyzing the pipeline.'}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-5 py-4 border-t border-white/10 flex justify-end">
              <button
                ref={okButtonRef}
                onClick={() => setModalOpen(false)}
                className="px-5 py-2 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 font-medium text-sm transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};
