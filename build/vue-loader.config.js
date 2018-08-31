module.exports = (isDev) => {
  return {
    preserveWhitespace: true, // 删除HTML中多余空格
    extractCSS: !isDev // 将vue文件中的css样式单独打包出来
    // cssModules: {
    //   localIdentName: '[path]-[name]-[hash:base64:5]',
    //   camelCase: true
    // }
  }
}
