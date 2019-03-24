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
      commonjs: "React",
      commonjs2: "React",
      amd: "React",
      root: "_"
    },
    "react-redux": {
      commonjs: "react-redux",
      commonjs2: "react-redux",
      amd: "react-redux",
      root: "_"
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
