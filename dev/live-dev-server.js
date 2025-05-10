// Live development server for SquibView using Vite
// This provides HMR (Hot Module Replacement) for rapid development

import { createServer } from 'vite';

// Create and start Vite dev server
async function startServer() {
  const server = await createServer({
    // Configure server
    server: {
      port: 3000,
      open: '/dev/debug.html',
      watch: {
        // Watch for changes in these directories
        include: ['src/**/*.js', 'dev/**/*', 'dist/**/*.css'],
      }
    },
    // Configure build
    build: {
      outDir: 'dist',
      rollupOptions: {
        input: {
          'squibview.esm': './src/squibview.js',
        },
      },
    },
    // Configure optimization
    optimizeDeps: {
      include: ['tiny-emitter', 'diff-match-patch'],
    },
  });

  await server.listen();
  console.log('Live development server running at http://localhost:3000/dev/debug.html');
  
  // Print URL to console with ANSI colors
  console.log('\x1b[32m%s\x1b[0m', '✨ Open your browser at the URL above to start developing');
  console.log('\x1b[36m%s\x1b[0m', '🔄 Changes to source files will trigger hot reload');
}

startServer().catch((e) => {
  console.error('Error starting development server:', e);
  process.exit(1);
});