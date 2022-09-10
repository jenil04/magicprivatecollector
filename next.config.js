module.exports = {
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true, //@TODO we need to check on this
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*'
      },
      {
        protocol: 'http',
        hostname: '*'
      },
    ],
  },
}
