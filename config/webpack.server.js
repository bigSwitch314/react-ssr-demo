const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const nodeExternals = require('webpack-node-externals') // 保持node中require的引用方式

const DIST_PATH = path.resolve(__dirname, '../dist')

module.exports = {
  target:'node',
  mode:'development',
  entry:'./server/app.js',
  output: {
    filename:'server.js',
    path: DIST_PATH,
  },
  externals: [nodeExternals({
    whitelist: /antd\/lib(\/)*(.)*\/style\/index\.css/

  })],
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['server.js'],
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
          'isomorphic-style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          {
            loader: 'less-loader',
          },
        ],
        include: [
          path.resolve(__dirname, '../src'),
          path.resolve(__dirname, '../node_modules/ant/**')
        ],
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