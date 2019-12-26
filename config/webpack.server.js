const path = require('path')
const merge = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const baseConfig = require('./webpack.base.js')
const DIST_PATH = path.resolve(__dirname, '../dist')
const SRC_PATH = path.resolve(__dirname, '../src')

const config = {
  target: 'node',
  mode: 'development',
  entry: './server/app.js',
  output: {
    filename: 'server.js',
    path: DIST_PATH,
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['server.js'],
    }),
  ],
  externals: {
    uws: 'uws',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(css|less)$/,
        use: [
          'isomorphic-style-loader',
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
          },
        ],
      },
    ],
  },
}

module.exports = merge(baseConfig, config)