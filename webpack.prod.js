const path = require('path')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(common, {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.[contenthash].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Ordering',
      template: './src/index.html'
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      maxSize: 2500000
    }
  }
})
