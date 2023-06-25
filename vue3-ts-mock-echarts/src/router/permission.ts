// 路由鉴权，判断某个路由能不能被访问的权限设置
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import router from './index'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { pinia } from '@/store'
import useUserStore from '@/store/login/Login'
const userStore = useUserStore(pinia)
NProgress.configure({
  easing: 'ease', // 动画方式
  speed: 1000, // 递增进度条的速度
  showSpinner: false, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3, // 更改启动时使用的最小百分比
  parent: 'body', //指定进度条的父容器
})
// 添加路由守卫
// 实现访问路由就有进度条的显示，使用插件 nprogress
router.beforeEach(
  async (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext,
  ) => {
    let token = userStore.token
    if (token) {
      if (to.path !== '/login') {
        // 获取到用户信息之后才进入首页
        try {
          await userStore.getUserInfo()
          next()
        } catch (error) {
          await userStore.userLoginOut()
          next('/login')
        }
      } else {
        next()
      }
    } else {
      if (to.path == '/login') {
        next()
      } else {
        next({ path: '/login' })
      }
    }
    NProgress.start()
  },
)
// 后置守卫
router.afterEach((to, from) => {
  NProgress.done()
})
