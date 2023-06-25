import { Router, createRouter, createWebHashHistory } from 'vue-router'
import routes from './routes'

const router: Router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
  // 滚动行为
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    }
  },
})
export default router
