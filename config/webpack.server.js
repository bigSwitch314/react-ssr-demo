const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const nodeExternals = require('webpack-node-externals') // 保持node中require的引用方式

const DIST_PATH = path.resolve(__dirname, '../dist')

module.exports = {
  target:'node',
  mode:'development',
  entry:'./server/app.js',
  output: {
    filename:'bundle.js',
    path: DIST_PATH,
  },
  externals: [nodeExternals()],
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
    // alias: {
    //   '@': SRC_PATH,
    //   pages: path.resolve(SRC_PATH, 'pages'),
    //   store: path.resolve(SRC_PATH, 'store'),
    //   images: path.resolve(SRC_PATH, 'assets/images'),
    //   styles: path.resolve(SRC_PATH, 'styles'),
    //   commponents: path.resolve(SRC_PATH, 'commponents'),
    //   modules: path.resolve(SRC_PATH, 'modules'),
    //   utils: path.resolve(SRC_PATH, 'utils'),
    // },
  },
}