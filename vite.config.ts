import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, path.resolve(import.meta.dirname), '');

  return {
    plugins: [
      react(),
      runtimeErrorOverlay(),
      ...(process.env.NODE_ENV !== "production" &&
      process.env.REPL_ID !== undefined
        ? [
            import("@replit/vite-plugin-cartographer").then((m) =>
              m.cartographer(),
            ),
          ]
        : []),
    ],
    define: {
      'process.env.APP_DOMAIN': JSON.stringify(env.APP_DOMAIN || 'modl.gg')
    },
    resolve: {
      alias: [
        { find: "@", replacement: path.resolve(import.meta.dirname, "client", "src") },
        { find: "@shared", replacement: path.resolve(import.meta.dirname, "shared") },
        { find: "@assets", replacement: path.resolve(import.meta.dirname, "attached_assets") },
        {
          find: /^lucide-react$/,
          replacement: path.resolve(
            import.meta.dirname,
            "client",
            "src",
            "lib",
            "lucide-shim.ts",
          ),
        },
      ],
      preserveSymlinks: true,
    },
    envDir: path.resolve(import.meta.dirname),
    root: path.resolve(import.meta.dirname, "client"),
    build: {
      outDir: path.resolve(import.meta.dirname, "dist"),
      emptyOutDir: true,
      target: "es2020",
      cssCodeSplit: true,
      modulePreload: {
        polyfill: true,
      },
      commonjsOptions: {
        transformMixedEsModules: true,
      },
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (!id.includes("node_modules")) return;
            if (id.includes("/framer-motion/")) return "framer-motion";
            return "vendor";
          },
        },
      },
    },
    server: {
      port: 5174,
      proxy: {
        '/v1': {
          target: 'http://localhost:8080',
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
