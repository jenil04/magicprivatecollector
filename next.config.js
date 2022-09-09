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
// This is the more useful implementation as it takes wildcards and is more global but I believe we are a version behind or something
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