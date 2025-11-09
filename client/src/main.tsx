
import { createRoot } from 'react-dom/client'
import { QueryClientProvider } from '@tanstack/react-query';

import "./styles/main.css";
import App from './App.tsx'
import { ToastContainer } from 'react-toastify';
import { queryClient } from './lib/react-query/queryClient.ts';



createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <App />
    <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
        style={{ zIndex: 9999 }}
        toastStyle={{ zIndex: 9999 }}
      />
    </QueryClientProvider>
)
