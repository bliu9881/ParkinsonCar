#!/usr/bin/env node

// Memory monitoring wrapper for Next.js build
const { spawn } = require('child_process');

function formatBytes(bytes) {
  return Math.round(bytes / 1024 / 1024) + 'MB';
}

function logMemoryUsage() {
  const usage = process.memoryUsage();
  console.log(`Memory Usage - RSS: ${formatBytes(usage.rss)}, Heap Used: ${formatBytes(usage.heapUsed)}, Heap Total: ${formatBytes(usage.heapTotal)}`);
}

// Log memory usage every 30 seconds
const memoryInterval = setInterval(logMemoryUsage, 30000);

// Initial memory log
logMemoryUsage();

// Run the actual build command
const buildProcess = spawn('pnpm', ['run', 'build:amplify-safe'], {
  stdio: 'inherit',
  env: {
    ...process.env,
    NODE_OPTIONS: '--max-old-space-size=8192 --expose-gc'
  }
});

buildProcess.on('close', (code) => {
  clearInterval(memoryInterval);
  console.log(`Build process exited with code ${code}`);
  process.exit(code);
});

buildProcess.on('error', (error) => {
  clearInterval(memoryInterval);
  console.error('Build process error:', error);
  process.exit(1);
});