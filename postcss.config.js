const autoprefixer = require('autoprefixer')

// css后处理 css编译完成后优化
module.exports = {
  plugins: [
    autoprefixer() // 自动添加浏览器前缀
  ]
}
