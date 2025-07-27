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
  // Disable source maps in production
  productionBrowserSourceMaps: false,
  // Reduce memory usage during build
  experimental: {
    // Reduce memory usage
    workerThreads: false,
    cpus: 1,
  },
  // Minimal webpack config
  webpack: (config, { dev, isServer }) => {
    // Add path alias resolution
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "src"),
    };

    // Memory optimizations
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          default: {
            minChunks: 1,
            priority: -20,
            reuseExistingChunk: true,
          },
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: -10,
            chunks: 'all',
          },
        },
      },
      // Reduce memory usage
      minimize: !dev,
    };

    // Reduce parallelism to save memory
    if (!dev) {
      config.parallelism = 1;
    }

    return config;
  },
};

export default nextConfig;
