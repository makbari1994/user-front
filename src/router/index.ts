import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomeView
    // },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }

    {
      path: "/login",
      name: "login1",
      component: () => import("../views/user/Login.vue"),
    },
    {
      path: "/",
      name: "login",
      component: () => import("../views/user/Login.vue"),
    },
    {
      path: "/userList",
      name: "userList",
      component: () => import("../views/user/UserList.vue"),
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("../views/user/Profile.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/user/Register.vue"),
    },
  ],
});

export default router;
