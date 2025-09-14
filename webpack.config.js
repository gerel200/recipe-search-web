const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: 'development',
  entry: './src/js/index.js',
  output: {
    filename: 'js/main.js',
    path: path.resolve(__dirname, 'docs'),
  },
  plugins: [
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: "src/index.html",
      }),
    ],
    devtool: "inline-source-map",
    devServer: {
    static: './docs',
  },
  module: {
  rules: [
    {
      test: /\.(?:js|mjs|cjs)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          targets: "defaults",
          presets: [
            ['@babel/preset-env']
          ]
        }
      }
    }
  ]
}
};