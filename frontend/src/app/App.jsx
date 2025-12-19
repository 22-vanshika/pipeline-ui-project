// src/App.jsx

import Flow from '@/features/pipeline/Flow';
import { Toaster } from 'react-hot-toast';
import { ErrorBoundary } from '@/components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <Toaster position="top-right" />
        <div style={{ flexGrow: 1 }}>
          <Flow />
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;