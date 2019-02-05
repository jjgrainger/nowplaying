const path = require('path');

module.exports = {
  entry: './src/index.js',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './public',
    port: 8080
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.min.js',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ],
      }
    ],
  }
};
