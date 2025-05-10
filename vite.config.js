// vite.config.js
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  // Base public path when served in development
  base: '/',
  
  // Configure server
  server: {
    port: 3000,
    open: '/dev/debug-dev.html',
    watch: {
      // Watch for changes in source directories
      include: ['src/**/*.js', 'dev/**/*', 'dist/**/*.css'],
    }
  },
  
  // Configure build
  build: {
    outDir: 'dist',
    lib: {
      entry: path.resolve(__dirname, 'src/squibview.js'),
      name: 'SquibView',
      formats: ['es', 'umd'],
      fileName: (format) => `squibview.${format}.js`
    },
    rollupOptions: {
      // Make sure to externalize dependencies that shouldn't be bundled
      external: ['tiny-emitter', 'diff-match-patch', 'turndown'],
      output: {
        // Global variable names for UMD build
        globals: {
          'tiny-emitter': 'TinyEmitter',
          'diff-match-patch': 'DiffMatchPatch',
          'turndown': 'TurndownService'
        }
      }
    }
  },
  
  // Configure resolve
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  
  // Configure optimization
  optimizeDeps: {
    include: ['tiny-emitter', 'diff-match-patch']
  },
  
  // Configure plugins
  plugins: []
});