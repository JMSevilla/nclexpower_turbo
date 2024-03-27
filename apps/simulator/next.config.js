const withTM = require('next-transpile-modules')(['@repo/ui'])

module.exports = withTM({
    reactStrictMode: true,
    output: "standalone",
    staticPageGenerationTimeout: 120,
    async rewrites() {
      return [
        {
          source: '/:path*',
          destination: '/',
        },
      ];
    },
});