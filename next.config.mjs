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
  // Minimal webpack config with extreme memory optimizations
  webpack: (config, { dev, isServer }) => {
    // Add path alias resolution
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "src"),
    };

    // Extreme memory optimizations
    config.optimization = {
      ...config.optimization,
      splitChunks: false, // Disable chunk splitting to save memory
      minimize: !dev,
      removeAvailableModules: false,
      removeEmptyChunks: false,
      mergeDuplicateChunks: false,
      concatenateModules: false, // Disable module concatenation to save memory
    };

    // Reduce parallelism and memory usage
    config.parallelism = 1;
    config.cache = false; // Disable webpack cache to save memory
    
    // Reduce memory usage in production
    if (!dev) {
      config.stats = 'errors-only';
      config.performance = {
        hints: false,
      };
      
      // Disable source maps completely
      config.devtool = false;
      
      // Reduce memory usage for CSS
      config.optimization.splitChunks = false;
    }

    // Force garbage collection more frequently
    if (!dev && !isServer) {
      const originalEntry = config.entry;
      config.entry = async () => {
        const entries = await originalEntry();
        // Force GC before processing entries
        if (global.gc) {
          global.gc();
        }
        return entries;
      };
    }

    return config;
  },
};

export default nextConfig;
