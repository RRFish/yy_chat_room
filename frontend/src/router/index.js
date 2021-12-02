import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Login",
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/index",
    name: "Index",
    component: () => import("@/views/Index.vue"),
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});