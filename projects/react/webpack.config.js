const path = require('node:path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: './src/index.js',

  output: {
    filename: '[name].[contenthash:6].js',
    path: path.resolve(__dirname, './dist'),
    clean: true,
  },

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },

  module: {
    rules: [
      {
        test: /\.ts|tsx$/,
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-typescript',
            ['@babel/preset-react',
              {
                runtime: 'automatic',
              },
            ],
          ],
        },
      },
      {
        // 需要同时配置js和jsx，单独配置js会报错：Support for the experimental syntax 'jsx' isn't currently enabled
        test: /.(js|jsx)$/,
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env',
            // 设置runtime为automatic后可以自动导入jsx transform https://babeljs.io/docs/babel-preset-react#runtime
            ['@babel/preset-react', { runtime: 'automatic' }],
          ],
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
        test: /\.s(a|c)ss$/i,
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
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      title: 'webpack-react',
      template: './public/index.html',
    }),
  ],

  devServer: {
    hot: true,
    open: true,
  },
}
