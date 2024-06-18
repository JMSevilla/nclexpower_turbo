/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  transpilePackages: ['core-library'],
  basePath: '',
  eslint: {
    ignoreDuringBuilds: true,
  },
  publicRuntimeConfig: {
    processEnv: {
      ...Object.fromEntries(Object.entries(process.env).filter(([key]) => key.includes('NEXT_PRIVATE_'))),
    },
  },
  webpack: config => {
    config.module.rules.unshift({
      test: /pdf\.worker\.(min\.)?js/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[contenthash].[ext]',
            publicPath: '_next/static/worker',
            outputPath: 'static/worker',
          },
        },
      ],
    });

    return config;
  },
};
