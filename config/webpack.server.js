const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const DIST_PATH = path.resolve(__dirname, '../dist')
const SRC_PATH = path.resolve(__dirname, '../src')

module.exports = {
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
  resolve: {
    symlinks: false,
    extensions: ['.js', '.jsx', 'json'],
    alias: {
      '@src': SRC_PATH,
      '@pages': path.resolve(SRC_PATH, 'pages'),
      '@modules': path.resolve(SRC_PATH, 'modules'),
      '@utils': path.resolve(SRC_PATH, 'utils'),
      '@components': path.resolve(SRC_PATH, 'components'),
      '@assets': path.resolve(SRC_PATH, 'assets'),
      '@styles': path.resolve(SRC_PATH, 'styles'),
    },
  },
}