/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimize for Amplify build environment
  output: "export",
  trailingSlash: true,
  // Disable telemetry
  telemetry: false,
  // Disable source maps in production to reduce memory usage
  productionBrowserSourceMaps: false,
  // Optimize webpack configuration
  webpack: (config, { dev, isServer }) => {
    // Add path alias resolution
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": require("path").resolve(__dirname, "src"),
    };

    if (!dev && !isServer) {
      // Reduce memory usage during build
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: "all",
          maxSize: 244000,
          cacheGroups: {
            default: false,
            vendors: false,
            vendor: {
              name: "vendor",
              chunks: "all",
              test: /[\\/]node_modules[\\/]/,
              priority: 20,
            },
            common: {
              name: "common",
              minChunks: 2,
              chunks: "all",
              priority: 10,
              reuseExistingChunk: true,
              enforce: true,
            },
          },
        },
      };
    }
    return config;
  },
};

export default nextConfig;
