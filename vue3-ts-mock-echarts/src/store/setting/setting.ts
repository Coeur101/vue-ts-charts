import { defineStore } from 'pinia'
// 关于layout组件的公共的属性
let useLayOutSettingStore = defineStore('settingStore', {
  state: () => ({
    fold: false,
    refsh: false, // 用于控制刷新效果
    screen: false,
  }),
  actions: {},
})

export default useLayOutSettingStore
