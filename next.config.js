/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // transpilePackages: ['multihashes', '@taikai/dappkit', 'uint8arrays'],
  compiler: {
    styledComponents: true,
    reactRemoveProperties: true,
    // removeConsole: {
    //   exclude: ['error'],
    // },
  }
}

module.exports = nextConfig
