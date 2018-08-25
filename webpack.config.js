const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const isDev = process.env.NODE_ENV === 'development'

const config = {
  target: 'web',
  mode: process.env.NODE_ENV,
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.styl/,
        use: [
          'style-loader',
          'css-loader',
          'stylus-loader'
        ]
      },
      {
        test: /\.(gif|jpg|png|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              // 小于该数值的图片才会进行转换
              limit: 1024,
              name: '[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    // 优化vue、react等框架的打包，开发时会有相关信息提示,打包时并不需要这些信息
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isDev ? '"development"' : '"production"'
      }
    }),
    new HTMLPlugin()
  ]
}

// 开发环境配置
if (isDev) {
  // source-map 代码映射 便于调试 但是代码量大 运行缓慢
  // eval 代码格式不美观
  config.devtool = '#cheap-module-eval-source-map' // 官方推荐配置
  config.devServer = {
    port: 8000,
    host: '0.0.0.0', // 可通过内网IP访问（别人的电脑也可访问）
    overlay: {
      error: true // 将webpack错误显示在浏览器中
    },
    open: true, // 每次运行开发环境都自动打开网页
    // historyFallback: {  // 未设置的路由重定向为入口index.html文件

    // }
    hot: true // 启用热更新，只更新更改的组件
  }
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(), // 热更新插件
    new webpack.NoEmitOnErrorsPlugin() // 减少不需要的信息展示
  )
}

module.exports = config
