import Vue from 'vue'

const app = new Vue({
  // el: '#root',
  template: `<div>{{text}}</div>`,
  data: {
    text: 0
  },
  // 初始化时就执行
  beforeCreate () {
    console.log(this.$el, 'beforeCreate')
  },
  created () {
    console.log(this.$el, 'created')
  },
  // 挂载到dom
  beforeMount () {
    console.log(this.$el, 'beforeMount')
  },
  mounted () {
    console.log(this.$el, 'mounted')
  },
  // 数据更新时
  beforeUpdate () {
    console.log(this, 'beforeUpdate')
  },
  updated () {
    console.log(this, 'updated')
  },
  activated () {
    console.log(this, 'activated')
  },
  deactivated () {
    console.log(this, 'deactivated')
  },
  // 销毁组件
  beforeDestroy () {
    console.log(this, 'beforeDestroy')
  },
  destroyed () {
    console.log(this, 'destroyed')
  }
})

app.$mount('#root')

// setInterval(() => {
//   app.text += 1
// }, 1000)

// setTimeout(() => {
//   app.$destroy() // 解除所有事件绑定和监听
// }, 1000)
