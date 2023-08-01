const path = require('path');
var webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = env => {
  return {
    plugins: [
      new MiniCssExtractPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        template: "./src/index.html",
      }),
    ],
    entry: [
      path.resolve(__dirname, 'src', 'index.js')
    ],
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.js",
    },
    resolve: {
      modules: [__dirname, "src", "node_modules"],
      extensions: ["*", ".js", ".jsx", ".tsx", ".ts"],
    },
    module: {
      rules: [
        {
          test: /\.(jsx|js)$/,
          include: path.resolve(__dirname, 'src'),
          exclude: /node_modules/,
          use: [{
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', {
                  "targets": "defaults"
                }],
                '@babel/preset-react'
              ]
            }
          }]
        },

        {
          test: /.s?css$/,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
        {
          test: /\.png|svg|jpg|gif$/,
          use: ["file-loader"],
        },
      ],
    },
    mode: "development",
    devServer: {
      port: 3000,
      static: {
        directory: path.join(__dirname, 'public'),
      },
      compress: true,
    },
    optimization: {
      minimize: true,
      minimizer: [
        new CssMinimizerPlugin({
          test: /\.foo\.css$/i,
        }),
      ],
    }
  };
}