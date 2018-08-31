const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const SizePlugin = require('size-plugin') // 打印webpack打包文件大小并显示再次编译时文件的大小变化
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')

const defaultPlugin = [
  new VueLoaderPlugin(),
  // 优化vue、react等框架的打包，开发时会有相关信息提示,打包时并不需要这些信息
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"development"'
    }
  }),
  new HTMLPlugin({
    template: path.join(__dirname, '../practice/template.html')
  }
  ),
  new SizePlugin()
]
const devServer = {
  port: 8321,
  host: '0.0.0.0', // 可通过内网IP访问（别人的电脑也可访问）
  overlay: {
    error: true // 将webpack错误显示在浏览器中
  },
  open: false, // 每次运行开发环境都自动打开网页
  // historyFallback: {  // 未设置的路由重定向为入口index.html文件

  // }
  hot: true // 启用热更新，只更新更改的组件
}
let config

// 开发环境配置
config = merge(baseConfig, {
  // source-map 代码映射 便于调试 但是代码量大 运行缓慢
  // eval 代码格式不美观
  devtool: '#@cheap-module-eval-source-map',
  entry: path.join(__dirname, '../practice/index.js'),
  module: {
    rules: [
      {
        test: /\.styl/,
        use: [
          'vue-style-loader', // vue文件中css热更新
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true // 直接利用stylus-loader生成的sourceMap，提高编译效率
            }
          },
          'stylus-loader'
        ]
      }
    ]
  },
  devServer,
  // 更改import vue 的路径，可以在new Vue({})中使用template
  resolve: {
    alias: {
      'vue': path.join(__dirname, '../node_modules/vue/dist/vue.esm.js')
    }
  },
  plugins: defaultPlugin.concat([
    new webpack.HotModuleReplacementPlugin() // 热更新插件
  ])
})

module.exports = config
