#!/bin/bash

# Ultra memory-optimized build script for Amplify
set -e

echo "Starting memory-optimized build..."

# Set extreme memory limits
export NODE_OPTIONS="--max-old-space-size=8192 --optimize-for-size --gc-interval=50 --max-semi-space-size=128"
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
pnpm run build:ultra-safe

echo "Build completed successfully!"