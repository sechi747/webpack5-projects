const path = require('node:path')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: './src/main.js',

  output: {
    filename: 'assets/js/[name].[contenthash:6].js',
    path: path.resolve(__dirname, './dist'),
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ['vue-loader'],
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
            ],
          },
        },
      },
      {
        test: /\.ts$/,
        use: {
          loader: 'ts-loader',
          options: {
            // https://github.com/TypeStrong/ts-loader#appendtssuffixto
            appendTsSuffixTo: [/\.vue$/],
          },
        },
      },
      {
        test: /\.css$/i,
        use: [
          (process.env.NODE_ENV === 'development'
            ? 'style-loader'
            : MiniCssExtractPlugin.loader),
          'css-loader',
        ],
      },
      {
        test: /\.s[a|c]ss$/,
        use: [
          (process.env.NODE_ENV === 'development'
            ? 'style-loader'
            : MiniCssExtractPlugin.loader),
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      title: 'webpack-vue',
      template: './public/index.html',
    }),
  ],

  devServer: {
    hot: true,
    open: true,
    port: '3030',
  },
}
