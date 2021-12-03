import { createStore } from "vuex";

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
    login(state, data) {
        state.userinfo = data;
        console.log("userinfo", state.userinfo)
    },
  },
  actions: {
    login(context, data) {
      context.commit('login', data)
    },
  },
});