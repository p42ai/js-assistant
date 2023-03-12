/* eslint-disable @typescript-eslint/no-var-requires */

"use strict";

const path = require("path");

module.exports = {
  target: "node",
  entry: "./src/nodeServerMain.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "server-node.js",
    libraryTarget: "commonjs2",
    devtoolModuleFilenameTemplate: "../[resource-path]",
  },
  devtool: "source-map",
  externals: {
    vscode: "commonjs vscode",
  },
  resolve: {
    extensions: [".ts", ".js"],
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
};
