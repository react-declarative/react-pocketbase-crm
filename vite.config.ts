import { defineConfig } from "vite";
import environmentPlugin from "vite-plugin-environment";
import fullReload from "vite-plugin-full-reload";
import legacy from "@vitejs/plugin-legacy";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import path from "path";
import react from "@vitejs/plugin-react";
import { splitVendorChunkPlugin } from "vite";

export default defineConfig({
  plugins: [
    react(),
    fullReload(["**/*.ts*", "**/*.js*", "**/*.mjs"], {
      always: true,
      root: "src",
    }),
    legacy(),
    splitVendorChunkPlugin(),
    nodePolyfills({
      protocolImports: true,
    }),
    environmentPlugin("all", { loadEnvFiles: true, prefix: "CC_" }),
  ],
  resolve: {
    alias: {
      "react/jsx-runtime": path.resolve(__dirname, "./lib/jsx-runtime"),
      "react/jsx-dev-runtime": path.resolve(__dirname, "./lib/jsx-dev-runtime"),
    },
  },
  build: {
    target: "chrome87",
    outDir: "build",
    minify: "terser",
  },
  server: {
    hmr: false,
  },
});
