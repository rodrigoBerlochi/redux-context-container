'use strict';

const webpack = require('webpack');
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "redux-context-container.js",
    library: "reduxContextContainer",
    libraryTarget: "commonjs2"
  },
  externals: {
    react: {
      commonjs: "react",
      commonjs2: "react",
      amd: "react",
      root: "React"
    },
    "react-redux": {
      commonjs: "react-redux",
      commonjs2: "react-redux",
      amd: "react-redux",
      root: "ReactRedux"
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/react"]
          }
        }
      }
    ]
  }
};
