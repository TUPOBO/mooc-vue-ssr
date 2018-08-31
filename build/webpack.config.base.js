const path = require('path')
const createVueLoaderOptions = require('./vue-loader.config')
const isDev = process.env.NODE_ENV === 'development'

const config = {
  target: 'web',
  mode: process.env.NODE_ENV,
  entry: path.join(__dirname, '../client/index.js'),
  output: {
    filename: 'bundle.[hash:8]js',
    path: path.join(__dirname, '../dist')
  },
  module: {
    rules: [
      {
        test: /\.(vue|js|jsx)/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        enforce: 'pre' // 在vue-loader编译前预处理
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: createVueLoaderOptions(isDev)
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/ // 忽略该文件夹内的文件
      },
      {
        test: /\.(gif|jpg|png|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              // 小于该数值的图片才会进行转换
              limit: 1024,
              name: 'resources/[path][name].[hash:8].[ext]' // 根据开发时的文件夹自动生产单独文件夹
            }
          }
        ]
      }
    ]
  }
}

module.exports = config
