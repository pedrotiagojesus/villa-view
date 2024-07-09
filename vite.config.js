import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    base: "/villa-view",
    plugins: [react()],
    optimizeDeps: {
        exclude: ["js-big-decimal"],
    },
});
