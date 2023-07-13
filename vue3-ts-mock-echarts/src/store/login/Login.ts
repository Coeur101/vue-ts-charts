import { reqLogin, reqUserInfo } from '@/api/user/user.ts'
import { LOGIN_INFO } from '@/api/user/type'
import { defineStore } from 'pinia'
import router from '@/router/index'
import { ElNotification } from 'element-plus'
import type { USER_STATE } from './types/type'
import localCache from '@/utils/cache'
import { getTimeMessage } from '@/utils/getHourMessage'
// 引入常量路由
import routes from '@/router/routes'
import { reqLogOut } from '@/api/user/user'
let useUserStore = defineStore('userStore', {
  state: () =>
    <USER_STATE>{
      token: '',
      // 存储所有的配置过的路由，通过路由递归菜单
      menuRoutes: routes,
      userInfo: null,
    },
  // 处理异步
  actions: {
    async postUserLogin(data: LOGIN_INFO) {
      try {
        const result = await reqLogin(data)
        if (result) {
          this.token = result.data
          localCache.setCache('TOKEN', result.data)
          ElNotification({
            type: 'success',
            title: `HI,${getTimeMessage()}`,
            message: '欢迎回来',
          })
          router.push('/')
        }
      } catch (error) {}
    },
    async getUserInfo() {
      const result = await reqUserInfo()
      if (result) {
        this.userInfo = result.data
        localCache.setCache('USER_INFO', result.data)
      } else {
        return Promise.reject(new Error('获取失败'))
      }
    },
    // 退出登录业务
    async userLoginOut() {
      const result = await reqLogOut()
      if (result) {
        // 清除token
        localCache.clearCache()
        this.loadLocalCache()
      } else {
        return Promise.reject(new Error('退出登录失败'))
      }
    },
    loadLocalCache() {
      const token = localCache.getCache('TOKEN')
      const userInfo = localCache.getCache('USER_INFO')
      this.token = token || ''
      this.userInfo = userInfo || ''
    },
  },
})
export default useUserStore
