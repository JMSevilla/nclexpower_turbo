const withTM = require("next-transpile-modules")(["@repo/ui", "@repo/utils"]);

module.exports = withTM({
  reactStrictMode: true,
  output: "standalone",
  staticPageGenerationTimeout: 120,
  images: {
    domains: ["media.discordapp.net"], // add your image domains here
  },
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "/",
      },
    ];
  },
});
