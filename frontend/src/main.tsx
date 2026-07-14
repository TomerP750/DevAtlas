import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { Layout } from './layout/Layout'
import { ThemeProvider } from './shared/contexts/ThemeContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <ThemeProvider>
        <Layout />
      </ThemeProvider>
    </BrowserRouter>
  </QueryClientProvider>,
)
