import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Minimal configuration for Amplify compatibility
  output: "standalone",
  // Disable telemetry
  telemetry: false,
  // Disable source maps
  productionBrowserSourceMaps: false,
  // Minimal webpack config
  webpack: (config) => {
    // Add path alias resolution
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "src"),
    };

    // Disable complex optimizations
    config.optimization = {
      ...config.optimization,
      splitChunks: false,
    };

    return config;
  },
};

export default nextConfig;
