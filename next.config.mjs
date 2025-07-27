import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimize for Amplify build environment
  output: "standalone",
  // Disable telemetry
  telemetry: false,
  // Disable source maps in production to reduce memory usage
  productionBrowserSourceMaps: false,
  // Disable experimental features
  experimental: {
    // Disable features that consume memory
    optimizeCss: false,
    optimizePackageImports: [],
  },
  // Optimize webpack configuration for memory
  webpack: (config, { dev, isServer }) => {
    // Add path alias resolution
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "src"),
    };

    // Reduce memory usage in all environments
    config.optimization = {
      ...config.optimization,
      // Disable some optimizations to save memory
      minimize: !dev,
      minimizer: config.optimization.minimizer || [],
      splitChunks: {
        chunks: "all",
        maxSize: 100000, // Smaller chunks
        cacheGroups: {
          default: false,
          vendors: false,
          vendor: {
            name: "vendor",
            chunks: "all",
            test: /[\\/]node_modules[\\/]/,
            priority: 20,
            maxSize: 100000,
          },
        },
      },
    };

    // Reduce memory usage during build
    config.watchOptions = {
      poll: false,
      ignored: /node_modules/,
    };
    return config;
  },
};

export default nextConfig;
