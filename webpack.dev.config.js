const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const { baseConfig } = require("./webpack.config.js");
const publicPath = "http://localhost:4004/";

const ROOT_PATH = path.resolve(__dirname)
const APP_PATH = path.resolve(ROOT_PATH, 'src')
const BUILD_PATH = path.resolve(ROOT_PATH, "dist")

const devConfig = {
  devtool: "inline-source-map",
  entry: [
    "react-hot-loader/patch",
    "webpack-dev-server/client?" + publicPath,
    "webpack/hot/only-dev-server",
    "./src/entry"
  ],
  output: {
    path: BUILD_PATH,
    filename: "hotbundle.js",
    publicPath: "/"
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
  devServer: {
    host: "localhost",
    port: 4004,
    historyApiFallback: true,
    hot: true,
    overlay: {
      errors: true,
      warnings: true
    }
  }
};

module.exports = Object.assign(baseConfig, devConfig);
