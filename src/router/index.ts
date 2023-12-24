import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Cookies from 'js-cookie'

const routes: Array<RouteRecordRaw> = [
   {
      path:"",
      redirect: "/home"
   },
   {
      path:"/home",
      name:"home",
      component: () => import( /* webpackChunkName: 'Home' */ "../views/Home.vue"),
   },
] 


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


// router.beforeEach((to, from, next) => {
//   document.body.style.fontSize = '';
//   // 检查 "satoken" cookie 是否存在
//   const satoken = Cookies.get('satoken');
//   // 检查路由是否需要登录权限
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     // 检查用户是否已登录
//     if (!satoken) {
//       // 如果用户未登录，重定向到登录页面
//       next({
//         // name: 'login',
//         query: { redirect: to.fullPath }
//       });
//     } else {
//       next(); // 如果用户已登录，正常跳转
//     }
//   } else {
//     next(); // 如果路由不需要登录权限，正常跳转
//   }
// });

export default router;
