/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true
  },
  // Disable Turbopack
  experimental: {
    turbo: undefined
  }
}

module.exports = nextConfig