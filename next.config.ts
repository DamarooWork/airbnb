import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/search',
        permanent: true,
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'i.pinimg.com',
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
      {
        protocol: 'https',
        hostname: 'dummyimage.com',
      },
    ],
  },
}
export default nextConfig
