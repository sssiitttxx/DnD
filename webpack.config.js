const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true,
    // publicPath: '/trello/', <--- ЛОКАЛЬНО КОММЕНТИРУЕМ, ВЕРНЕМ ПЕРЕД ДЕПЛОЕМ
  },
  
  // ✅ ОДИН БЛОК DEVSERVER ДЛЯ ВСЕГО
  devServer: {
    static: './dist',
    port: 3000,
    open: true,
    hot: true,
    historyApiFallback: true, 
  },

  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, use: 'babel-loader' },
      { test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader'] },
      { test: /\.(png|jpe?g|gif|svg)$/i, type: 'asset/resource' },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    new MiniCssExtractPlugin(),
  ],
};