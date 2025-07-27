/** @type {import('next').NextConfig} */
const nextConfig = {
  // Emergency ultra-minimal config
  distDir: '.next',
  
  // Disable everything possible
  telemetry: false,
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
  
  // Minimal experimental features
  experimental: {
    workerThreads: false,
    cpus: 1,
    outputFileTracing: false,
    outputFileTracingRoot: false,
    esmExternals: false,
  },
  
  // No webpack customization to avoid memory overhead
  webpack: (config) => {
    // Absolute minimum changes
    config.parallelism = 1;
    config.cache = false;
    return config;
  },
};

export default nextConfig;