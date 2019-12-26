const path = require('path')
const merge = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const baseConfig = require('./webpack.base.js')
const DIST_PATH = path.resolve(__dirname, '../dist')
const SRC_PATH = path.resolve(__dirname, '../src')
const CONF_PATH = path.resolve(__dirname, '../config')

const config = {
  target: 'web',
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'client.js',
    path: DIST_PATH,
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['client.js'],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true, // 缓存
            },
          },
          {
            loader: 'eslint-loader',
            options: { // 这里的配置项参数将会被传递到 eslint 的 CLIEngine
              formatter: require('eslint-formatter-friendly'), // 指定错误报告的格式规范
              failOnError: true, // eslint报错，编译失败
              configFile: CONF_PATH + '/.eslintrc.js',
            },
          },
        ],
      },
      {
        test: /\.(css|less)$/,
        use: [
          {
            loader: 'style-loader',
          },
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