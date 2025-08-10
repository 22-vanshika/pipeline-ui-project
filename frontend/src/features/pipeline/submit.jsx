import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useStore } from './store';
import { Sparkles, X, CheckCircle, AlertTriangle, Boxes, Share2, Check, RefreshCw } from 'lucide-react';
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
      if (e.key === 'Tab') {
        // very small trap: keep focus within modal actions
        const focusable = [okButtonRef.current];
        if (!focusable[0]) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', onKeyDown);
    // set initial focus
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
    const pipelineData = { nodes, edges };

    try {
      const response = await axios.post('/api/pipelines/parse', pipelineData, { timeout: 5000 });
      const { num_nodes, num_edges, is_dag } = response.data;
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
  const titleText = isResult ? (isDag ? 'Analysis Successful' : 'Invalid Pipeline Detected') : 'Error';

  return (
    <>
      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-md text-white font-medium bg-white/5 hover:bg-white/10 border border-white/10 transition disabled:opacity-60"
        aria-label="Submit"
      >
        <Sparkles size={16} />
        {isLoading ? 'Submitting...' : 'Submit'}
      </button>

      {modalOpen && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className={`absolute inset-0 transition-opacity duration-200 ${animateIn ? 'opacity-100' : 'opacity-0'} bg-black/60`} onClick={() => setModalOpen(false)} />
          <div className={`relative z-10 w-[min(92vw,620px)] rounded-xl border border-white/10 ring-1 ring-white/10 bg-black/60 backdrop-blur-xl shadow-2xl p-4 text-white transition-all duration-200 ease-out ${animateIn ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} role="dialog" aria-modal="true">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <TitleIcon size={18} className={isResult ? (isDag ? 'text-emerald-400' : 'text-amber-400') : 'text-amber-400'} />
                <h3 className="text-lg font-semibold">{titleText}</h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-md hover:bg-white/10"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>

            {isResult && (
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 min-w-[140px] rounded-lg bg-slate-800/50 ring-1 ring-white/10 p-3">
                  <div className="flex items-center gap-2 text-slate-300 mb-1">
                    <Boxes size={16} />
                    <span className="text-[11px] uppercase tracking-wider">Nodes</span>
                  </div>
                  <div className="text-2xl font-bold">{modalContent.num_nodes}</div>
                </div>
                <div className="flex-1 min-w-[140px] rounded-lg bg-slate-800/50 ring-1 ring-white/10 p-3">
                  <div className="flex items-center gap-2 text-slate-300 mb-1">
                    <Share2 size={16} />
                    <span className="text-[11px] uppercase tracking-wider">Edges</span>
                  </div>
                  <div className="text-2xl font-bold">{modalContent.num_edges}</div>
                </div>
                <div className="flex-1 min-w-[140px] rounded-lg bg-slate-800/50 ring-1 ring-white/10 p-3">
                  <div className="flex items-center gap-2 text-slate-300 mb-1">
                    {isDag ? (
                      <Check size={16} className="text-emerald-400" />
                    ) : (
                      <RefreshCw size={16} className="text-amber-400" />
                    )}
                    <span className="text-[11px] uppercase tracking-wider">DAG Present</span>
                  </div>
                  <div className={`text-xl font-semibold ${isDag ? 'text-emerald-300' : 'text-amber-300'}`}>
                    {isDag ? 'Yes' : 'No (Cycle Detected)'}
                  </div>
                </div>
              </div>
            )}

            {modalContent?.type === 'error' && (
              <div className="text-sm text-amber-300">{modalContent?.message || 'An error occurred while analyzing the pipeline.'}</div>
            )}

            <div className="mt-5 flex justify-end">
              <button
                ref={okButtonRef}
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 rounded-md bg-white/10 hover:bg-white/15 border border-white/10"
              >
                OK
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};
