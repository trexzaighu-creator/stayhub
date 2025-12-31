/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: false
  },
  output: 'export',
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || ''
}

module.exports = nextConfig
