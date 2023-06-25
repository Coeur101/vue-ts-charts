// 对外暴露一个插件对象
import { App, Component } from 'vue'
import svgIconVue from './svg-icon/svg-icon.vue'
interface AllComponents {
  [name: string]: Component // for vue3 use, you can use any for vue2 use. 这里面包含了一些不同的组件/元素，可以直接使用不同的样式或格式。也可以使用组件，比如av-icon，展示不同于盒子盒子的区别。也可以使用组件，比如av-icon，展示不同于盒子盒子的区别。  ...etc 这些组件都是通过Named组件库
}
const allComponents: AllComponents = { 'svg-icon': svgIconVue }

export default {
  install(app: App<Element>) {
    Object.keys(allComponents).map((key) => {
      app.component(key, allComponents[key])
    })
  },
}
