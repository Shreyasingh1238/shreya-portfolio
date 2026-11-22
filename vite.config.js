import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import contact from './api/contact.js'

// Use the same serverless handler locally, without exposing SMTP secrets to Vite's client.
function localContact() {
  return {
    name: 'local-contact',
    configureServer(server) {
      Object.assign(process.env, loadEnv(server.config.mode, process.cwd(), ''))
      server.middlewares.use('/api/contact', async (req, res) => {
        res.status = code => { res.statusCode = code; return res }
        res.json = value => { res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify(value)); return res }
        if (req.method !== 'POST') return contact(req, res)
        let body = ''
        for await (const chunk of req) {
          body += chunk
          if (body.length > 10000) return res.status(413).json({ error: 'Message is too large.' })
        }
        try { req.body = JSON.parse(body) } catch { return res.status(400).json({ error: 'Invalid request.' }) }
        return contact(req, res)
      })
    },
  }
}
export default defineConfig({ plugins: [react(), tailwindcss(), localContact()] })
