const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.plugins.push(
        new CopyWebpackPlugin({
          patterns: [
            {
              from: path.resolve(__dirname, "src/assets/fonts"),
              to: path.resolve(__dirname, ".next/static/fonts"),
            },
          ],
        })
      );
    }
    return config;
  },
};

module.exports = nextConfig;
