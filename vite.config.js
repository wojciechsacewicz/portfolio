import { cpSync, createReadStream, existsSync, statSync } from 'node:fs';
import { extname, resolve } from 'node:path';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const page = (path) => fileURLToPath(new URL(`./app/${path}`, import.meta.url));
const projectRoot = fileURLToPath(new URL('.', import.meta.url));
const assetsRoot = resolve(projectRoot, 'assets');
const outDir = resolve(projectRoot, 'dist');

const mimeTypes = {
  '.avif': 'image/avif',
  '.css': 'text/css',
  '.ico': 'image/x-icon',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.mp4': 'video/mp4',
  '.pdf': 'application/pdf',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webmanifest': 'application/manifest+json',
  '.webp': 'image/webp',
};

function portfolioStaticFiles() {
  return {
    name: 'portfolio-static-files',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url?.startsWith('/assets/')) {
          next();
          return;
        }

        const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
        const filePath = resolve(projectRoot, pathname.slice(1));

        if (!filePath.startsWith(assetsRoot) || !existsSync(filePath) || !statSync(filePath).isFile()) {
          next();
          return;
        }

        res.setHeader('Content-Type', mimeTypes[extname(filePath)] || 'application/octet-stream');
        createReadStream(filePath).pipe(res);
      });
    },
    closeBundle() {
      cpSync(assetsRoot, resolve(outDir, 'assets'), { recursive: true });
      cpSync(resolve(projectRoot, 'CNAME'), resolve(outDir, 'CNAME'));
    },
  };
}

export default defineConfig({
  root: 'app',
  base: '/',
  publicDir: false,
  plugins: [react(), portfolioStaticFiles()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    assetsDir: 'build',
    rollupOptions: {
      input: {
        home: page('index.html'),
        work: page('work/index.html'),
        about: page('about/index.html'),
        contact: page('contact/index.html'),
        workspace: page('about/workspace/index.html'),
        windows: page('about/windows/index.html'),
      },
    },
  },
  server: {
    host: '127.0.0.1',
  },
  preview: {
    host: '127.0.0.1',
  },
});
