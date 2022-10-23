import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-refresh";

// https://vitejs.dev/config/
export default defineConfig(configEnv => ({
    plugins: [react()],
    build: {
        outDir: "build",
    },
}));
