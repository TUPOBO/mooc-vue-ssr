const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const ExtractPlugin = require('extract-text-webpack-plugin')
const SizePlugin = require('size-plugin') // 打印webpack打包文件大小并显示再次编译时文件的大小变化
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')

const isDev = process.env.NODE_ENV === 'development'
const defaultPlugin = [
  new VueLoaderPlugin(),
  // 优化vue、react等框架的打包，开发时会有相关信息提示,打包时并不需要这些信息
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: isDev ? '"development"' : '"production"'
    }
  }),
  new HTMLPlugin(),
  new SizePlugin()
]
const devServer = {
  port: 9321,
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
if (isDev) {
  config = merge(baseConfig, {
    // source-map 代码映射 便于调试 但是代码量大 运行缓慢
    // eval 代码格式不美观
    devtool: '#@cheap-module-eval-source-map',
    module: {
      rules: [
        {
          test: /\.styl/,
          use: [
            'style-loader',
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
    plugins: defaultPlugin.concat([
      new webpack.HotModuleReplacementPlugin(), // 热更新插件
      new webpack.NoEmitOnErrorsPlugin() // 减少不需要的信息展示
    ])
  })
} else {
  config = merge(baseConfig, {
    entry: {
      app: path.join(__dirname, '../client/index.js')
    },
    output: {
      filename: '[name].[contentHash:8].js'
    },
    module: {
      rules: [
        {
          test: /\.styl/,
          use: ExtractPlugin.extract({
            fallback: 'style-loader',
            use: [
              'css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true // 直接利用stylus-loader生成的sourceMap，提高编译效率
                }
              },
              'stylus-loader'
            ]
          })
        }
      ]
    },
    optimization: {
      splitChunks: {
        chunks: 'all'
      },
      runtimeChunk: true
    },
    plugins: defaultPlugin.concat([
      new ExtractPlugin('styles.[chunkhash:8].css')
    ])
  })
}

module.exports = config
