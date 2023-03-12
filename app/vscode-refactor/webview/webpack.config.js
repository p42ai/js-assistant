/* eslint-disable @typescript-eslint/no-var-requires */

"use strict";

const path = require("path");

module.exports = {
  target: "web",
  entry: "./src/webviewMain.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "webview.js",
    library: {
      type: "window",
    },
    devtoolModuleFilenameTemplate: "../[resource-path]",
  },
  devtool: "source-map",
  externals: {
    vscode: "commonjs vscode",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
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
