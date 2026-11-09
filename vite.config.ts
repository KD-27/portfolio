import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Two builds from one codebase (see src/audience.ts):
//   default          -> dist/           served at /portfolio/           (PhD version)
//   --mode industry  -> dist/robotics/  served at /portfolio/robotics/  (job version)
// The default build empties dist/, so it must run first (npm run build does this).
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const industry = mode === 'industry'
  return {
    plugins: [react(), tailwindcss()],
    base: industry ? '/portfolio/robotics/' : '/portfolio/',
    build: industry ? { outDir: 'dist/robotics' } : {},
  }
})
