/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['multihashes'],
  compiler: {
    styledComponents: true,
    reactRemoveProperties: true,
    // removeConsole: {
    //   exclude: ['error'],
    // },
  }
}

module.exports = nextConfig
