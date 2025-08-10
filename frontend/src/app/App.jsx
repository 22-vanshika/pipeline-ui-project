// src/App.jsx

import Flow from '@/features/pipeline/Flow';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Toaster position="top-right" />
      <div style={{ flexGrow: 1 }}>
        <Flow />
      </div>
    </div>
  );
}

export default App;