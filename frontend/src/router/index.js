import { createRouter, createWebHistory, routerKey } from "vue-router";
import store from "@/store"
import { authTokenGet } from '@/utils/auth'

const routes = [
  {
    path: "/",
    name: "Login",
    component: () => import("@/views/Login.vue")
  },
  {
    path: "/index",
    name: "Index",
    component: () => import("@/views/Index.vue"),
    meta: {
      requiresAuth: true
    }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async(to, from, next) => {
  if (to.matched.some(record => {
    console.log(record.name, record.meta.requiresAuth);
    return record.meta.requiresAuth;
  })) {
    // 如果沒有 token 
    if (store.state.authToken === '') {
      const result = await store.dispatch("userinfoAction")
      console.log("result", result)
      if(result){
        next(); // 往下繼續執行
      }else{
        // 轉跳到 login page
        next({ path: '/' });
      }
    } else {
      next(); // 往下繼續執行
    }
  } else {
    next(); // 往下繼續執行
  }  
})

export default router;