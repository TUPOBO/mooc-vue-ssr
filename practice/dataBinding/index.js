import Vue from 'vue'

const app = new Vue({
  // :class="{ active: !isActive}"
  // :class="[isActive ? 'active' : '']"
  template: `
    <div
      :id="aa"
      @click="handleClick"
      :class="[{ active:  isActive }]"
      :style="[styles, styles2]"
    >
      <p>{{isActive ? 'active' : 'not active'}}</p>
      <p>{{arr.join(' ')}}</p>
      <p>{{Date.now()}}</p>
      <p>{{html}}</p>
      <p v-html="html"></p>
    </div>
  `,
  data: {
    isActive: false,
    arr: [1, 2, 3],
    html: `<span>123</span>`,
    aa: 'main',
    styles: {
      color: 'red'
    },
    styles2: {
      color: 'black'
    }
  },
  methods: {
    handleClick () {
      console.log('clicked')
    }
  }
})

app.$mount('#root')
