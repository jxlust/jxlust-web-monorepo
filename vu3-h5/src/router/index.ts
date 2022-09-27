/*
 * @Descripttion:
 * @version:
 * @Author: jxlust jxljxufe@163.com
 * @Date: 2022-05-28 21:38:12
 * @LastEditors: jxlust
 * @LastEditTime: 2022-06-07 16:53:15
 */
// createWebHistory createWebHashHistory
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const NotFoundComponent = () => import("@/views/404/index.vue");

const Home = () => import("@/views/Home/index");
const Test = () => import("@/views/Test/index");


const routes: Array<RouteRecordRaw> = [
  { path: "/:pathMatch(.*)", component: NotFoundComponent },
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "home",
    meta: {
      title: "首页",
      keepAlive: true,
    },
    component: Home,
  },
  {
    path: "/test",
    name: "test",
    meta: {
      title: "首页",
      keepAlive: true,
    },
    component: Test,
  },

];

const router = createRouter({
  // history: createWebHistory('/'),
  history: createWebHashHistory(),
  routes,
});

// router.beforeEach((to, from, next) => {
//   document.title = `${to.meta.title} | vue-manage-system`;
//   const role = localStorage.getItem("ms_username");
//   const permiss = usePermissStore();
//   if (!role && to.path !== "/login") {
//     next("/login");
//   } else if (to.meta.permiss && !permiss.key.includes(to.meta.permiss)) {
//     // 如果没有权限，则进入403
//     next("/403");
//   } else {
//     next();
//   }
// });

router.beforeEach((to) => {
  document.title = (to?.meta?.title as string) ?? document.title;
  return true;
});

export default router;
