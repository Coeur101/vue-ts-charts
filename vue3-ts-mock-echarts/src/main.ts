import { createApp } from 'vue'
import { registerStore } from '@/store'
import App from './App.vue'
import { zhComponent } from './plugins/register-zhCn'
import 'element-plus/dist/index.css'
import { registerIcons } from './plugins/register-icons'
// 导入引入svg图标的插件
import 'virtual:svg-icons-register'
// 引入路由鉴权文件，使路由守卫至少执行一次
import '@/router/permission'
// 引入自定义插件对象 用于全局注册组件
import globalComponent from '@/components/index'
import '@/styles/index.scss'
import router from './router'

const app = createApp(App)

app.use(registerStore)
app.use(globalComponent)
app.use(registerIcons)
app.use(router)
app.use(zhComponent)
app.mount('#app')
