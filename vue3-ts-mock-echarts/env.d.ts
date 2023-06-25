/// <reference types="vite/client" />
// 声明所有组件
// 表示从.vue都是src下的，且都是string类型的
declare module '*.vue' {
  // 引入组件类型
  import { DefineComponent } from 'vue'
  const component: DefineComponent
  export default component
}
declare module '*.mjs' {}
