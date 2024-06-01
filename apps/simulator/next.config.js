const withTM = require("next-transpile-modules")(["@repo/core-library"]);

module.exports = withTM({
  reactStrictMode: true,
  output: "standalone",
  staticPageGenerationTimeout: 120,
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "/",
      },
    ];
  },
});
