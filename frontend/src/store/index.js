import { createStore } from "vuex";
import { loginApi } from "@/api";

export default createStore({
  state() {
    return {
      userinfo:{
        account:"",
        password:"",
        token:"",
      }
    };
  },
  mutations: {
    login(state, info) {
        state.userinfo;
        console.log("info", info)
    },
  },
  actions: {
    login(context) {
        loginApi()
        context.commit("login", 10);
    },
  },
});