const withTM = require('next-transpile-modules')(['core-library']);

module.exports = withTM({
  reactStrictMode: true,
  output: 'standalone',
  staticPageGenerationTimeout: 120,
  images: {
    domains: ['media.discordapp.net'], // add your image domains here
  },
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: '/',
      },
    ];
  },
});
