const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const DIST_PATH = path.resolve(__dirname, '../dist')
const SRC_PATH = path.resolve(__dirname, '../src')

module.exports = {
  target: 'web',
  mode:'development',
  entry:'./src/index.js',
  output: {
    filename:'client.js',
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
        loader:'babel-loader',
        exclude: /node_modules/,
      }, 
      {
        test: /\.(css|less)$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'less-loader',
          },
        ],
        include: [
          path.resolve(__dirname, '../src'),
          path.resolve(__dirname, '../node_modules/antd/')
        ],
      },
    ],
},
  resolve: {
    symlinks: false,
    extensions: ['.js', '.jsx', 'json'],
    alias: {
      '@src': SRC_PATH,
      '@pages': path.resolve(SRC_PATH, 'pages'),
      '@utils': path.resolve(SRC_PATH, 'utils'),
      '@components': path.resolve(SRC_PATH, 'components'),
      '@assets': path.resolve(SRC_PATH, 'assets'),
      '@styles': path.resolve(SRC_PATH, 'styles'),
    },
  },
}