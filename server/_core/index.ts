/**
 * Server entry point - starts Vite dev server for static template
 * This file is required by the webdev system
 */

import { createServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '../..');

async function startServer() {
  // Import the vite config
  const configPath = path.resolve(rootDir, 'vite.config.ts');
  
  const server = await createServer({
    configFile: configPath,
    root: path.resolve(rootDir, 'client'),
    server: {
      host: true,
      port: 3000,
    },
  });

  await server.listen();
  
  console.log(`\n  Vite dev server running at:`);
  server.printUrls();
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
