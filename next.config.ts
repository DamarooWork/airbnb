import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '5yv1nx4tqw.ufs.sh',
      },
      {
        protocol: 'https',
        hostname: 'developers.elementor.com',
      },
    ],
  },
}

export default nextConfig
