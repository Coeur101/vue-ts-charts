import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/Login.vue'),
    meta: {
      title: '登录',
      routeHidden: true,
    },
  },
  {
    path: '/',
    name: 'Layout',
    redirect: 'home',
    component: () => import('@/components/lay-out/lay-out.vue'),
    meta: {
      title: '',
      routeHidden: true,
    },
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home/home.vue'), //页面根目录页面的展示页面。页
        meta: {
          title: '首页',
          routeHidden: false,
          icon: 'HomeFilled',
        },
      },
    ],
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404/404.vue'),
    meta: {
      title: '404',
      routeHidden: true,
    },
  },
  {
    path: '/screen',
    name: 'Screen',
    component: () => import('@/views/screen/screen.vue'),
    meta: {
      title: '数据大屏',
      routeHidden: false,
      icon: 'DataBoard',
    },
  },
  {
    path: '/acl',
    name: 'Acl',
    redirect: 'user',
    component: () => import('@/components/lay-out/lay-out.vue'),
    meta: {
      title: '权限管理',
      routeHidden: false,
      icon: 'Lock',
    },
    children: [
      {
        path: '/acl/user',
        name: 'User',
        component: () => import('@/views/acl/user/user.vue'),
        meta: {
          title: '用户管理',
          routeHidden: false,
          icon: 'User',
        },
      },
      {
        path: '/acl/role',
        name: 'Role',
        component: () => import('@/views/acl/role/role.vue'),
        meta: {
          title: '角色管理',
          routeHidden: false,
          icon: 'UserFilled',
        },
      },
      {
        path: '/acl/permission',
        name: 'Permission',
        component: () => import('@/views/acl/permission/permission.vue'),
        meta: {
          title: '菜单管理',
          routeHidden: false,
          icon: 'Briefcase',
        },
      },
    ],
  },
  {
    path: '/product',
    name: 'Product',
    component: () => import('@/components/lay-out/lay-out.vue'),
    redirect: 'attr',
    meta: {
      title: '商品管理',
      routeHidden: false,
      icon: 'GoodsFilled',
    },
    children: [
      {
        path: '/product/attr',
        name: 'Attr',
        component: () => import('@/views/product/attr/attr.vue'),
        meta: {
          title: '属性管理',
          routeHidden: false,
          icon: 'Postcard',
        },
      },
      {
        path: '/product/trademark',
        name: 'Trademark',
        component: () => import('@/views/product/trademark/trademark.vue'),
        meta: {
          title: '品牌管理',
          routeHidden: false,
          icon: 'ShoppingCartFull',
        },
      },
      {
        path: '/product/sku',
        name: 'Sku',
        component: () => import('@/views/product/sku/sku.vue'),
        meta: {
          title: 'sku管理',
          routeHidden: false,
          icon: 'SetUp',
        },
      },
      {
        path: '/product/spu',
        name: 'Spu',
        component: () => import('@/views/product/spu/spu.vue'),
        meta: {
          title: 'spu管理',
          routeHidden: false,
          icon: 'SetUp',
        },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'any',
    redirect: '/404',
    meta: {
      title: '任意',
      routeHidden: true,
    },
  },
]

export default routes
