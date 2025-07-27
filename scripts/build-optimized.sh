#!/bin/bash

# Memory-optimized build script for Amplify (using only supported Node options)
set -e

echo "Starting memory-optimized build..."

# Set memory limits (only supported options)
export NODE_OPTIONS="--max-old-space-size=8192"
export NEXT_TELEMETRY_DISABLED=1
export DISABLE_ESLINT_PLUGIN=true
export NEXT_CACHE_DISABLED=1
export GENERATE_SOURCEMAP=false

# Clean up any existing build artifacts
rm -rf .next
rm -rf out

# Run the build with memory monitoring
echo "Available memory before build:"
free -h || echo "Memory info not available"

# Build with reduced parallelism
pnpm run build:amplify-safe

echo "Build completed successfully!"