const path = require('path')
const nodeExternals = require('webpack-node-externals')
module.exports = {
  mode: 'development',
  devtool: 'source-map',
  node: {
    // Need this when working with express, otherwise the build fails
    __dirname: false, // if you don't put this is, __dirname
    __filename: false, // and __filename return blank or /
  },
  entry: {
    server: './app.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  externalsPresets: {node: true},
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  devServer: {
    static: './dist',
    hot: true,
  },
}
