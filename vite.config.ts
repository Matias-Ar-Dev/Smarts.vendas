import { defineConfig, Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import history from 'connect-history-api-fallback'

// Plugin SPA para rotas do React Router
const spaFallbackPlugin = (): Plugin => {
  return {
    name: 'spa-fallback',
    configureServer(server) {
      server.middlewares.use(
        history({
          verbose: false,
          rewrites: [
            { from: /^\/sign-in$/, to: '/index.html' },
            { from: /^\/.*/, to: '/index.html' },
          ],
        }) as any // ← opcional para evitar erro TS
      )
    }
  }
}

export default defineConfig({
  plugins: [
    react(),
    spaFallbackPlugin()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 2000,
  },
})



// import { defineConfig } from 'vite'
// import path from "path"
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
    
//   },
//   build:{
//     chunkSizeWarningLimit: 2000,
//   }
// })
