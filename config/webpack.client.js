const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const DIST_PUBLIC = path.resolve(__dirname, '../public')

module.exports = {
  mode:'development',
  entry:'./index.js',
  output: {
    filename:'index.js',
    path: DIST_PUBLIC,
  },
  plugins: [
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader:'babel-loader',
        exclude: /node_modules/,
      },
    ],
},
  resolve: {
    symlinks: false,
    extensions: ['.js', '.jsx', 'json'],
  },
}