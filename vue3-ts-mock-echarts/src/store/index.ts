import { createPinia } from 'pinia'
import { App } from 'vue'
import useUserStore from './login/Login'

export const pinia = createPinia()
export function registerStore(app: App<Element>) {
  app.use(pinia)
  const userStore = useUserStore()
  userStore.loadLocalCache()
}
