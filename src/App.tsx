import { RouterProvider } from 'react-router-dom'
import './global.css'
import { router } from './routes'
import {Helmet,HelmetProvider} from 'react-helmet-async'
import { Toaster } from 'sonner'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/react-query'
// import {HealthStatusProvider } from './context/HealthContextProvider'



export function App() {
  return(
    <HelmetProvider>
      <Helmet titleTemplate='%s | smarts.vendas'/>
      <Toaster richColors/>
      <QueryClientProvider client={queryClient}>
        {/* <HealthStatusProvider> */}
           <RouterProvider router={router}/>
        {/* </HealthStatusProvider> */}
      </QueryClientProvider>
  </HelmetProvider>
  )
}


