const path = require('path')
const SRC_PATH = path.resolve(__dirname, '../src')

module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: {
          loader: 'url-loader',
          options: { limit: 3*1024 }, // 大于等于3k图片，进行Base64处理
        },
      },
      // {
      //   test: /\.(jpe?g|png|gif|svg)$/,
      //   loader: 'image-webpack-loader',
      //   enforce: 'pre', // 这会应用该 loader，在其它之前
      // },
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