import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

// Dev only: Vite serves public/ files but not a folder's index.html, so /games/<name>/ fell through to the portfolio page.
// Static hosts already serve the folder index, so nothing is needed for the production build.
const gameIndex: Plugin = {
  name: 'game-index',
  configureServer(server) {
    // `req` is typed by hand: this project has no @types/node, so Vite's own request type has no `url`.
    server.middlewares.use((req: { url?: string }, _res, next) => {
      if (req.url) req.url = req.url.replace(/^(\/games\/[^/?]+\/)(\?|$)/, '$1index.html$2')
      next()
    })
  },
}

export default defineConfig({ plugins: [react(), gameIndex] })
