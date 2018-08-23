const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const autoprefixer = require("autoprefixer");
const webpack = require("webpack");
const path = require('path');

const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
  entry: './src/app.js',
  output: {
    filename: 'assets/js/cookie_banner.js',
    path: path.resolve(__dirname,'./dist'),
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: function() {
                return [autoprefixer("last 2 versions", "ie 11")];
              },
              sourceMap: true
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ],
        exclude: /\.(.idea|node_modules)/
      },
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["env", { targets: { browsers: ["last 2 versions", "ie 11"] } }]]
          }
        },
        exclude: /\.(.idea|node_modules)/
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'assets/css/styles.css',
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
    }),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    port: 8090,
    hot: true,
    open: true
  }
};