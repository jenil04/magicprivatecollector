module.exports = {
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true, //@TODO we need to check on this
    domains: [
      'storage.googleapis.com',
      'lh3.googleusercontent.com',
      'quirklings-metadata.quirkies.io',
      'ipfs.io',
      'metadata.ens.domains',
      'metadata.quirkies.io'
    ],
  },
}


// @TODO 
// This is the more useful implementation but I believe we are a version behind.
// module.exports = {
//   reactStrictMode: true,
//   images: {
//     remotePatterns:
//     {
//       protocol: 'https',
//       hostname: '**.googleusercontent.com'
//     },
//   },
// }