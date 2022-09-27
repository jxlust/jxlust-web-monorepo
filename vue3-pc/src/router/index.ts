/*
 * @Descripttion:
 * @version:
 * @Author: jxlust jxljxufe@163.com
 * @Date: 2022-05-28 21:38:12
 * @LastEditors: jxlust
 * @LastEditTime: 2022-06-07 16:53:15
 */
// createWebHistory createWebHashHistory
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
const HelloWorld = () => import('@/package/HelloWorld/index.vue');
const TestVue = () => import('@/views/TsxVue/index');
const Test = () => import('@/views/Test/index.vue');
const ApiTest = () => import('@/package/ApiTest/index.vue');
const PagerOver = () => import('@/views/PagerOver/index.vue');
const VueUse = () => import('@/package/VueUse/index.vue');
const MockTest = () => import('@/package/MockTest/index.vue');
const NotFoundComponent = () => import('@/views/404/index.vue');

const routes: Array<RouteRecordRaw> = [
  { path: '/:pathMatch(.*)', component: NotFoundComponent },
  {
    path: '/',
    name: 'Home',
    meta: {
      title: 'my home',
      keepAlive: true,
    },
    component: HelloWorld,
    // children: [
    //   {
    //     path: 'abs',
    //     component: () => xxxx,
    //   },
    // ],
  },
  {
    path: '/textover',
    name: 'textover',
    meta: {
      title: 'my textover',
      keepAlive: true,
    },
    component: TestVue,
  },
  {
    path: '/test',
    name: 'test',
    meta: {
      title: 'my test',
      keepAlive: true,
    },
    component: Test,
  },
  {
    path: '/vueApi',
    name: 'vueApi',
    meta: {
      title: 'vueApi study',
      keepAlive: true,
    },
    component: ApiTest,
  },
  {
    path: '/PagerOver',
    name: 'PagerOver',
    meta: {
      title: 'PagerOver',
      keepAlive: true,
    },
    component: PagerOver,
  },
  {
    path: '/VueUse',
    name: 'VueUse',
    meta: {
      title: 'VueUse',
      keepAlive: true,
    },
    component: VueUse,
  },
  {
    path: '/MockTest',
    name: 'MockTest',
    meta: {
      title: 'MockTest',
      keepAlive: true,
    },
    component: MockTest,
  },
];

const router = createRouter({
  // history: createWebHistory('/'),
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to) => {
  document.title = (to?.meta?.title as string) ?? document.title;
  return true;
});

export default router;
