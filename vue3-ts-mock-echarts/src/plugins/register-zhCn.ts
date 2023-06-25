import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import { App } from 'vue'

export const zhComponent = (app: App<Element>) => {
  app.use(ElementPlus, {
    locale: zhCn,
  })
}
