import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
    base: "/",
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
            "@pages": path.resolve(__dirname, "src/pages"),
        },
    },
    preview: {
        port: 8080,
        strictPort: true,
    },
    server: {
        port: 8080,
        strictPort: true,
        host: true,
        origin: "http://0.0.0:8080"
    }
});
