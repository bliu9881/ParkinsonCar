import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable standalone to avoid memory-intensive build traces
  // output: "standalone", // Commented out to avoid build traces
  // Disable telemetry
  telemetry: false,
  // Disable source maps in production
  productionBrowserSourceMaps: false,
  // Reduce memory usage during build
  experimental: {
    // Reduce memory usage
    workerThreads: false,
    cpus: 1,
    // Disable build traces completely
    outputFileTracingRoot: false,
    outputFileTracing: false,
  },
  // Ultra-minimal webpack config to prevent memory issues
  webpack: (config, { dev, isServer }) => {
    // Add path alias resolution
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "src"),
    };

    // Ultra-aggressive memory optimizations
    config.optimization = {
      minimize: !dev,
      // Disable all memory-intensive optimizations
      splitChunks: false,
      removeAvailableModules: false,
      removeEmptyChunks: false,
      mergeDuplicateChunks: false,
      concatenateModules: false,
      flagIncludedChunks: false,
      occurrenceOrder: false,
      providedExports: false,
      usedExports: false,
      sideEffects: false,
    };

    // Minimal parallelism and caching
    config.parallelism = 1;
    config.cache = false;
    
    // Disable all non-essential features
    if (!dev) {
      config.stats = false;
      config.performance = false;
      config.devtool = false;
      
      // Disable module resolution optimizations that use memory
      config.resolve.symlinks = false;
      config.resolve.cacheWithContext = false;
    }

    // Minimal module rules to reduce memory
    config.module.rules = config.module.rules.filter(rule => {
      // Keep only essential rules
      return rule.test && (
        rule.test.toString().includes('tsx?') ||
        rule.test.toString().includes('jsx?') ||
        rule.test.toString().includes('css')
      );
    });

    return config;
  },
};

export default nextConfig;
