/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimize for Amplify build environment
  output: "standalone",
  experimental: {
    // Reduce memory usage during build
    optimizePackageImports: ["@aws-amplify/ui-react", "react-icons"],
  },
  // Disable source maps in production to reduce memory usage
  productionBrowserSourceMaps: false,
  // Optimize webpack configuration
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // Reduce memory usage during build
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: "all",
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: "vendors",
              chunks: "all",
            },
          },
        },
      };
    }
    return config;
  },
};

export default nextConfig;
