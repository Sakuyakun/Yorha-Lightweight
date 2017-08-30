const path = require("path");
const webpack = require("webpack");
const { baseConfig, extractPlugin } = require("./webpack.config.js");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const Clean = require("clean-webpack-plugin");

const HTML_TEMPLATE = "./src/template/index.html"

const ROOT_PATH = path.resolve(__dirname)
const APP_PATH = path.resolve(ROOT_PATH, 'src/entry')
const BUILD_PATH = path.resolve(ROOT_PATH, "dist")

const prodConfig = {
  entry: {
    app: APP_PATH
  },
  output: {
    path: BUILD_PATH,
    filename: "[name].[chunkhash].js",
    chunkFilename: "[name].[chunkhash].js"
  },
  plugins: [
    extractPlugin,
    new Clean(path.resolve(__dirname, "dist")),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new HtmlWebpackPlugin({
      template: HTML_TEMPLATE,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    new UglifyJSPlugin({
      compress: {
        warnings: false,
        drop_console: true,
        pure_funcs: ['console.log']
      },
      beautify: false,
      sourceMap: false
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: module => {
        return module.resource && /node_modules/.test(module.resource)
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'client',
      async: 'chunk-vendor',
      children: true,
      minChunks: (module, count) => {
        return count >= 3
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "runtime",
      minChunks: Infinity
    })
  ]
};

module.exports = Object.assign(baseConfig, prodConfig);
