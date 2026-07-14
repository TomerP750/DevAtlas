import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { Layout } from './layout/Layout'
import { ThemeProvider } from './shared/contexts/ThemeContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastConfig } from './shared/utils/ToastConfig'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <ThemeProvider>
        <ToastConfig />
        <Layout />
      </ThemeProvider>
    </BrowserRouter>
  </QueryClientProvider>,
)
