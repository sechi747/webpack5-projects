const path = require('node:path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: './src/index',

  output: {
    filename: '[name].js',
    path: path.join(__dirname, './dist'),
    clean: true, // 删除上次构建的dist
  },

  module: {
    rules: [
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
          // 相比于ts-loader,babel-loader会省略检查ts错误的步骤，所以编译速度会更快
          loader: 'babel-loader',
          // @babel/preset-typescript的作用是吧ts => js(es6) 为了能编译出ts => js(es5)的代码，这里需要额外使用@babel/preset-env
          options: {
            presets: [
              '@babel/preset-typescript',
              '@babel/preset-env',
            ],
          },
        },
      },
      {
        // loader的执行顺序是从左到右，从下到上，可以理解为 style-loader(css-loader(css))
        test: /\.css$/i,
        use: [
          // style-loader和mini-css-extract-plugin的作用都是将css-loader转译后的css代码挂载到html上
          // style-loader是将css代码注入到<style>标签中，缺点是会导致js、css无法并行加载，降低了页面性能，并且会让缓存粒度变大
          // mini-css-extract-plugin则是将css代码抽离到一个单独的css文件中，并通过<link>标签引用。使用时需要搭配html-webpack-plugin
          // 生产环境时应该使用mini-css-extract-plugin来提高应用性能，开发环境使用style-loader来获得良好的热更新体验
          (process.env.NODE_ENV === 'development'
            ? 'style-loader'
            : MiniCssExtractPlugin.loader),
          // css-loader可以把css代码转译为等价的js字符串，但并不会将样式挂载到html上
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
          // postcss-loader是css后处理器，而不是sass/less那样的css预处理器，两者并不冲突
          // postcss可以通过postcss.config.js文件进行配置，比如使用autoprefixer插件来给css样式自动添加前缀（需要提前配置browserslist）
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.ts'],
  },

  plugins: [
    new MiniCssExtractPlugin(),
    new HTMLWebpackPlugin(),
  ],
}
