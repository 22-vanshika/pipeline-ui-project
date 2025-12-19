export const config = {
  // Use relative URL for Vercel, absolute for local dev
  apiUrl: import.meta.env.VITE_API_URL || '',
  appTitle: import.meta.env.VITE_APP_TITLE || 'Pipeline Builder',
  maxNodes: parseInt(import.meta.env.VITE_MAX_NODES || '100', 10),
  enablePersistence: import.meta.env.VITE_ENABLE_PERSISTENCE !== 'false',
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
};

export default config;
