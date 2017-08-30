const path = require("path");
const webpack = require("webpack");
const node_modules = path.resolve(__dirname, "node_modules");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const env = process.env.NODE_ENV;
let cssrule = null

const extractPlugin = new ExtractTextPlugin({
  filename: "[name].[chunkhash].css",
  ignoreOrder: true, //禁用顺序检查
  allChunks: true
});

// 开发环境 不分离css文件
const dev_cssRule = [
  {
    test: /\.css$/,
    include: path.resolve(__dirname, "src"),
    use: [
      "style-loader",
      {
        loader: "css-loader",
        options: {
          modules: true,
          localIdentName: "[path][name]_[local]--[hash:base64:5]",
          sourceMap: true
        }
      },
      { loader:"postcss-loader", options: { sourceMap: true } },
    ]
  }
]

// 开发环境 分离css文件
const prod_cssRule = [
  {
    test: /\.css$/,
    include: path.resolve(__dirname, "src"),
    use: extractPlugin.extract({
      use: [
        {
          loader: "css-loader",
          options: {
            modules: true,
            localIdentName: "[path][name]_[local]--[hash:base64:5]",
            sourceMap: true
          }
        },
        { loader: "postcss-loader" },
      ],
      fallback: "style-loader"
    })
  },
]

env === "development" ? (cssrule = dev_cssRule) : (cssrule = prod_cssRule)

const baseConfig = {
  resolve: { 
    extensions: [".css", ".jsx", ".js", ".json"]
  },
  module: {
    rules: [
      ...cssrule,
      {
        loader: "eslint-loader",
        test: /\.(js|jsx)$/,
        enforce: "pre",
        exclude: /node_modules/,
        options: {
          emitWarning: true
        }
      },
      {
        test: /\.(js|jsx)$/,
        include: path.resolve(__dirname, "./src"),
        use: {
          loader: "babel-loader?cacheDirectory=true",
        }
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        exclude: /favicon\.png$/,
        use: [{
          loader: 'url-loader',
          options: {
              limit: 8192
          }
        }]
      },
      {
        test: /\.(eot|ttf|woff|woff2|svg|svgz)$/,
        use: [{
          loader: 'url-loader',
          options: {
              limit: 8192
          }
        }]
      },
      {
        test: /\.svg$/,
        loader: "svg-inline-loader?classPrefix"
      },
      {
        test: /\.json?$/,
        loader: "json-loader"
      }
    ]
  }
}

module.exports = {
  baseConfig,
  extractPlugin
};
