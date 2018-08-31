import Vue from 'vue'

const app = new Vue({
  // el: '#root',
  template: '<div ref="div">{{text}}</div>',
  data: {
    text: 0,
    obj: {}
  },
  // 监听属性变化且会自动注销
  watch: {
    text (newText, oldText) {
      console.log(`${newText}:${oldText}`)
    }
  }
})

app.$mount('#root')

setInterval(() => {
  app.text += 1 // 可修改text的值
  // app.$options.data += 1 // 不可修改text的值
  // app.$data.text += 1 // 可修改text的值
}, 1000)

// console.log('====================================')
// console.log(app.$data)
// console.log('====================================')

// console.log('====================================')
// console.log(app.$props)
// console.log('====================================')

// console.log('====================================')
// console.log(app.$el)
// console.log('====================================')

// console.log('====================================')
// console.log(app.$options)
// console.log('====================================')

// console.log('====================================')
// console.log(app.$root, app.$root === app)
// console.log('====================================')

// // 插槽
// console.log('====================================')
// console.log(app.$slots)
// console.log(app.$scopedSlots)
// console.log('====================================')

// console.log('====================================')
// console.log(app.$children) // 组件中用的多
// console.log('====================================')

// console.log('====================================')
// console.log(app.$refs)
// console.log('====================================')

// // 服务端渲染时才用
// console.log('====================================')
// console.log(app.$isServer)
// console.log('====================================')

// // 页面再次渲染时才起作用
// app.$options.render = (h) => {
//   return h('div', {}, 'new render function')
// }

// 监听属性 但不会自动注销
// app.$watch('text', (newText, oldText) => {
//   console.log(`${newText}:${oldText}`)
// })

// 注销watch
// const unWatch = app.$watch('text', (newText, oldText) => {
//   console.log(`${newText}:${oldText}`)
// })
// unWatch() // 调用即注销

// 事件绑定 app.$once()-- 只触发一次
app.$on('test', (a, b) => {
  console.log(`test emited ${a} ${b}`)
})
// 事件触发 不冒泡 只能监听该对象
app.$emit('test', 1, 2)

// 强制重新渲染组件
app.$forceUpdate()

// 给data中未声明的变量复制
app.$set(app.obj, 'a', 1)
// 删除
app.$delete()
