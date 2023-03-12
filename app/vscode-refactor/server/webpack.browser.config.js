/* eslint-disable @typescript-eslint/no-var-requires */

"use strict";

const path = require("path");
const webpack = require("webpack");

module.exports = {
  mode: "none",
  target: "webworker",
  entry: {
    browserServerMain: "./src/browserServerMain.ts",
  },
  resolve: {
    mainFields: ["module", "main"],
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
    filename: "server-browser.js",
    libraryTarget: "var",
    library: "serverExportVar",
  },
  devtool: "source-map",
};
