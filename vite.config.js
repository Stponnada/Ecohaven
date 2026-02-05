import { defineConfig } from 'vite';

export default defineConfig({
    root: './',
    server: {
        port: 3000,
        open: true,
        host: true
    },
    build: {
        outDir: 'dist',
        assetsDir: 'build-assets',
        rollupOptions: {
            input: {
                main: './index.html',
                support: './support.html'
            }
        }
    }
});
