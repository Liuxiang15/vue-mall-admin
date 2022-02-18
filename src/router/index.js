import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/layout/Home.vue';
import Login from '../views/layout/Login.vue';
import store from '../store/index';
import getMenuRoute from '../utils/permission';

// import Index from '../views/page/index.vue'
Vue.use(VueRouter);
const asyncRouterMap = [
  {
    path: '/product',
    name: 'Product',
    meta: {
      title: '商品',
      icon: 'inbox',
    },
    component: Home,
    children: [
      {
        path: 'list',
        name: 'ProductList',
        meta: {
          title: '商品列表',
          icon: 'unordered-list',
        },
        component: () => import('../views/page/productList.vue'),
      },
      {
        path: 'add',
        name: 'ProductAdd',
        meta: {
          title: '添加商品',
          icon: 'file-add',
        },
        component: () => import('../views/page/productAdd.vue'),
      },
      {
        path: 'edit/:id',
        name: 'ProductEdit',
        meta: {
          title: '编辑商品',
          icon: 'file-add',
          hidden: true,
        },
        component: () => import('@/views/page/productAdd.vue'),
      },
      {
        path: 'category',
        name: 'Category',
        meta: {
          title: '类目管理',
          icon: 'project',
        },
        component: () => import('../views/page/category.vue'),
      },
    ],
  },
];

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/index',
    component: Home,
    meta: {
      title: '首页',
      icon: 'home',
    },
    children: [
      {
        path: 'index',
        name: 'Index',
        meta: {
          title: '统计',
          icon: 'number',
        },
        // component: Index
        // 懒加载
        component: () => import('../views/page/index.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登录',
      hidden: true,
    },
    component: Login,
  },
  // {
  //   path: "/about",
  //   name: "About",
  //   meta: {
  //     title: ""
  //   },
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ "../views/About.vue")
  // }
];

const router = new VueRouter({
  routes,
});
let isAddRoutes = false;
// 路由拦截，实现鉴权
router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    if (store.state.user.appkey && store.state.user.username && store.state.user.role) {
      if (!isAddRoutes) {
        const menuRoutes = getMenuRoute(asyncRouterMap, store.state.user.role);
        console.log(menuRoutes);
        // 会添加多次，报栈溢出错
        // router.addRoutes(menuRoutes); // bug
        // 这里不是vue实例，所以不能用this.$store
        store.dispatch('changeMenuRoutes', [...routes, ...menuRoutes]).then(() => {
          router.addRoutes(menuRoutes); // ok
          next();
          // router.addRoutes(menuRoutes); //ok
        });
        isAddRoutes = true;
      }
      return next();
    }
    // 没用户信息去登录
    return next('/login');
  }
  return next();
});

export default router;
