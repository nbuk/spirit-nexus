import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  sassOptions: {
    loadPaths: [path.join(__dirname, 'src')],
    additionalData: `
      @use "app/styles/breakpoints" as *;
    `,
  },
};

export default nextConfig;
