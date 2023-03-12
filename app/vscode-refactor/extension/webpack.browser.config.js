/* eslint-disable @typescript-eslint/no-var-requires */

"use strict";

const path = require("path");
const webpack = require("webpack");

module.exports = {
  target: "webworker",
  entry: {
    extension: "./src/browserExtensionMain.ts",
  },
  resolve: {
    mainFields: ["browser", "module", "main"],
    extensions: [".ts", ".js"],
    alias: {},
    fallback: {
      assert: require.resolve("assert"),
      buffer: require.resolve("buffer"),
      fs: false,
      path: false,
      stream: false,
    },
    symlinks: false,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: "process/browser", // provide a shim for the global `process` variable
      Buffer: ["buffer", "Buffer"],
    }),
  ],
  externals: {
    vscode: "commonjs vscode",
  },
  performance: {
    hints: false,
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "extension-browser.js",
    libraryTarget: "commonjs",
  },
  devtool: "source-map",
};
